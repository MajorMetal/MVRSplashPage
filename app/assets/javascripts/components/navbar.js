$(function() {
  var $navbar = $('#navmenu');
  var $navLinks = $navbar.find('a');

  $navLinks.click(function() {
    $navbar.offcanvas('hide');
  });
});
