'use strict';

angular.module('niiuWebappApp')
  .controller('UserhomeCtrl', ['$scope', 'niiuSyncer', function ($scope, niiuSyncer) {


	niiuSyncer.syncArticles().then( function(response) {
			console.log('this is what the sync said to the controller', response);

		}
		);





  }]);
