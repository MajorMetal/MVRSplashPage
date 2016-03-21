// =========================
//      Event Listeners
// =========================
  // Adds an event to the DOM
  function addEvent (element, type, eventHandler) {
    if (element.addEventListener) { // For all major browsers, except IE 8 and earlier
      element.addEventListener(type, eventHandler);
    } else { // For IE 8 and earlier versions
      element.attachEvent('on' + type, eventHandler);
    }
  }


// =========================
//  Element Class Changing
// =========================
// Updates the element's class name
    // - Removes validation classes and adds new class if supplied
function updateClass (element, klass) {
  return element.className.replace(/(invalid|valid)/, '') + (klass || '');
}

// Checks if the class is a part of the element className
function hasClass (element, klass) {
  return (' ' + element.className + ' ').indexOf(' ' + klass + ' ') >= 0;
}


// =========================
//        Validation
// =========================
var validation = (function () {
  var nameInput = document.getElementById('contact_name'),
      emailInput = document.getElementById('contact_email'),
      messageInput = document.getElementById('contact_message'),
      button = document.querySelector("button[type='submit']");


//      Label Control
// -------------------------
  // Adds a label to the element
  function addLabel (element, klass) {
    var label = document.createElement('i');
    
    removeLabel(element); // Remove an existing label
    label.className = klass;
    element.parentNode.insertBefore(label, element.nextSibling);
  }

  // Removes a label if one exists
  function removeLabel (element) {
    var sibling = element.nextSibling;

    // 'I' needs to be uppercase to correctly validate
    if (sibling.tagName == 'I') {sibling.parentNode.removeChild(sibling)}
  }


//   Validation Functions
// -------------------------
  // Called when an element passes validations
  function isValid (element) {
    element.className = updateClass(element, 'valid');
    addLabel(element, 'fa fa-check fa-fw valid');
  }

  // Called when an element fails validations
  function isInvalid (element) {
    if ((element.value).trim()) {
      element.className = updateClass(element, 'invalid');
      addLabel(element, 'fa fa-times fa-fw invalid');
    } else {
      element.className = updateClass(element, '');
      removeLabel(element);
    }
  }

  function validateButton () {
    button.disabled = !(hasClass(nameInput, 'valid') && hasClass(emailInput, 'valid') && hasClass(messageInput, 'valid'));
  }


//      Event Handlers
// -------------------------
  addEvent(nameInput, 'change', function () {
    (this.value).trim() ? isValid(this) : isInvalid(this);
    validateButton();
  });

  addEvent(emailInput, 'change', function () {
    /^[\w\d._-]+@[\w\d.-]+\.[\w\d.]+$/.test(this.value) ? isValid(this) : isInvalid(this);
    validateButton();
  });

  addEvent(messageInput, 'change', function () {
    (this.value).trim() ? isValid(this) : isInvalid(this);
    validateButton();
  });

  validateButton();
});


// =========================
//      Initialization
// =========================
addEvent(document, 'DOMContentLoaded', function () {
  validation();
});

