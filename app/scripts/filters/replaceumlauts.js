'use strict';

angular.module('niiuWebappApp')
  .filter('replaceUmlauts', function () {
    return function (foreignText) {

      foreignText.replace('ä','&auml;').replace('Ä','&Auml;').replace('ö','&ouml;').replace('Ö','&Ouml;').replace('ü','&uuml;').replace('Ü','&Uuml;').replace('ß','&szlig;');
      console.log('the filtered foreignText',foreignText);
      return foreignText;
    };
  });
