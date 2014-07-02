'use strict';

angular.module('niiuWebappApp')
  .filter('htmlToPlaintext', function() {
    return function(text) {
      return String(text).replace(/<[^>]+>/gm, '');
    }
  });
