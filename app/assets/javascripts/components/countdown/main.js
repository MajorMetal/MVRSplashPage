var countdownController = function() {

  $('#mixer-5-timer').countdown('05/23/2016 8:00 PM', function(event) {
    var days    = this.querySelector('.days');
    var hours   = this.querySelector('.hours');
    var minutes = this.querySelector('.minutes');

    days.textContent    = event.strftime('%-D');
    hours.textContent   = event.strftime('%H');
    minutes.textContent = event.strftime('%M');
  });

};