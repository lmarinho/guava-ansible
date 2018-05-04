$ ->
  # Remove the template file input (empty value) before submitting the form.
  do ->
    form = document.querySelector('.js-start-a-project-form')
    return unless form

    removeTemplateFileInput = (event) ->
      inputFiles = form.querySelectorAll('.js-add-files')
      lastOne = inputFiles.length - 1
      templateFileInput = inputFiles[lastOne]

      templateFileInput.parentNode.removeChild(templateFileInput)


    form.addEventListener('submit', removeTemplateFileInput, false)
