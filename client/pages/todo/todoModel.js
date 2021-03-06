var $ = require('jquery');

// legacy loading for bootstrap
window.jQuery = window.$ = $;
require('bootstrap');

import _ from 'underscore';
import Backbone from 'backbone';
import lscache from 'lscache';

// Model

var TodoModel = Backbone.Model.extend({
  defaults: {
    todos: []
  },
  todoSchema: {
    id: 0,
    title: '',
    completed: false
  },
  fetch: function(){
    var that = this;
    $.ajax({
      url: '/api',
      method: 'GET',
      //  this complete function will be asychronis
      complete: function(response){
        var dataString = response.responseText;
        var data = JSON.parse(dataString);
        data = that.applySchema(data);
        that.set('todos', data);
      }
    });
    // var data = lscache.get('todos');
    // data = this.applySchema(data);
    // this.set('todos', data);
  },
  save: function(){
    var that = this;
    var todos = this.get('todos');
    $.ajax({
      url: '/api',
      method: 'POST',
      data: {todos: JSON.stringify(todos)},
      complete: function(response){
        var dataString = response.responseText;
        var data = JSON.parse(dataString);
        data = that.applySchema(data);
        that.set('todos', data);
      }
    });
  },
  applySchema: function(todos){
    var data = todos;
    var schema = this.todoSchema;
    data = (_.isArray(todos)) ? data : [];
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
    // finally actually remove the damn thing
    var todos = this.get('todos');
    todos.splice(id, 1);
    this.save();
  },
  itemCompleted: function(id, isCompleted){
    var todos = this.get('todos');
    var item = _.findWhere(todos, {id: id});
    item.completed = isCompleted;
    this.set('todos', todos);
    this.save();
  },
  editTitle: function(newTitle, id){
    var todos = this.get('todos');
    var item = _.findWhere(todos, {id: id});
    item.title = newTitle;
    this.set('todos', todos);
    this.save();
  }
});

var todoModel = new TodoModel();

module.exports = todoModel;
