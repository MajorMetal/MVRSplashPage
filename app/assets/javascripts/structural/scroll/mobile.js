var scrollController = (function() {
  // Function variables.
  var checkIfInView;

  // jQuery variables.
  var $elements = $('.image--client');
  var $body     = $('html, body');
  var $main     = $('.main');

  // Regular variables.
  var timer = 100;
  var scrollTop;
  var reset;

  checkIfInView = function checkIfInView() {
    var scrollTop = Math.abs(
      $main.offset().top - $main.css('margin-top').replace('px', '')
    );

    $.each($elements, function() {
      var $element  = $(this);
      var offset    = $element.offset().top + 48;

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

    if (scrollTop > 50) {
      $body.css('background-color', '#212121');
    } else {
      $body.css('background-color', '#FFF');
    };
  };

  $body.on('scroll', checkIfInView);
  DOMEvent.add(window, 'orientationchange', checkIfInView);
  DOMEvent.add(window, 'resize', checkIfInView);
});
