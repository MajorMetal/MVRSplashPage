// This is a manifest file that'll be compiled into mobile.js, which will include all the files listed below.
//
//= require jquery
//= require jquery_ujs
//= require jquery.touchSwipe.min
//= require bootstrap.min
//= require structural/scroll/mobile
//= require structural/swipe
//= require components/navbar/mobile
//= require components/timeline/mobile
//= require components/validation/validation
//= require components/button/button
//= require components/modal/imageModal

$(function() {
  scrollController();
  swipeController();
  buttonController();
  navController();
  modalController();
  validationController();
});