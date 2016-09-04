'use strict';

var appUrl = window.location.origin;
var ajaxFunctions = {
   ready: function ready (fn) {
      if (typeof fn !== 'function') {
         return;
      }

      if (document.readyState === 'complete') {
         return fn();
      }
      document.addEventListener('DOMContentLoaded', fn, false);
   },
   ajaxRequest: function ajaxRequest (method, url, callback) {
      var xmlhttp = new XMLHttpRequest();
      console.log("*** we are in ajaxRequest");
      xmlhttp.onreadystatechange = function () {
         console.log("we are in onreadystatechange");
         if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            callback(xmlhttp.response);
         }
      };
      xmlhttp.open(method, url,true);
      console.log("+++ we are sending again");
      xmlhttp.send();
   }
};