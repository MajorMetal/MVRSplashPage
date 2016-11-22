// This is a manifest file that'll be compiled into mobile.js, which will include all the files listed below.
//
//= require jquery
//= require jquery_ujs
//= require jquery.touchSwipe
//= require bootstrap/transition
//= require bootstrap/collapse
//= require bootstrap/carousel
//= require bootstrap/modal
//= require domEvents
//= require structural/scroll/mobile
//= require structural/swipe/main
//= require components/navbar/mobile
//= require components/timeline/mobile
//= require components/validation/validation
//= require components/button/button
//= require components/modal/imageModal

DOMEvent.add(document, 'DOMContentLoaded', function() {
  scrollController();
  swipeController();
  buttonController();
  navController();
  modalController();
  validationController();
});