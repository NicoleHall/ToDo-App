
var $ = require('jquery');

//  legacy loading for bootstrap for es5
window.jQuery = window.$ = $;
require('bootstrap');

import _ from 'underscore';
import Handlebars from 'handlebars';
import lscache from 'lscache';
import rawTemplate from 'templates/todoItem.html'
import modalTemplate from 'templates/todoModal.html'
//  creating a jQuery module
//  Data Model below
var todos;
var savedData = lscache.get('todos');
if (savedData === null) {
  todos = [];
} else {
  todos = savedData;
}
//  data model aka database
var todoSchema = function(todo){
  return _.defaults(todo, {
    id: 0,
    title: "",
    completed: false
  });
}

//  Application controller aka the one main object that stores everything our app needs
var template;
var app = {
  init: function(){
    app.compileTemplates();
    app.render();
  },
  render: function(){
    //  render the todos
    lscache.set('todos', todos);
    //  we are createting a keyvalue pair with lscache.set
    var todoHtml = _.map(todos, function(todo){
     return template(todo);
     // the return value ends up being HTML code
   });
    app.unbindEvents();
    $('ul.list-group').html(todoHtml.join(""));
    app.bindEvents();
  },
  compileTemplates: function(){
    template = Handlebars.compile(rawTemplate)
  },
  unbindEvents: function(){
    $('.list-group-item').off();
    $('.add-todo-container button').off();
    $('input[type="checkbox"]').off();
    $('.list-group-item button').off();
    $('.title-edit input').off();
  },
  bindEvents: function(){
    app.bindHoverEvents();
    app.bindCheckboxEvents();
    app.bindAddTodoEvents();
    app.bindRemoveTodoEvent();
    app.bindEditTodoEvents();
  },
  bindHoverEvents: function(){
    var $items = $('.list-group-item');
    $items.on('mouseover', function(){
      $(this).addClass('list-group-item-success');
    });
    $items.on('mouseout', function(){
      $(this).removeClass('list-group-item-success');
    });
  },
  bindCheckboxEvents: function(){
    var $checkboxes = $('input[type="checkbox"]');
    $checkboxes.on('change', function(){
      var wasChecked = $(this).is(':checked');
      if (!wasChecked) {
        $(this).parent().parent().removeClass('disabled');
      } else {
        $(this).parent().parent().addClass('disabled');
      }
    });
  },
  bindAddTodoEvents: function(){
    var $container = $('.add-todo-container');
    $container.find('button').on('click', function(){
      var newTodoTitle = $container.find('input').val();
      if (_.isString(newTodoTitle) && newTodoTitle.length > 2) {
        var newTodoObject = todoSchema({
          id: todos.length,
          title: newTodoTitle
          completed: false
        });
        todos.push(newTodoObject);
        $container.find('input').val("");
        app.render();
      }
    });
  },
  bindRemoveTodoEvents: function(){
    $('.list-group-item button').on('click', function(){
      var index = $(this).parent().parent().index();
      todos.splice(index, 1);
      app.render();
    });
  },
  bindEditTodoEvents: function(){
    $('.title').on('click', function(){
      var whichTodo = $(this).attr('data-id');
      whichTodo = parseInt(whichTodo, 10);
      var editTodo = todos[whichTodo];
      var compiledTemplate = Handlebars.compile(modalTemplate);
      var fullHtml = compiledTemplate(editTodo);
      $('body').append(fullHtml);

      $('.modal').modal();

      $('.close, .btn-default, .modal-backdrop').on('click', function(){
        $('.modal, .modal-backdrop').remove();
      });
    });
  }
};

module.exports = app;
