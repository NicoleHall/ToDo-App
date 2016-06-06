var $ = require('jquery');

window.jQuery = window.$ = $;
require('bootstrap');

import _ from 'underscore';
import Backbone from 'backbone';
import Handlebars from 'handlebars';
import lscache from 'lscache';
import todoItemTemplate from 'html!templates/todoItem.html';


//  Backbone Todo app

var TodoModel;
var TodoControllerView;
var TodoView;
var TodoItemView;

var todoModel;
var todoControllerView;

//  Model

TodoModel = Backbone.Model.extend({
  defaults: {
    todos: []
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
    data = (_.isArray(todos)) ? data : []; // this is a short hand if statement.  if the value before the question mark, use the value before the colon, if false, use the value after the question mark
    data = data.map(function(todo, index){
      todo.id = index;
      return _.defaults(todo, schema);
    });

    return data;
  },
  addItem: function(newTitle){
    var newTodo = {title: newTitle};
    var todos = this.get('todos');
    todos.push(newTodo);
    this.set('todos', todos);
    this.save();
  },
  removeItem: function(id){
    //  actually do the removing from the data model
    var todos = this.get('todos');
    todos.splice(id, 1);
    this.save();
  }
});
var todoModel = new TodoModel();  // <-- this is now our model

// View
var TodoControllerView = Backbone.View.extend({
  el: '.todo-container',
  model: todoModel,
  events: {
    "click .btn-add": "addTodoItem"
  },
  initialize: function(){
    this.model.fetch();
    this.listenTo(this.model, 'change', this.render);
  },// here is where we are setting up listeners to our database

render: function(){
    // render the todo items
    var todos = this.model.get('todos');
    var $ul = this.$el.find('ul');
    $ul = this.$el.find('ul'); // this clears out the ul before we append new items
    $ul.html('');
    todos.map(function(todo){
      var view = new TodoItemView(todo);
      $ul.append(view.$el);
    });
  },
  addTodoItem: function(){
    var $input = this.$el.find('.input-name');
    var newTitle = $input.val();
    if (newTitle === '') { return; }
    this.model.addItem(newTitle);
    $input.val(''); //sets input back to empty so the user can add more stuff
    this.render();
  },
  removeItem: function(id){
    this.model.removeItem(id);
    this.render();
  }
});
TodoItemView = Backbone.View.extend({
  tagName: 'li', // el = <li></li> (which won't exist until render)
  className: '.list-group-item.row',
  events: {
    'click .close': 'removeItem'
  },
  template: Handlebars.compile(todoItemTemplate),
  initialize: function(todo){
    this.data = todo;
    this.render(todo);
  },
  render: function(todo){
    this.$el.html(this.template(this.data));
  },
  removeItem: function(){
   // debugger;
    todoControllerView.removeItem(this.data.id);
  }
});

var todoControllerView = new TodoControllerView();
module.exports = todoControllerView;
