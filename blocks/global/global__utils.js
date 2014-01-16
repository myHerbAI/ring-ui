define(function() {
  'use strict';

  // Utils
  var utils = {};

  utils.isDeferred = function(obj) {
    return !!obj && typeof obj === 'object' && obj.hasOwnProperty('promise') && typeof obj.promise === 'function';
  };

  utils.isNode = function(obj) {
    return typeof Node === 'object' ? obj instanceof Node : obj && typeof obj === 'object' && typeof obj.nodeType === 'number';
  };

  utils.isEmptyString = function(str) {
    return str.replace(/\s+/, '') === '';
  };

  // Ported from jQuery to support contentEditable
  utils.isFocused = function(elem) {
    elem = elem[0] || elem;

    return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex || elem.contentEditable === 'true');
  };

  //@exclude
  var debug = function() {
    return window.location.toString().indexOf('ring-debug') !== -1;
  };

  utils.log = function(message) {
    if (debug() && window['console'] && window['console']['log']) {
      console.log(message);
    }
  };
  //@endexclude

  return utils;
});