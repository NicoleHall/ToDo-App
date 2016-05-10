import $ from 'jquery';
import 'styles/main.scss';
import todos from 'pages/todo';
import project from 'pages/project';

$(function(){
  //  what page are we on?
  var url = window.location.pathname;

  //  this is the javascript router
  
  switch (url) {
    case 'pages/todo.html':
      todos.init();
      break;
    case 'project/todo.html':
      //  init the project javascript
      break;
  }

});


//  these import statements are how web pack does what it does
