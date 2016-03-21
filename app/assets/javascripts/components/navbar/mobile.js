var navbarController = (function () {
  var navbar        = document.querySelector('.navbar'),
      pLinks        = navbar.querySelectorAll('p'),
      aLinks        = navbar.querySelectorAll('a'),
      navbarToggle  = document.getElementById('navbar-toggle'),
      header        = document.querySelector('.header'),
      main          = document.querySelector('.main'),
      mouseClicked;


// =========================
//     Element Creators
// =========================
  // Ripple used for click animations
  function createClickRipple (yPos, xPos, width) {
    var element = document.createElement('span');

    element.className             = 'ripple';
    element.style.top             = (yPos - (width / 2)) + 'px';
    element.style.left            = (xPos - (width / 2)) + 'px';
    element.style.height          = width + 'px';
    element.style.width           = width + 'px';
    element.style.backgroundColor = '#616161';

    return element;
  }


// =========================
//      Event Handlers
// =========================
  function rippleCreation (event) {
    if (!mouseClicked) {
      var self    = this,
          ripple  = createClickRipple(event.offsetY, event.offsetX, (this.clientHeight + this.clientWidth));

      mouseClicked = true;
      self.appendChild(ripple);

      setTimeout(function () {
        self.removeChild(ripple);
        mouseClicked = false;
      }, 700);
    }
  }

  function menuCloser () {
    navbarToggle.checked = !navbarToggle.checked;
    triggerEvent(navbarToggle, 'change');
  }

  function menuToggle () {
    if (this.checked) {
      navbar.className  = 'navbar open';
      header.className  = 'header navbar-open';
      main.className    = 'main navbar-open';
    } else {
      navbar.className  = 'navbar';
      header.className  = 'header';
      main.className    = 'main';
    }
  }


// =========================
//      Event Listeners
// =========================
  for (var i = 0; i < pLinks.length; i++) {
    addEvent(pLinks[i], 'mousedown', rippleCreation);
  }

  for (var i = 0; i < aLinks.length; i++) {
    addEvent(aLinks[i], 'mousedown', rippleCreation);
    addEvent(aLinks[i], 'mouseup', menuCloser);
  }

  addEvent(navbarToggle, 'change', menuToggle);


// =========================
//     Menu Touch Swipe
// =========================
  $('main').swipe({
    preventDefaultEvents: false,
    allowPageScroll: 'VERTICAL',
    swipeRight: function () {
      navbarToggle.checked = true;
      triggerEvent(navbarToggle, 'change');
    }
  });

  $('label.navbar-toggle').swipe({
    preventDefaultEvents: false,
    allowPageScroll: 'VERTICAL',
    excludedElements: "button, input, select, textarea, a, .noSwipe",
    swipeLeft: function () {
      navbarToggle.checked = false;
      triggerEvent(navbarToggle, 'change');
    }
  });

});

