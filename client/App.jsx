import $ from 'jquery';
import 'styles/main.scss';
import todos from 'pages/todo-backbone';
import project from 'pages/project';
import funnySquares from 'pages/funnySquares';
import header from 'components/header';
import personalPortfolio from 'pages/personalPortfolio';
import dataVisualization from 'pages/dataVisualization';
import horse from 'pages/horse';



$(function(){
  header.init();

  //  what page are we on?
  var url = window.location.pathname;

  //  this is the javascript router

  switch (url) {
    case '/':
      personalPortfolio.init();
      break;
    case '/pages/todo.html':
      todos.render();
      break;
    case '/pages/project.html':
      project.init();
      //  init the project javascript
      break;
    case '/pages/funnySquares.html':
        funnySquares.init();
        break;
    case '/pages/dataVisualization.html':
        dataVisualization.init();
        break;
    case '/pages/horse.html':
        horse.init();
        break;
  }
//  fancy console message for developers
console.log("==========================");
console.log("==========================");
console.log("==I am looking for a job==");
console.log("==========================");
console.log("==========================");
});


//  these import statements are how web pack does what it does
