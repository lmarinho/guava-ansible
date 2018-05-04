///////////////////////////////////////////////////////////
// 🍃 Guava                                (c) 2010–2017 //
///////////////////////////////////////////////////////////
//
// 👾 Main JavaScript
//
// Bootstrap dependencies
//= require jquery
//= require tether
//= require bootstrap/util
//= require bootstrap/modal
//= require bootstrap/scrollspy
//= require js-cookie
//= require smooth-scrolling
//= require scroll-indicator
// require scroll-toggle
// require section-highlight
//= require update-on-typing
//= require add-files
//= require start-a-project
//= require store-on-blur
//= require widows-handler
//= require activate-progress-circle

$(function() {
  var MD_BREAKPOINT = 990;
  var collapseClass = 'is-collapsed';
  var expandClass = 'is-expanded';

  $(window).on('resize.mainJS', updateLogoState);
  updateLogoState();

  // Makes side notes appear
  $('span[data-sidenote]').click(function() {
    var $self = $(this);
    var link_offset = $self.offset();
    var data = $self.data('sidenote');
    var $sidenote = $('.sidenote.of-' + data);
    var sidenoteOfsset = parseInt($sidenote.height() / 2);
    var computed_styles = {};

    closeSidenotes();

    if ($(window).width() >= 990) {
      computed_styles = $sidenote.css(['position', 'right', 'width', 'height']);
      computed_styles.top = link_offset.top - sidenoteOfsset;
      $sidenote.offset(computed_styles);
    }

    $self.addClass('is-active');
    $sidenote.addClass('is-active');
  });

  // Sidenote close button handler
  $('.sidenote>.is-close-button').click(closeSidenotes);

  // Toggles side menu on mobile devices
  $('.is-toggle').click(function() {
    $(document.body).toggleClass('grid has-menu');
  });

  $('.grid.is-wrapper').click(function() {
    $(document.body).removeClass('grid has-menu');
  });

  $('input[name=service]').on('change.Start', function() {
    $this = $(this);
    if ($this.hasClass('of-studio')) {
      $('.picture.of-stamp.is-team').addClass('is-not-checked');
      $('.picture.of-stamp.is-studio').removeClass('is-not-checked');
    }
    else if ($this.hasClass('of-team')) {
      $('.picture.of-stamp.is-team').removeClass('is-not-checked');
      $('.picture.of-stamp.is-studio').addClass('is-not-checked');
    }
  });

  // Toggles input radio
  $('.is-radio input').click(function(){
    var $radio = $(this);

    $('.is-radio').addClass('is-not-checked');
    $radio.closest('.is-radio').removeClass('is-not-checked');
  });

  function updateLogoState() {
    var windowWidth = $(window).width();
    var logoSelector = '.logo.of-guava.at-menu';
    var logos = $(logoSelector);

    if (windowWidth <= MD_BREAKPOINT) collapseLogos(logos);
    else expandLogos(logos);
  }

  function collapseLogos(logos) {
    $.each(logos, function(i, logo) {
      var $logo = $(logo);
      $logo.removeClass(expandClass);
      $logo.addClass(collapseClass);
    });
  }

  function expandLogos(logos) {
    $.each(logos, function(i, logo) {
      var $logo = $(logo);
      $logo.removeClass(collapseClass);
      $logo.addClass(expandClass);
    });
  }

  // Closes all active sidenotes, removing the 'is-active' class
  // from all sidenotes relative elements
  function closeSidenotes() {
    $('.sidenote').removeClass('is-active');
    $('.type-link-sidenote').removeClass('is-active');
  }

  // Converts REM units to pixels
  function rem2px(amount) {
    var font_size_style = $('html').css('font-size');
    var font_size = parseInt(font_size_style);

    return amount * font_size;
  }
});
