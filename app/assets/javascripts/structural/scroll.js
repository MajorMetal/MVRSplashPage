var scrollController = (function() {
  // Function variables.
  var checkIfInView;

  // jQuery variables.
  var $elements = $('.image--client');
  var $window   = $(window);
  var $navbar   = $('.nav');


  checkIfInView = function checkIfInView() {
    var windowHeight  = $window.height();
    var windowTop     = $window.scrollTop();
    var windowBottom  = windowTop + windowHeight;
    var navbarOffset  = windowHeight - 48;
    var timer         = 100;

    $.each($elements, function() {
      var $element  = $(this);
      var offset    = $element.offset().top + 48;

      if (offset <= windowBottom && $element.hasClass('hidden')) {
        setTimeout(function() {
          $element.removeClass('hidden');
        }, timer);

        timer += 250;
      };
    });

    if (windowTop >= navbarOffset) {
      $navbar.css('position', 'fixed');
      $navbar.css('top', 0);
    } else {
      $navbar.css('position', 'absolute');
      $navbar.css('top', navbarOffset + 'px');
    };
  };

  $window.on('scroll', checkIfInView);
});
