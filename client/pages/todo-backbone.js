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
    todos = []
  },
  todoSchema: {
    id: 0,
    title: "",
    completed: false
  },
  fetch: function(){
    var data = lscache.get('todos');
    data = this.applySchema(data);
    this.set('todos', data); // this sets the value of todos (first argument) equal to the value of data (second argument)
  },
  save: function(){
    var data = this.get('todos');
    data = this.applySchema(data);
    lscache.set('todos', data);
  },
  applySchema: function(todos){
    var data = todos;
    var schema = this.todoSchema;
    data = (_.isArray(todos)) ? data : [] ; // this is a short hand if statement.  if the value before the question mark, use the value before the colon, if false, use the value after the question mark
    data = data.map(function(todo, index){
      todo.id = index;
      return _.defaults(todo, schema);
    });

    return data;
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
