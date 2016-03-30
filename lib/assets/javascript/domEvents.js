var DOMEvent = (function() {
  // Function Variables.
  var trigger;
  var add;
  var remove;


  trigger = function trigger(element, type) {
    if (document.createEvent) {
      element.dispatchEvent(new Event(type));
    } else {
      element.fireEvent('on' + type, document.createEventObject());
    };
  };

  add = function add(element, type, callback) {
    if (element.addEventListener) {
      element.addEventListener(type, callback);
    } else {
      element.attachEvent('on' + type, callback);
    };
  };

  remove = function remove(element, type, callback) {
  if (element.removeEventListener) {
    element.removeEventListener(type, callback);
  } else {
    element.detachEvent('on' + type, callback);
  };
};

  return {
    trigger:  trigger,
    add:      add,
    remove:   remove
  };
})();
