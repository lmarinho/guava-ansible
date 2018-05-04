$ ->
  $indicator = $('.js-scroll-indicator')
  return unless $indicator.length

  windowPosition = ($window) -> $window.scrollTop() + $window.height()
  elementPosition = ($element) -> $element.offset().top + $element.outerHeight()
  windowPastElement = ($window, $element) -> windowPosition($window) >= elementPosition($element)

  toggleIndicator = ($window, $target, $indicator, fadeClass)->
    if windowPastElement($window, $target)
      $indicator.addClass(fadeClass)
    else
      $indicator.removeClass(fadeClass)

  config =
    offset: $indicator.data('scroll-indicator-offset') or 150
    delays:
      scrollTopAnimation: 500
      throttleInterval: 100
    classes:
      fade: 'fade'
      invisible: 'invisible'
  $window = $(window)
  $target = $($indicator.data('scroll-indicator-target'))

  $indicator.removeClass(config.classes.invisible)
  $indicator.click ->
    $('html, body').animate
      scrollTop: elementPosition($target) - $window.height() + config.offset
    , config.delays.scrollTopAnimation

  didScroll = false
  $window.on 'scroll.scrollIndicator', -> didScroll = true

  setInterval (->
    return unless didScroll
    didScroll = false

    toggleIndicator($window, $target, $indicator, config.classes.fade)
  ), config.delays.throttleInterval

  toggleIndicator($window, $target, $indicator, config.classes.fade)
