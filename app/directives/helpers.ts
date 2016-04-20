import {Directive, ElementRef, Renderer} from 'angular2/core';
import {Platform, Navbar} from 'ionic-angular';


export function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this, args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

function toQueryPair(key, value) {
  if (typeof value == 'undefined'){
    return key;
  }
  return key + '=' + encodeURIComponent(value === null ? '' : String(value));
}
export function toQueryString(obj) {
  var ret = [];
  for(var key in obj){
    key = encodeURIComponent(key);
    var values = obj[key];
    if(values && values.constructor == Array){//数组
      var queryValues = [];
      for (var i = 0, len = values.length, value; i < len; i++) {
        value = values[i];
        queryValues.push(toQueryPair(key, value));
      }
      ret = ret.concat(queryValues);
    }else{ //字符串
      ret.push(toQueryPair(key, values));
    }
  }
  return '?'+ret.join('&');
}

export function toBodyString(obj) {
  var ret = [];
  for(var key in obj){
    key = encodeURIComponent(key);
    var values = obj[key];
    if(values && values.constructor == Array){//数组
      var queryValues = [];
      for (var i = 0, len = values.length, value; i < len; i++) {
        value = values[i];
        queryValues.push(toQueryPair(key, value));
      }
      ret = ret.concat(queryValues);
    }else{ //字符串
      ret.push(toQueryPair(key, values));
    }
  }
  return ret.join('&');
}