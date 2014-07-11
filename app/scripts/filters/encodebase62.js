'use strict';

angular.module('niiuWebappApp')
  .filter('encodeBase62', function () {
    /**
 * Encodes a Number using base62
 *
 * @param {Number} num Number to be encoded
 * @return {String} Base62 encoded string
 */
return function (num) {
    var symbols = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
        conversion = "",
        temp;
    while (num >= 1) {
        temp = Math.floor(num / 62);
        conversion = symbols[(num - (62 * temp))] + conversion;
        num = temp;
    }
    return conversion;
};



  });
