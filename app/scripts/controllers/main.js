'use strict';

angular.module('niiuWebappApp')
  .controller('MainCtrl', function ($scope, localDB) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    

var cartoonMemory=localDB.init('cartoons', { stores:[{ name:'cartoon_list', keyPath:'id' }] });


var record = {id: '8', name: 'Mickey Mouse'};
var req = cartoonMemory.put('cartoon_list', record);
//cartoonMemory.put(name:'MickeyMouse');
//console.log(localDB);

  });
