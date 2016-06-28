var $ = require('jquery');

// legacy loading for bootstrap
window.jQuery = window.$ = $;
require('bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';
//import _ from 'underscore';
import Backbone from 'backbone';
import todoModel from 'pages/todoReact/todoModel';
import TodoItemView from 'pages/todoReact/todoView';
import dispatcher from 'pages/todoReact/todoDispatcher';


// controller view

var TodoListView = Backbone.View.extend({
  el: '.todo-container',
  model: todoModel,
  events: {
    'click .btn-add': 'addTodoItem',
    'keydown input.input-name': 'addTodoItemWithEnterKey'
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
    todos.forEach(function(todo){
      var $li = $('<li class="list-group-item row"></li>');
      $ul.append($li);
      ReactDOM.render(
        <TodoItemView data={todo} />,
        $li[0] // get original DOMnode from jQuery object
      );
    });
  },
  addTodoItem: function(){
    var $input = this.$el.find('.input-name');
    var newTitle = $input.val();
    dispatcher.addTodo(newTitle);
    $input.val('');
  },

  addTodoItemWithEnterKey: function(event){
    var code = event.keyCode || event.which;
    if (code === 13) {
      var $input = this.$el.find('input.input-name');
      var newTitle = $input.val();
      dispatcher.addTodo(newTitle);
      $input.val('');
    };
  }

});

module.exports = TodoListView;
