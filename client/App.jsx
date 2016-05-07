import $ from 'jquery';
import _ from 'underscore';
import Handlebars from 'handlebars';
import lscache from 'lscache';

//  creating a jQuery module
$(function(){
  //  data model aka database
  var savedData = lscache.get('toDos');
  var toDos;
  if (savedData === null){
    toDos = [];
  } else {
    toDos = savedData;
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
      lscache.set('toDos', toDos)
      //  we are createating a keyvalue pair on line 28
      var todoHtml = _.map(toDos, function(toDo){
       return template(toDo);
       // the return value ends up being HTML code
     });
      app.unbindEvents();
      $('ul.list-group').html(todoHtml.join(''));
      app.bindEvents();
    },
    unbindEvents: function(){
      $('.list-group-item').off();
      $('.add-todo-container button').off();
      $('input[type="checkbox"]').off();
      $('.add-todo-container button').off();
    },
    compileTemplates: function(){
      //  template is a function that you pass the data object to.  You just have to know that....
      template = $('[type="text/x-handlebars-template"]');
      template = Handlebars.compile(template.first().html());
    },
    bindEvents: function(){
      app.bindHoverEvents();
      app.bindCheckboxEvents();
      app.bindAddTodoEvents();
      app.bindRemoveTodoEvent();
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
        var isChecked = !$(this).is(':checked');
        if (isChecked) {
          //  if a checkbox is checked, remove the check
          $(this).parent().parent().removeClass('disabled');
        } else {
          $(this).parent().parent().addClass('disabled');
        }
      });
    },
    bindAddTodoEvents: function(){
      $('.add-todo-container button').on('click', function(){
        var newTodoTitle = $('.add-todo-container input').val();
        if (_.isString(newTodoTitle) && newTodoTitle.length > 2){
          var newTodoObject = { title: newTodoTitle, completed: false };
          toDos.push(newTodoObject);
          $('.add-todo-container input').val('');
          app.render();
        }

      });
    },
    bindRemoveTodoEvent: function(){
      $('.list-group-item button').on('click', function(){
        var index = $(this).parent().parent().index();
        toDos.splice(index, 1);
        app.render();
      });
    }
  };

  app.init();

});
