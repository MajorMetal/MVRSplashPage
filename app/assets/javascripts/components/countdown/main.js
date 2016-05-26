var countdownController = function() {

  $('#mixer-7-timer').countdown('06/20/2016 8:00 PM', function(event) {
    var days    = this.querySelector('.days');
    var hours   = this.querySelector('.hours');
    var minutes = this.querySelector('.minutes');

    days.textContent    = event.strftime('%-D');
    hours.textContent   = event.strftime('%H');
    minutes.textContent = event.strftime('%M');
  });

  $('#socalvr-timer').countdown('10/29/2016 12:00 PM', function(event) {
    var days    = this.querySelector('.days');
    var hours   = this.querySelector('.hours');
    var minutes = this.querySelector('.minutes');

    days.textContent    = event.strftime('%-D');
    hours.textContent   = event.strftime('%H');
    minutes.textContent = event.strftime('%M');
  });

};
