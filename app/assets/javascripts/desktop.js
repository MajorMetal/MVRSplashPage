// This is a manifest file that'll be compiled into application.js, which will include all the files listed below.
//
//= require jquery
//= require jquery_ujs
//= require jquery.countdown.min
//= require bootstrap.min
//= require structural/scroll/desktop
//= require components/navbar/desktop
//= require components/timeline/desktop
//= require components/validation/validation
//= require components/button/button
//= require components/countdown/main
//= require components/modal/imageModal

$(function() {
  scrollController();
  buttonController();
  navController();
  countdownController();
  modalController();
  validationController();
});
