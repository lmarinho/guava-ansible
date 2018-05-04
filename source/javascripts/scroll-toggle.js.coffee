$ ->
  $togglers = $('.js-scroll-toggle')
  return unless $togglers.length

  windowPastOffset = ($window, offset) -> $window.scrollTop() > offset

  toggleTarget = ($window, offset, $toggler, toggleClass) ->
    if windowPastOffset($window, offset)
      $toggler.addClass(toggleClass)
    else
      $toggler.removeClass(toggleClass)

  checkTogglers = ($window, defaultConfig, $togglers) ->
    $togglers.each ->
      $toggler = $(this)
      togglerConf =
        offset: $toggler.data('scroll-toggle-offset') or defaultConfig.offset
        classes:
          toggle: $toggler.data('scroll-toggle-class') or defaultConfig.classes.toggle
      config = $.extend(defaultConfig, togglerConf)

      toggleTarget($window, config.offset, $toggler, config.classes.toggle)

  config =
    offset: 100
    delays:
      throttleInterval: 100
    classes:
      toggle: 'transform'

  $window = $(window)
  didScroll = false
  $window.on 'scroll.scrollToggle', -> didScroll = true

  setInterval (->
    return unless didScroll
    didScroll = false

    checkTogglers($window, config, $togglers)
  ), config.delays.throttleInterval

  checkTogglers($window, config, $togglers)
