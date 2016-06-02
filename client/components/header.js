import $ from 'jquery';
import navbar from 'html!templates/navbar.html';
//  import navbar from 'templates/navbar.html';
//  use this line if the line with the bang breaks


var app = {
  init: function(){
    app.render();
  },
  render: function(){
    $('header').append(navbar);
  }
};

module.exports = app;
