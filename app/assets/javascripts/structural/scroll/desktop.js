var scrollController = (function() {
  // Function variables.
  var checkIfInView;

  // jQuery variables.
  var $elements = $('.image--client');
  var $window   = $(window);
  var navbar    = $('#nav');

  // Regular variables.
  var timer         = 100;
  var navbarOffset  = navbar.offset().top;
  var reset;

  checkIfInView = function checkIfInView() {
    var windowBottom  = $window.scrollTop() + $window.height();

    $.each($elements, function() {
      var $element  = $(this);
      var offset    = $element.offset().top + 48;

      if (offset <= windowBottom && !$element.data('triggered')) {
        $element.data('triggered', true)
        
        setTimeout(function() {
          $element.removeClass('hidden');
        }, timer);

        if (reset) clearTimeout(reset);

        reset = setTimeout(function() { timer = 100; }, timer);

        timer += 100;
      };
    });

    if ($window.scrollTop() >= ($window.height() - 48)) {
      navbar.css('position', 'fixed');
      navbar.css('top', '0');
    } else {
      navbar.css('position', '');
      navbar.css('top', '');
    };
  };

  $window.on('scroll', checkIfInView);
  DOMEvent.add(window, 'resize', checkIfInView);
});
