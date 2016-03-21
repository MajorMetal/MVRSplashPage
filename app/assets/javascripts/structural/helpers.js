// =========================
//     Scroll Position
// =========================
function scrollPosition () {
  return document.body.scrollTop || document.documentElement.scrollTop || pageYOffset;
}

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

// Removes an event from the DOM
function removeEvent (element, type, eventHandler) {
  if (element.removeEventListener) { // For all major browsers, except IE 8 and earlier
    element.removeEventListener(type, eventHandler);
  } else { // For IE 8 and earlier versions
    element.detachEvent('on' + type, eventHandler);
  }
}

// Triggers event
function triggerEvent (element, type) {
  if (document.createEvent) { // For all major browsers, except IE 8 and earlier
    element.dispatchEvent(new Event(type));
  } else { // For IE 8 and earlier versions
    element.fireEvent('on' + type, document.createEventObject());
  }
}


// =========================
//      Class Modifiers
// =========================
function trim (text) {
  return text == null ? "" : (text + "").replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
}

function hasClass (element, klass) {
  if ((" " + element.className + " " ).replace(/[\t\r\n\f]/g, " ").indexOf(" " + klass + " ") > -1) {
    return true;
  }

  return false;
}

function removeClass (element, value) {
  var klasses, klass, currentValue, current, finalValue, i;

  currentValue  = element.className;
  current       = (" " + currentValue + " ").replace(/[\t\r\n\f]/g, " ");

  if (current) {
    klasses = value.match(/\S+/g) || [];
    i       = 0;

    while ((klass = klasses[i++])) {
      while (current.indexOf(" " + klass + " ") > -1) {
        current = current.replace(" " + klass + " ", " ");
      }
    }

    finalValue = trim(current);

    if (currentValue !== finalValue) {
      element.className = finalValue;
    }
  }
}

function addClass (element, value) {
  var klasses, klass, currentValue, current, finalValue, i;

  currentValue  = element.className,
  current       = (" " + currentValue + " ").replace(/[\t\r\n\f]/g, " ")

  if (current) {
    klasses = value.match(/\S+/g) || [];
    i       = 0;

    while ((klass = klasses[i++])) {
      if (current.indexOf(" " + klass + " ") < 0 ) {
        current += klass + " ";
      }
    }

    finalValue = trim(current);

    if (currentValue !== finalValue) {
      element.className = finalValue;
    }
  }
}

function toggleClass (element, value) {
  var klasses, klass, i;

  i = 0,
  klasses = value.match(/\S+/g) || [];

  while ((klass = klasses[i++])) {
    hasClass(element, klass) ? removeClass(element, klass) : addClass(element, klass);
  }
}
