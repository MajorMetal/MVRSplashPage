$(function () {
  $('#mixer-4-timer').countdown('04/11/2016 7:00 PM', function (event) {
    this.textContent = event.strftime('%-D %H:%M');
  });
});