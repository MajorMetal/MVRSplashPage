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

    if (document.activeElement == this) {
      triggerEvent(this, 'focus');
    }
  }

  function collapseUpdater () {
    var self = this,
        array = $(".collapse.in:not(" + this.getAttribute('data-target') + ")");

    toggleClass(self, 'focused');

    $.each(array, function (index, element) {
      removeClass(document.querySelector("[data-target='#" + element.id + "']"), 'focused');
      $(element).collapse('hide');
    });

    setTimeout(function () {
      $(".collapse" + self.getAttribute('data-target')).collapse('toggle');
    }, array.length ? 350 : 0);
  }

  function menuCloser () {
    removeClass(document.querySelector("[data-target='#" + this.parentNode.parentNode.id + "']"), 'focused');
    $(".collapse.in").collapse('hide');
  }

  function scrollFunction () {
    scrollPosition();
  }



// =========================
//      Event Listeners
// =========================
  for (var i = 0; i < pLinks.length; i++) {
    addEvent(pLinks[i], 'mousedown', rippleCreation);
    addEvent(pLinks[i], 'focus', collapseUpdater);
  }

  for (var i = 0; i < aLinks.length; i++) {
    addEvent(aLinks[i], 'mousedown', rippleCreation);
    addEvent(aLinks[i], 'mouseup', menuCloser);
  }

  onscroll = scrollFunction;
  scrollFunction();

});

