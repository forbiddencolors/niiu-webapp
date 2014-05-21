'use strict';

angular.module('niiuWebappApp')
  .controller('UserhomeCtrl', ['$scope', 'niiuSyncer', 'localDB', function ($scope, niiuSyncer, localDB) {


	niiuSyncer.syncArticles().then( function(response) {
			console.log('this is what the sync said to the controller', response);

		}, function(error) {
			console.log('for this reason the article sync failed ',error);
			if (error.contents.status==409 || error.contents.message == "Perform 3s Sync") {
				niiuSyncer.sync3s().then(function(response3s) {
					console.log('we did a 3s sync and got the following response', response3s);


				}, function(error3s) {
						console.log('we couldnt even do a 3s sync because of ',error3s);


				});


			}

		});


	








	localDB.setLastSync();



  }]);
