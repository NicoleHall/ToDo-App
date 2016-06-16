import $ from 'jquery';
import Handlebars from 'handlebars';
import photoTemplate from 'html!templates/flickrImage.html';
import _ from 'underscore';

var compiledTemplate = Handlebars.compile(photoTemplate);
var app = {
  init: function(){
    app.render();
  },
  render: function(){
    app.$input = $('.search-container input');
    app.bindEvents();
  },
  bindEvents: function(){
    app.$input.on('keypress', app.searchKeyPress);
  },
  searchKeyPress: function(event){
    if (event.which === 13) {
      app.doSearch();
    }
  },
  doSearch: function(){
    var phrase = app.$input.val();
    $.ajax({
      url: 'https://api.flickr.com/services/rest',
      method: 'GET',
      data: {
        text: phrase,
        method: 'flickr.photos.search',
        api_key: 'd8a25eb507471e8fa1ed88bc97ed1cce',
        format: 'json',
        per_page: 40
      },
      complete: function(response){
        var text = response.responseText;
        text = text.slice(14, text.length - 1);
        var data = JSON.parse(text);
        app.renderResults(data);
      }
    });
  },
  renderResults: function(data){
    var html = '';
    var myPhotos = data.photos.photo;
    myPhotos.forEach(function(item){
      html = html + compiledTemplate(item);
    }),

    $('.search-results').html(html);
    //  pass data to the templetate
    // append result to the .search-result div

  }
};

module.exports = app;
