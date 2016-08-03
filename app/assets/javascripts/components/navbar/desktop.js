var navController = (function() {
  var $nav = $('#nav');
  var $navMenu = $('.nav_menu');
  var $navLinks = $nav.find('a');
  var mouseClicked;


  function includes(element, collection) {
    return $.inArray(element, collection) > -1;
  }

  function createClickRipple(yPos, xPos, width) {
    var element = document.createElement('span');

    element.className = 'ripple';
    element.style.top = (yPos - (width / 2)) + 'px';
    element.style.left = (xPos - (width / 2)) + 'px';
    element.style.height = width + 'px';
    element.style.width = width + 'px';
    element.style.backgroundColor = '#616161';

    return element;
  }

  function rippleCreation(event) {
    if (mouseClicked) return;

    var target = event.target;
    var ripple = createClickRipple(
      event.offsetY,
      event.offsetX,
      (target.clientHeight + target.clientWidth)
    );

    mouseClicked = true;

    target.appendChild(ripple);
    setTimeout(function() {
      target.removeChild(ripple);
      mouseClicked = false;
    }, 700);
  }

  function clickHandler(event) {
    if (!includes(event.target, $navLinks)) return;

    var $target = $(event.target.hash);

    rippleCreation(event);

    if (!$target.length) return;

    $('html, body').animate({
      scrollTop: $target.offset().top - $navMenu.height()
    }, 1000);
  }

  // Event Listeners.
  $nav.on('click', clickHandler);
});
