var $ = require('jquery');


window.jQuery = window.$ = $;
require('bootstrap');

import _ from 'underscore';
import Backbone from 'backbone'; // you must do backbone after underscore
import Handlebars from 'handlebars';
import lscache from 'lscache';
import listTemplate from 'html!templates/accountList.html';
import createTemplate from 'html!templates/createAccount.html';

// Model

var accountModelConfigObject = {
  defaults: {
    accounts: []
  },
  save: function(){
    var data = this.get('accounts');
    lscache.set('accounts', data);
  },
  fetch: function(){
    var data = lscache.get('accounts');
    data = data || [];
    this.set('accounts', data);
  }
};

var AccountModel = Backbone.Model.extend(accountModelConfigObject);
var accountModel = new AccountModel();


// Controller

var controllerConfigObject = {
  el: '.page-container',
  model: accountModel,
  events: {
    'click .btn-create': 'createNewAccount'
  },
  initialize: function(){
    this.model.fetch();
  },
  render: function(){
    var listView = new ListView();
    this.$el.find('.view-container').html(listView.$el);
  },
  createNewAccount: function(){
    var createView = new CreateView();
    this.$el.find('.view-container').html(createView.$el);
  }
};

var AccountControllerView = Backbone.View.extend(controllerConfigObject);



// Views

var listViewConfig = {
  tagName: 'div',
  events: {},
  template: Handlebars.compile(listTemplate),
  initialize: function(){
    this.render();
  },
  render: function(){
    var renderedTemplate = this.template({});
    this.$el.html(renderedTemplate);
  }
};
var ListView = Backbone.View.extend(listViewConfig);

var createViewConfig = {
  tagName: 'div',
  template: Handlebars.compile(createTemplate),
  events: {
    'click .btn-done': 'submitForm'
  },
  initialize: function(){
    this.render();
  },
  render: function(){
    var renderedTemplate = this.template({});
    this.$el.html(renderedTemplate);
  },
  submitForm: function(){
    accountControllerView.render();
  }
};
var CreateView = Backbone.View.extend(createViewConfig);

var accountControllerView = new AccountControllerView();


module.exports = accountControllerView;
