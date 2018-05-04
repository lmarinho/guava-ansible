$(function() {
  var circlesNavSelector = '.diagram.of-circles.at-fixed-menu';
  var navStartSectionSelector = '.page-process.is-kickoff';

  var $circlesNav = $(circlesNavSelector);
  var circlesNavPosition = $circlesNav.css(['top', 'right']);
  var navOffset = $circlesNav.offset();
  var $startSection = $(navStartSectionSelector);

  updateCirclesNav();

  $(window).scroll(function() {
    var pageYOffset = window.pageYOffset;
    updateCirclesNav();
    $circlesNav.offset({ left: navOffset.left });
  });

  function updateCirclesNav() {
    if (pageYOffset >= $startSection.offset().top) {
      $circlesNav.css({
        position: 'fixed',
        top: 0,
      });
    }
    else {
      $circlesNav.css({
        position: 'absolute',
        top: $startSection.offset().top,
      });
    }
  }
})
