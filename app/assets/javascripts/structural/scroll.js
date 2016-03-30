var scrollController = (function() {
  // Function variables.
  var checkIfInView;

  // jQuery variables.
  var $elements = $('.image--client');
  var $window   = $(window);


  checkIfInView = function checkIfInView() {
    var windowBottom  = $window.scrollTop() + $window.height();
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
  };

  $window.on('scroll', checkIfInView);
});
