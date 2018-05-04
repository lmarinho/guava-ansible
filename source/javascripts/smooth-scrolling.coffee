#= require smooth-scroll.js.js

smoothScroll.init
  selector: 'a[href*="#"]'
  easing: 'easeInOutCubic'
  speed: 1000
  offset: ->
    $element = $(location.hash)
    scrollOffset = $element.data('scroll-offset')
    if scrollOffset
      parseInt scrollOffset * -1
    else
      30 # default value
