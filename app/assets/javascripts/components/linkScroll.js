$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') !== this.pathname.replace(/^\//,'') &&
        location.hostname !== this.hostname) {
      return;
    }

    var $target = $(this.hash);

    $target = $target.length ? $target : $('[name=' + this.hash.slice(1) +']');

    if (!$target.length) return;

    var scrollTo = $target.offset().top - $('#navbar').height();
    var scrollPos = $(window).scrollTop();
    var scrollDistance = scrollPos > scrollTo ? scrollPos - scrollTo : scrollTo - scrollPos;

    $('html,body').animate({
      scrollTop: scrollTo
    }, scrollDistance);

    return false;
  });
});
