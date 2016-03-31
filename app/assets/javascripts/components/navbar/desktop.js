var navController = (function() {
  // Function variables.
  var includes;
  var createClickRipple;
  var rippleCreation;
  var clickHandler;
  var menuClose;
  var openSubMenu;

  // DOM Element variables.
  var nav         = document.getElementById('nav');
  var navButtons  = nav.querySelectorAll('p');
  var navLinks    = nav.querySelectorAll('a');

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

    if (document.activeElement == target) DOMEvent.trigger(target, 'focus');
  };

  clickHandler = function clickHandler(event) {
    if (includes(event.target, navLinks)) {
      var target  = $(event.target.hash);

      rippleCreation(event);
      
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top - 48
        }, 1000);
      };

    } else if (includes(event.target, navButtons)) {
      var scrollPos = $(window).scrollTop();
      var target = $(event.target.getAttribute('data-target'));

      rippleCreation(event);

      if (scrollPos <= 0) {

        $('html, body').animate({
          scrollTop: scrollPos + 80
        }, 250);

      } else if (scrollPos === 80 && target.attr('aria-expanded') === 'true') {

        $('html, body').animate({
          scrollTop: 0
        }, 250);

      };

    };
  };

  // Navbar button onfocus event handler.
  openSubMenu = function openSubMenu() {
    var $this   = $(this);
    var target  = $this.data('target');
    var array   = $(".collapse.in:not(" + target + ")");

    $this.toggleClass('focused');

    $.each(array, function(index, element) {
      $("[data-target='#" + element.id + "']").removeClass('focused');
      $(element).collapse('hide');
    });

    setTimeout(function() {
      $(".collapse" + target).collapse('toggle');
    }, array.length ? 350 : 0);

  };

  // Navbar link onmouseup event handler.
  menuCloser = function menuCloser() {
    $("[data-target='#" + this.parentNode.parentNode.id + "']").removeClass('focused');
    $(".collapse.in").collapse('hide');
  };


  // Event Listeners.
  DOMEvent.add(nav, 'mousedown', clickHandler);

  for (var i = 0; i < navButtons.length; i++) {
    DOMEvent.add(navButtons[i], 'focus', openSubMenu);
  };

  for (var i = 0; i < navLinks.length; i++) {
    DOMEvent.add(navLinks[i], 'mouseup', menuCloser);
  };

});
