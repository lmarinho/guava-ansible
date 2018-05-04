$(function() {
  var MD_BREAKPOINT = 990;
  var windowWidth = $(window).width();

  var coverHeight, transitionStartHeight;
  var logoSelector = '.logo.of-guava.at-menu';
  var collapseClass = 'is-collapsed';
  var expandClass = 'is-expanded';

  var logos = $(logoSelector);
  var expanded = true;
  updateTransitionPosition();

  $(window).on('scroll.logoTransition', updateLogoState);
  $(window).on('resize.logoTransition', updateTransitionPosition);

  function updateLogoState() {
    var windowYOffset = window.pageYOffset;
    windowWidth = $(window).width();

    if (windowWidth > MD_BREAKPOINT) {
      if (windowYOffset > transitionStartHeight) collapseLogos(logos);
      else expandLogos(logos);
    }
  }

  function collapseLogos(logos) {
    if (isExpanded()) {
      $.each(logos, function(i, logo) {
        var $logo = $(logo);
        $logo.removeClass(expandClass);
        $logo.addClass(collapseClass);
      });
      expanded = false;
    }
  }

  function expandLogos(logos) {
    if (!isExpanded()) {
      $.each(logos, function(i, logo) {
        var $logo = $(logo);
        $logo.removeClass(collapseClass);
        $logo.addClass(expandClass);
      });
      expanded = true;
    }
  }

  function isExpanded() {
    if ($(logoSelector + '.is-expanded').length) return true;
    else return false;
  }

  function updateTransitionPosition() {
    var firstMask = $('.mask.is-section')[0];
    var $firstMask = $(firstMask);
    firstMaskHeight = parseInt($firstMask.css('height'));
    transitionStartHeight = parseInt(firstMaskHeight / 10);
    updateLogoState();
  }
});
