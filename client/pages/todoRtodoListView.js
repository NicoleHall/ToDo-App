var $ = require('jquery');

// legacy loading for bootstrap
window.jQuery = window.$ = $;
require('bootstrap');

import _ from 'underscore';
import Backbone from 'backbone';
import Handlebars from 'handlebars';
import todoModel from 'pages/todo/todoModel';
import TodoItemView from 'pages/todo/todoView';

// controller view

var TodoListView = Backbone.View.extend({
  el: '.todo-container',
  model: todoModel,
  events: {
    'click .btn-add': 'addTodoItem'
  },
  initialize: function(){
    this.model.fetch();
    this.model.on('change', this.render, this);
  },
  render: function(){
    // render the todo items
    var todos = this.model.get('todos');
    var $ul = this.$el.find('ul');
    $ul.html('');
    todos.map(function(todo){
      var view = new TodoItemView(todo, controller);
      $ul.append(view.$el);
    });
  },
  addTodoItem: function(){
    var $input = this.$el.find('.input-name');
    var newTitle = $input.val();
    if (newTitle === '') { return; }
    this.model.addItem(newTitle);
  },
  removeItem: function(id){
    this.model.removeItem(id);
    this.render();
  },
  itemCompleted: function(id, isCompleted){
    this.model.itemCompleted(id, isCompleted);
    this.render();
  },
  titleEdit: function(newTitle, id){
    this.model.editTitle(newTitle, id);
    this.render();
  }
});

module.exports = TodoControllerView;
