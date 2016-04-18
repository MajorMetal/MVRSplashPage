var navController = (function() {
  // Function variables.
  var createClickRipple;
  var rippleCreation;
  var clickHandler;
  var menuCloser;
  var menuToggle;

  // DOM Element variables.
  var main          = document.getElementById('main');
  var header        = document.getElementById('header');
  var footer        = document.getElementById('footer');
  var navToggle     = document.getElementById('nav-toggle');
  var nav           = document.getElementById('nav');
  var navButtons    = nav.querySelectorAll('p');
  var navLinks      = nav.querySelectorAll('a');

  // Regular variables.
  var mouseClicked;

  // Converts jQuery array search to boolean.
  includes = function includes(element, collection) {
    return $.inArray(element, collection) > -1;
  };

  // Builds the ripple element for onclick event.
  createClickRipple = function createClickRipple(yPos, xPos, width) {
    var element = document.createElement('span');

    element.className             = 'ripple';
    element.style.top             = (yPos - (width / 2)) + 'px';
    element.style.left            = (xPos - (width / 2)) + 'px';
    element.style.height          = width + 'px';
    element.style.width           = width + 'px';
    element.style.backgroundColor = '#616161';

    return element;
  };

  // Navbar button/link onmousedown event handler.
  rippleCreation = function rippleCreation(event) {
    if (!mouseClicked) {
      var target  = event.target;
      var ripple  = createClickRipple(
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
  };

  clickHandler = function clickHandler(event) {
    if (includes(event.target, navLinks) || includes(event.target, navButtons)) {
      var target  = $(event.target.hash);

      rippleCreation(event);
      
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top - $(header).height()
        }, 750);
      };

    };
  };

  // Navbar link onmouseup event handler.
  menuCloser = function menuCloser() {
    navToggle.checked = !navToggle.checked;
    DOMEvent.trigger(navToggle, 'change');
  };

  // Navbar toggle onchange event handler.
  menuToggle = function menuToggle() {
    if (this.checked) {
      nav.className     = 'nav nav--open';
      header.className  = 'header nav--open';
      main.className    = 'main nav--open';
      footer.className  = 'footer nav--open';
    } else {
      nav.className     = 'nav';
      header.className  = 'header';
      main.className    = 'main';
      footer.className  = 'footer';
    };
  };


// =========================
//      Event Listeners
// =========================
  DOMEvent.add(nav, 'mousedown', clickHandler);

  for (var i = 0; i < navLinks.length; i++) {
    DOMEvent.add(navLinks[i], 'mouseup', menuCloser);
  };

  DOMEvent.add(navToggle, 'change', menuToggle);
});
