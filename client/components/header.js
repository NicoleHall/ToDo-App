import $ from 'jquery';
import navbar from 'html!templates/navbar.html';

var app = {
  init: function(){
    app.render();
  },
  render: function(){
    $('header').append(navbar);
  }
};

module.exports = app;
