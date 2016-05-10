import $ from 'jquery';
import 'styles/main.scss';
import todos from 'pages/todo';
import project from 'pages/project';
$(function(){
  todos.init();
});


//  these import statements are how web pack does what it does
