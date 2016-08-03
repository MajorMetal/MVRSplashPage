var swipeController = (function() {
  var swiped;

  $('.carousel').swipe({
    preventDefaultEvents: false,
    allowPageScroll: 'VERTICAL',
    swipeRight: function() {
      swiped = true;
      $(this).carousel('prev');
    },
    swipeLeft: function() {
      $(this).carousel('next');
    }
  });

  $('#main').swipe({
    preventDefaultEvents: false,
    allowPageScroll: 'VERTICAL',
    swipeRight: function(event) {
      if (!swiped) {
        var $navToggle = $('#nav-toggle');

        $navToggle.prop('checked', true);
        $navToggle.trigger('change');
      } else {
        swiped = false;
      }
    }
  });

  $('label.nav-toggle').swipe({
    preventDefaultEvents: false,
    allowPageScroll: 'VERTICAL',
    excludedElements: 'button, input, select, textarea, a, .noSwipe',
    swipeLeft: function() {
      var $navToggle = $('#nav-toggle');

      $navToggle.prop('checked', true);
      $navToggle.trigger('change');
    }
  });
});
