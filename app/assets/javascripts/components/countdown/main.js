var countdownController = function() {

  $('#hack-n-haunt-timer').countdown('09/9/2016 7:00 PM', function(event) {
    var days    = this.querySelector('.days');
    var hours   = this.querySelector('.hours');
    var minutes = this.querySelector('.minutes');

    days.textContent    = event.strftime('%-D');
    hours.textContent   = event.strftime('%H');
    minutes.textContent = event.strftime('%M');
  });

};
