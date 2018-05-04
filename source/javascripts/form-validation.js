$(function() {
  var $form = $('form');
  var $hasntUploaded = $('.hasnt-uploaded');
  var $hasUploaded = $('.has-uploaded');
  var hasErrorClass = 'has-error';
  var selectors = {
    'name': 'input[name="name"]',
    'email': 'input[name="email"]',
    'description': 'textarea[name="description"]',
    'startDate': 'select[name="start-date"]',
    'timeframe': 'select[name="timeframe"]',
    'budget': 'select[name="budget"]',
  };

  autosize($('textarea'));

  $form.on('submit.formValidation', validateFields);
  $hasntUploaded.on('change.formValidation', onFileInputChange);
  $hasUploaded.find('button').on('click.formValidation', removeFile);

  $('input.of-studio').on('click.formValidation', function() {
    var $ofStudio = $('small.of-software-studio');
    var $ofTeam = $('small.of-team-augmentation');
    var checkedClass = 'is-checked';

    $ofStudio.addClass(checkedClass);
    $ofTeam.removeClass(checkedClass);
  })

  $('input.of-team').on('click.formValidation', function() {
    var $ofStudio = $('small.of-software-studio');
    var $ofTeam = $('small.of-team-augmentation');
    var checkedClass = 'is-checked';

    $ofStudio.removeClass(checkedClass);
    $ofTeam.addClass(checkedClass);
  })

  function validateFields() {
    var hasError, valid = {};
    valid.name = validateName();
    valid.email = validateEmail();
    valid.description = validateDescription();
    valid.startDate = validateStartDate();
    valid.timeframe = validateTimeframe();
    valid.budget = validateBudget();

    hasError = digestErrors(valid);

    // We need to prevent the form submission, and we do it by returning false
    if (hasError) return false;
    else return true;
  }

  function validateName() {
    var $field = $(selectors.name);
    var name = $field.val();

    if (name.length == 0) return false;
    return true;
  }

  function validateEmail() {
    var $field = $(selectors.email);
    var email = $field.val();
    var emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    var matches = email.match(emailRegex);

    if (email.length == 0) return false;
    if (!matches) return false;
    return true;
  }

  function validateDescription() {
    var $field = $(selectors.description);
    var description = $field.val();

    if (description.length == 0) return false;
    return true;
  }

  function validateStartDate() {
    var $field = $(selectors.startDate + ' option:selected');
    var option = $field.index();

    if (option <= 0) return false;
    return true;
  }

  function validateTimeframe() {
    var $field = $(selectors.timeframe + ' option:selected');
    var option = $field.index();

    if (option <= 0) return false;
    return true;
  }

  function validateBudget() {
    var $field = $(selectors.budget + ' option:selected');
    var option = $field.index();

    if (option <= 0) return false;
    return true;
  }

  // In this function, we will get the errors dict and add the error class
  // on the respective fields when needed
  function digestErrors(valid) {
    var hasError = false;
    $.each(selectors, function(key, selector) {
      var $field = $(selector);
      if (!valid[key]) {
        $field.parent().addClass(hasErrorClass);
        $field.keypress(removeErrorClass);
        $field.change(removeErrorClass);
        hasError = true;
      }
      else $field.parent().removeClass(hasErrorClass);
    });

    return hasError;
  }

  function removeErrorClass(event) {
    var $target = $(event.target);
    $target.parent().removeClass(hasErrorClass);
    $target.off('keypress');
    $target.off('change');
  }

  function onFileInputChange(event) {
    var filename = event.target.files[0].name;
    var $hasntUploaded = $('.hasnt-uploaded');
    var $hasUploaded = $('.has-uploaded');

    $hasUploaded.find('p').html(filename);
    $hasntUploaded.hide();
    $hasUploaded.show();
  }

  function removeFile() {
    var $hasUploaded = $('.has-uploaded');
    var $fileInput = $('.hasnt-uploaded').find('input')[0];
    delete $fileInput.files[0];
    $fileInput.files.length = 0;


    $hasUploaded.find('p').html('');
    $hasntUploaded.show();
    $hasUploaded.hide();
  }
});
