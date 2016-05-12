var app = {
  init: function(){
    $('#button_called_hide').click(function(){
      $('img').addClass('hidden')
    });
  }
};

module.exports = app;
