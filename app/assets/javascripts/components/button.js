$(function() {
  var mouseClicked;


  function buildRippleElement(yPos, xPos, width) {
    var element = document.createElement('span');

    element.className = 'ripple';
    element.style.top = (yPos - (width / 2)) + 'px';
    element.style.left = (xPos - (width / 2)) + 'px';
    element.style.height = width + 'px';
    element.style.width = width + 'px';
    element.style.backgroundColor = '#fff';
    element.style.opacity = 0.25;

    return element;
  }

  $('#navmenu a, .btn').click(function() {
    if (mouseClicked) return;
    mouseClicked = true;

    var self = this;
    var ripple = buildRippleElement(
      event.offsetY,
      event.offsetX,
      (self.clientHeight + self.clientWidth)
    );

    self.appendChild(ripple);

    setTimeout(function() {
      self.removeChild(ripple);
      mouseClicked = false;
    }, 700);
  });
});
