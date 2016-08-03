var modalController = (function() {
  $('#image-modal').on('show.bs.modal', function(event) {
    $(this).find('#modal-image').attr(
      'src', $(event.relatedTarget).attr('src')
    );
  });
});
