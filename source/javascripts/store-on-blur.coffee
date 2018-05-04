$ ->
  # Store the user's name on the control's out of focus.
  do ->
    control = document.querySelector('.js-store-on-blur')
    return unless control

    control.addEventListener 'blur', -> Cookies.set('userName', control.value)


  # Update a target with the stored user's name.
  do ->
    control = document.querySelector('.js-store-on-blur-target')
    return unless control

    value = Cookies.get('userName')
    return unless value

    control.value = value
