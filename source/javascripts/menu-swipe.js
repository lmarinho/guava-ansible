$(function() {
  var MD_BREAKPOINT = 990;
  var wrapperSelector = 'body';
  var openedMenuSelector = 'grid has-menu';

  var xDown = null;
  var yDown = null;

  addEvents();

  $(window).on('resize.swipeMenu', addEvents);

  function addEvents() {
    var windowWidth = $(window).width();
    $(document).off('.swipeMenu');
    if (windowWidth <= MD_BREAKPOINT) {
      $(document).on('touchstart.swipeMenu', handleTouchStart);
      $(document).on('touchmove.swipeMenu', handleTouchMove);
    }
  }

  function openMenu() {
    var $wrapper = $(wrapperSelector);
    if (!$wrapper.hasClass(openedMenuSelector)) {
      $wrapper.addClass(openedMenuSelector);
    }
  }

  function closeMenu() {
    var $wrapper = $(wrapperSelector);
    if ($wrapper.hasClass(openedMenuSelector)) {
      $wrapper.removeClass(openedMenuSelector);
    }
  }

  function handleTouchStart(event) {
    xDown = event.touches[0].clientX;
    yDown = event.touches[0].clientY;
  }

  function handleTouchMove(event) {
    if (!xDown || !yDown) return;

    var xUp = event.touches[0].clientX;
    var yUp = event.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) openMenu(); // Left swipe
      else closeMenu(); // Right swipe
    }

    xDown = null;
    yDown = null;
  }
});
