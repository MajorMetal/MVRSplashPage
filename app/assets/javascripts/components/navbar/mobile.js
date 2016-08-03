var navController = (function() {
  var $main = $('#main');
  var $nav = $('#nav');
  var $navToggle = $('#nav-toggle');
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

  function rippleAnimator(event) {
    if (!includes(event.target, $navLinks)) return;

    rippleCreation(event);
  }

  function menuCloser(event) {
    if (!includes(event.target, $navLinks)) return;

    $navToggle.prop('checked', false);
    menuToggler({ target: $navToggle[0] });
  }

  function menuToggler(event) {
    if (event.target.checked) {
      $main.addClass('nav__open');
      $nav.addClass('nav__open');
    } else {
      $main.removeClass('nav__open');
      $nav.removeClass('nav__open');
    }
  }


  $nav.on('mousedown', rippleAnimator);
  $nav.on('mouseup', menuCloser);
  $navToggle.on('change', menuToggler);
});
