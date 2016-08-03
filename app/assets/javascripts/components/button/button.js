var buttonController = (function() {
  // Function variables.
  var createClickRipple;
  var rippleCreation;

  // DOM Element variables.
  var buttons = document.querySelectorAll('.btn');

  // Regular variables.
  var mouseClicked;


  // Builds the ripple element for onclick event.
  createClickRipple = function createClickRipple(yPos, xPos, width) {
    var element = document.createElement('span');

    element.className             = 'ripple';
    element.style.top             = (yPos - (width / 2)) + 'px';
    element.style.left            = (xPos - (width / 2)) + 'px';
    element.style.height          = width + 'px';
    element.style.width           = width + 'px';
    element.style.backgroundColor = '#AED581';

    return element;
  };

  // Navbar button/link onmousedown event handler.
  rippleCreation = function rippleCreation(event) {
    if (!mouseClicked) {
      var self = this;
      var ripple = createClickRipple(
        event.offsetY,
        event.offsetX,
        (self.clientHeight + self.clientWidth)
      );

      mouseClicked = true;
      self.appendChild(ripple);

      setTimeout(function() {
        self.removeChild(ripple);
        mouseClicked = false;
      }, 700);
    };
  };

  // Event Listeners.
  for (var i = 0; i < buttons.length; i++) {
    $(buttons[i]).on('mousedown', rippleCreation);
  };
});
