# Update a target's text when a control is updated.
$ ->
  control = document.querySelector('.js-update-on-typing')
  target = document.querySelector('.js-update-on-typing-target')
  return unless control or target

  lastValue = control.value
  listener = ->
    value = control.value
    return if value is lastValue
    lastValue = value

    unless target.dataset.defaultText
      target.dataset.defaultText = target.textContent

    text = if value.length is 0 then target.dataset.defaultText else value
    target.textContent = text

  setInterval listener, 100
