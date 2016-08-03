var scrollController = (function() {
  // Function variables.
  var checkIfInView;

  // jQuery variables.
  var $elements = $('.image--client');
  var $body = $('html, body');

  // Regular variables.
  var timer = 100;
  var reset;

  checkIfInView = function checkIfInView() {
    $.each($elements, function() {
      var $element = $(this);
      var offset = $element.offset().top + 48;

      if (offset <= $body.height() && !$element.data('triggered')) {
        $element.data('triggered', true)

        setTimeout(function() {
          $element.removeClass('hidden');
        }, timer);

        if (reset) clearTimeout(reset);

        reset = setTimeout(function() { timer = 100; }, timer);

        timer += 100;
      };
    });
  };

  $(window).on('scroll resize orientationchange', checkIfInView);
});
