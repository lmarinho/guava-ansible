# Dynamically add and remove input files.

$ ->
  control = document.querySelector('.js-add-files')
  return unless control

  originalControl = control.cloneNode()

  staticTemplate = do ->
    # Clone input:file SVG's icon to reuse.
    controlButton = document.querySelector('.js-add-files-button')
    icon = controlButton.children[0].cloneNode(true)

    button = document.createElement('button')
    button.classList.add('button')
    button.classList.add('button-file-remove')
    button.appendChild(icon)

    name = document.createElement('span')
    name.classList.add('type-form')
    name.classList.add('type-file-name')
    name.classList.add('js-add-files-name')

    wrapper = document.createElement('div')
    wrapper.classList.add('form-files-group')
    wrapper.classList.add('form-files-remove')
    wrapper.setAttribute('tabindex', controlButton.getAttribute('tabindex'))

    wrapper.appendChild(button)
    wrapper.appendChild(name)
    wrapper


  renderTemplate = (staticTemplate, control) ->
    template = staticTemplate.cloneNode(true)

    control.classList.add('is-hidden')
    template.appendChild(control)

    filePath = control.value
    fileName = filePath.replace(/^(.*[/\\])?/, '')
    name = template.querySelector('.js-add-files-name')
    name.textContent = fileName

    template


  removeElement = (element) -> element.parentNode.removeChild(element)


  isRemovableFileGroup = (element) -> element.classList.contains('form-files-remove')


  removeExistingFileGroups = (elements) ->
    fileGroups = Array::filter.call(elements, isRemovableFileGroup)

    removeElement(fileGroup) for fileGroup in fileGroups


  addNewFileGroup = (wrapper, control) ->
    template = renderTemplate(staticTemplate, control)
    template.addEventListener 'click', -> removeElement(template)

    wrapper.insertBefore(template, wrapper.firstChild)


  addFileControl = (wrapper) ->
    newControl = originalControl.cloneNode()
    newControl.addEventListener 'change', fileSelected

    innerWrapper = document.querySelector('.form-files-upload')
    innerWrapper.appendChild(newControl)


  fileSelected = (event) ->
    wrapper = document.querySelector('.js-add-files-wrapper')

    removeExistingFileGroups(wrapper.children)
    addNewFileGroup(wrapper, event.target)
    addFileControl(wrapper)


  control.addEventListener 'change', fileSelected
