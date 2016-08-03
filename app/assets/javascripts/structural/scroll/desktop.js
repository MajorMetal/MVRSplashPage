var scrollController = (function() {
  // Function variables.
  var checkIfInView;

  // jQuery variables.
  var $elements = $('.image--client');
  var $window = $(window);
  var $navMenu = $('.nav_menu');

  // Regular variables.
  var timer = 100;
  var navbarOffset = $navMenu.offset().top;
  var reset;

  checkIfInView = function checkIfInView() {
    var windowBottom = $window.scrollTop() + $window.height();

    $.each($elements, function() {
      var $element = $(this);
      var offset = $element.offset().top + 48;

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

    if ($window.scrollTop() >= ($window.height() - $navMenu.height())) {
      $navMenu.css('position', 'fixed');
      $navMenu.css('top', '0');
    } else {
      $navMenu.css('position', '');
      $navMenu.css('top', '');
    };
  };

  $window.on('scroll resize', checkIfInView);
});
