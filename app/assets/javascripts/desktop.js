// This is a manifest file that'll be compiled into application.js, which will include all the files listed below.
//
//= require jquery
//= require jquery_ujs
//= require jquery.countdown
//= require bootstrap/transition
//= require bootstrap/collapse
//= require bootstrap/scrollspy
//= require bootstrap/tab
//= require bootstrap/carousel
//= require bootstrap/modal
//= require domEvents
//= require structural/scroll/desktop
//= require components/navbar/desktop
//= require components/timeline/desktop
//= require components/validation/validation
//= require components/button/button
//= require components/countdown/main
//= require components/modal/imageModal

DOMEvent.add(document, 'DOMContentLoaded', function() {
  scrollController();
  buttonController();
  navController();
  countdownController();
  modalController();
  validationController();
});
