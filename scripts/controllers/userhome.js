'use strict';

angular.module('niiuWebappApp')
  .controller('UserhomeCtrl', ['$scope', 'niiuSyncer', 'localDB', function ($scope, niiuSyncer, localDB) {

  	console.log('do we have the scope.user?',$scope.user);
  	localDB.getLastSync().then(
  		function(sync_time) {
  			    console.log('ive got the sync time in userHome' ,sync_time);

  			    

  			    console.log('now ive also got the update time', update_time);


  			    var articleBlob = niiuSyncer.syncArticles($scope.user, sync_time, cp_update_time);

  			    return articleBlob;

  		},
  		function(error) {
  			console.log('we werent able to get a sync time, so we wont bother getting any articles', error);

  		});


/*
	niiuSyncer.syncArticles().then( function(response) {
			console.log('this is what the sync said to the controller', response);

		}, function(error) {
			//we got an error trying to do the article sync
			console.log('for this reason the article sync failed ',error);
			if (error.contents.status==409 || error.contents.message == "Perform 3s Sync") {
				var do_3s = niiuSyncer.sync3s();
				console.log('niiuSyncer exists and looks like', niiuSyncer);
				console.log('do_3s looks like', do_3s);
				do_3s.then(function(response3s) {
					console.log('we did a 3s sync and got the following response', response3s);
					console.log('that means the last 3s sync was at ',response3s.data.contents.data.last3SSync);
					niiuSyncer.syncArticles().then( function(response) {
							console.log('this is what the sync said to the controller 2nd time', response);

						});


				},
				function(error3s) {
						console.log('we couldnt even do a 3s sync because of ',error3s);


				});

				


			}

		});


	*/








	localDB.setLastSync();



  }]);
