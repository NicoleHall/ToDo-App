var $ = require('jquery');

window.jQuery = window.$ = $;
require('bootstrap');

import _ from 'underscore';
import Backbone from 'backbone';
import Handlebars from 'handlebars';
import lscache from 'lscache';
import rawTemplate from 'html!templates/todoItem.html';


//  Backbone Todo app

var TodoModel;
var TodoControllerView;
var TodoView;

var todoModel;
var todoControllerView;

//  Model


var TodoModel = Backbone.Model.extend({
  defaults: {

  },
  fetch: function(){
    //  gets the data
  },
  save: function(){
    //  saves the data
  }
});
var todoModel = new TodoModel();  // <-- this is now our model

// View
var TodoControllerView = Backbone.View.extend({
  el: 'body',
  model: todoModel,
  events: {
  },
  initialize: function(){},// here is where we are setting up listeners to our databas },
  render: function(){
    alert('backbone!');
  }
});


var todoControllerView = new TodoControllerView();
module.exports = todoControllerView;
