var scrollController = (function() {
  // Function variables.
  var checkIfInView;

  // jQuery variables.
  var $elements = $('.image--client');
  var $window   = $(window);

  var timer = 100;
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

        timer += 200;
      };
    });
  };

  $window.on('scroll', checkIfInView);
  DOMEvent.add(window, 'resize', checkIfInView);
});
