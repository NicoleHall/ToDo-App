import $ from 'jquery';
import 'styles/main.scss';
import todos from 'pages/todo';
import project from 'pages/project';
import funnySquares from 'pages/funnySquares';

$(function(){
  //  what page are we on?
  var url = window.location.pathname;

  //  this is the javascript router

  switch (url) {
    case '/pages/todo.html':
      todos.init();
      break;
    case '/pages/project.html':
      project.init();
      //  init the project javascript
      break;
    case '/pages/funnySquares.html':
        funnySquares.init();
        break;
  }

});


//  these import statements are how web pack does what it does
