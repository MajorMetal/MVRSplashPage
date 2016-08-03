var validationController = (function() {
  // Function variables.
  var addLabel;
  var removeLabel;
  var isValid;
  var isInvalid;
  var validateButton;
  var formHandler;

  // Regular variables.
  var $form = $('.form');
  var button = document.querySelector("button[type='submit']");
  var nameInput = document.getElementById('contact_name');
  var emailInput = document.getElementById('contact_email');
  var messageInput = document.getElementById('contact_message');


  // Adds a label to the element
  addLabel = function addLabel(element, klass) {
    var label = document.createElement('i');

    removeLabel(element);

    label.className = klass;
    element.parentNode.insertBefore(label, element.nextSibling);
  };

  // Removes a label if one exists
  removeLabel = function removeLabel(element) {
    var sibling = element.nextSibling;

    console.log(element.nextSibling);

    // 'I' needs to be uppercase to correctly validate
    if (sibling.tagName === 'I') sibling.parentNode.removeChild(sibling);
  };


  // Called when an element passes validations
  isValid = function isValid(element) {
    element.className = 'valid';
    addLabel(element, 'fa fa-check fa-fw valid');
  };

  // Called when an element fails validations
  isInvalid = function isInvalid(element) {

    if ($.trim(element.value)) {
      element.className = 'invalid';
      addLabel(element, 'fa fa-times fa-fw invalid');
    } else {
      element.className = '';
      removeLabel(element);
    };

  };

  function validateButton() {
    button.disabled = !(
      $.trim(nameInput.value) &&
      $.trim(messageInput.value) &&
      /^[\w\d._-]+@[\w\d.-]+\.[\w\d.]+$/.test(emailInput.value)
    );
  };

  formHandler = function formHandler(event) {
    var target = event.target;

    if (target === nameInput || target === messageInput) {
      $.trim(target.value) ? isValid(target) : isInvalid(target);
    } else if (target === emailInput) {

      if (/^[\w\d._-]+@[\w\d.-]+\.[\w\d.]+$/.test(target.value)) {
        isValid(target);
      } else {
        isInvalid(target);
      };

    };

    validateButton();
  };

  // Event Listener.
  $form.on('change', formHandler);

  validateButton();
});
