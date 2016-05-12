var app = {
  init: function(){
    $('#button_called_hide').on("click", function(){
      $('img').addClass('hidden');
    });

    $('#button_called_show').on("click", function(){
      $('img').removeClass('hidden');
    });
  }
};

module.exports = app;
