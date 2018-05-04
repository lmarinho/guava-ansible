$(function() {
  var TRANSFORMATION_MATRIX_VALUE_PATTERN = /-?[\d\.]+/g,
        MD_BREAKPOINT = 990;

  var menuViewportMaskSelector = '.mask.is-viewport',
    menuSectionMaskSelector = '.mask.is-section',
    menuSelector = '.menu',
    menuSectionLayoutInfo = {};

  var $menu = $(menuSelector),
    $menuViewportMask = $(menuViewportMaskSelector),
    $menuSectionMasks = $(menuSectionMaskSelector);

  var animationFrameId = null, stopPosition;

  function isSubmask($mask) {
    return ($mask.find(menuSectionMaskSelector).length == 0);
  }

  function isTopmask($mask) {
    return ($mask.parents(menuSectionMaskSelector).length == 0);
  }

  function updateSectionMasksLayoutInfo() {
    $.each($menuSectionMasks, function(i, mask) {
      var $mask = $(mask),
        maskOf = $mask.data('menu-mask-of'),
        $maskOf = $(maskOf),
        computedStyleOfMaskOf = window.getComputedStyle($maskOf.get(0)),
        maskOfOffset = $maskOf.offset();

      menuSectionLayoutInfo[maskOf] = {
        $element: $mask,
        $target: $maskOf,
        top: maskOfOffset.top,
        left: maskOfOffset.left,
        width: computedStyleOfMaskOf.width,
        height: computedStyleOfMaskOf.height,
        transform: $maskOf.css('transform'),
        transformOrigin: $maskOf.css('transform-origin'),
        isTopmask: isTopmask($mask),
        isSubmask: isSubmask($mask)
      }
    });
  }

  function replicateMenusOnSectionMasks() {
    // TODO Handle accessibility
    var $menuClone, $mask, menuClass;
    $.each($menuSectionMasks, function(i, mask) {
      $mask = $(mask);
      menuClass = $mask.data('menu-class');
      if(isSubmask($mask)) {
        $menuClone = $menu.clone();
        $menuClone.addClass(menuClass);
        $menuClone.appendTo($mask);
      }
    });
  }

  function updateSectionMasksLayout() {
    for(key in menuSectionLayoutInfo) {
      var maskInfo = menuSectionLayoutInfo[key],
        targetOffset = maskInfo.$target.offset(),
        targetParentOffset = maskInfo.$target.parent().offset(),
        top, left;

      if (maskInfo.isTopmask) {
        top = targetOffset.top;
        left = targetOffset.left;
      }
      else {
        top = targetOffset.top - targetParentOffset.top;
        left = targetOffset.left - targetParentOffset.left;
      }

      var css = {
        width: maskInfo.width,
        height: maskInfo.height,
        left: left,
        top: top,
        transform: maskInfo.transform,
        transformOrigin: maskInfo.transformOrigin,
      };

      maskInfo.$element.css(css);
    }
  }

  function positionMenusOnSectionMasks() {
    for(key in menuSectionLayoutInfo) {
      var maskInfo = menuSectionLayoutInfo[key];
      var left, top, parentLeft, menuLeft;

      if(maskInfo.isSubmask) {
        var $menu = maskInfo.$element.find(menuSelector);

        top = maskInfo.top;

        parentLeft = parseInt($menu.parent().css('left'));
        menuLeft = parseInt($menu.css('left'));
        if (parentLeft < 0) left = (parentLeft * -1) + menuLeft;
        else left = menuLeft;

        $menu.css({
          top: top,
          left: left,
        });
      }
    }
  }

  // Aligns menus based on the offset of the first menu
  function alignMenus() {
    var firstKey = Object.keys(menuSectionLayoutInfo)[0];
    var $baseMenu = menuSectionLayoutInfo[firstKey].$element.find(menuSelector);
    for (key in menuSectionLayoutInfo) {
      var maskInfo = menuSectionLayoutInfo[key];
      var $menu = maskInfo.$element.find(menuSelector);

      $menu.offset($baseMenu.offset());
    }
  }

  // Calculates position which the animation should stop updating the menu top offset
  function findStopPosition() {
    var lastMaskIndex = Object.keys(menuSectionLayoutInfo).length - 1;
    var lastMaskKey =Object.keys(menuSectionLayoutInfo)[lastMaskIndex];
    var lastMask = menuSectionLayoutInfo[lastMaskKey].$target;
    var menuHeight = $(menuSelector).height();
    var stopPosition = lastMask.offset().top + lastMask.outerHeight() - menuHeight - 100;

    return stopPosition;
  }

  function setTransformTranslateY($element, value) {
    var transformationString = $element.css('transform'),
      transformationMatrix = transformationString.match(TRANSFORMATION_MATRIX_VALUE_PATTERN);

    if(transformationMatrix && transformationMatrix.length >= 6) {
      transformationMatrix[5] = value;
      transformationString = 'matrix(' + transformationMatrix.join(',') + ')'
    } else {
      transformationString = 'translate3d(0,' + value + 'px,0)';
    }

    $element.css('transform', transformationString);
  }

  function animationLoop() {
    var windowYOffset = window.pageYOffset;
    for(key in menuSectionLayoutInfo) {
      var maskInfo = menuSectionLayoutInfo[key];

      if(maskInfo.isTopmask) {
        setTransformTranslateY(maskInfo.$element, -windowYOffset);
      }

      if(maskInfo.isSubmask) {
        var $menu = maskInfo.$element.find(menuSelector);
        var maskTransform = maskInfo.$element.css('transform'),
        maskMatrix = maskTransform.match(TRANSFORMATION_MATRIX_VALUE_PATTERN);
        menuYOffset = windowYOffset > stopPosition ? stopPosition : windowYOffset;

        // When the menu's parent mask is transformed, we have to apply the inverse transform
        // to the menu
        if(maskMatrix && maskMatrix.length >= 6) {
          maskMatrix[0] = 1 / maskMatrix[0];
          maskMatrix[3] = 1 / maskMatrix[3];
          maskMatrix[5] = menuYOffset;
          maskTransform = 'matrix(' + maskMatrix.join(',') + ')';
        }
        else {
          maskTransform = 'translate3d(0,' + menuYOffset + 'px,0)';
        }
        $menu.css('transform', maskTransform);
      }
    }

    animationFrameId = requestAnimationFrame(animationLoop);
  }

  function startAnimation() {
    updateSectionMasksLayoutInfo();
    updateSectionMasksLayout();
    positionMenusOnSectionMasks();

    $menu.hide();
    $menuViewportMask.show();
    alignMenus();

    stopPosition = findStopPosition();

    animationLoop();
  }

  function stopAnimation() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }

    $menu.show();
    $menuViewportMask.hide();
  }

  // TODO Check if browser support the properties
  replicateMenusOnSectionMasks();

  // Only starts the animationFrame if the screen is larger than $md
  if ($(window).width() >= MD_BREAKPOINT) startAnimation();

  // Handles possible layout changes on breakpoint
  $(window).on('resize.dynamicMenu', function() {
    if ($(window).width() >= MD_BREAKPOINT) startAnimation();
    else stopAnimation();
  });

  $(window).on('load.dynamicMenu', function() {
    if ($(window).width() >= MD_BREAKPOINT) startAnimation();
    else stopAnimation();
  });
})
