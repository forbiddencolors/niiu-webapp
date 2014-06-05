'use strict';

angular.module('niiuWebappApp')
  .controller('UserhomeCtrl', ['$scope', 'niiuSyncer', 'localDB','$q','Articleservice', function ($scope, niiuSyncer, localDB, $q, Articleservice) {

  	console.log('do we have the scope.user?',$scope.user);

  	$scope.pageClass='userHome';


    var deferred = $q.defer();


    function getArticleList() {

	  	
	  	localDB.getLastSync().then(
	  		function(sync_time) {
	  			    console.log('ive got the sync time in userHome' ,sync_time);

	  			    localDB.getLastProfileUpdate().then(function(update_time) {

			  			    console.log('now ive also got the update time. So its time to send an article sync.', update_time);

			  			    niiuSyncer.syncArticles($scope.user, sync_time, update_time).then(function(articleBlob) {

			  			    	console.log('The api sync response looked like this',articleBlob);


			  			    	deferred.resolve(articleBlob);
			  			    	


			  			    }, function(server_error) {
			  			    		console.log('The api sync response looked like this',server_error);
			  			    		deferred.reject(server_error);
			  			    }



			  			    	);
			  			    

			  			}
				);

	  		},
	  		function(error) {
	  			console.log('we werent able to get a sync time, so we wont bother getting any articles', error);
	  			deferred.reject(error);

	  		});

	  	return deferred.promise;
    } //end $scope.articleList

//get the prior articles from the scope
console.log('just seeing if theres a scope here',$scope);

console.log('are we online?',navigator.onLine);


function refreshArticles() {

	//replace the scope articles if we have new ones
	getArticleList().then( function(theList){
			console.log('article list is finished',theList);
			$scope.articles=theList.contents.data.articles;

			//Put the articles into the service so we can get at them later
			Articleservice.init(theList.contents.data.articles);

			//put the articles in the db so we can get to them if the user is offline or leaves the site
			localDB.addArticlesToDB(theList.contents.data.articles);

		},  function(noList) {
			console.log('crap our attempt to get a list failed.',noList);
		}
	);

}




/*
 articleList.then(function(article_list) {
 		console.log('i am going to throw this article list up to the scope',article_list);
 		$scope.articles=article_list;
 }


 	);

*/



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

	function refresh3s() {

			niiuSyncer.sync3s().then(function(data_3s) {
			console.log('here is some 3s data',data_3s);
				console.log('>>> here are the sections ' ,data_3s.data.contents.data.newSections);
				//add sections to DB
				localDB.addSectionsToDB(data_3s.data.contents.data.newSections);
				localDB.addSourcesToDB(data_3s.data.contents.data.newSources);
				localDB.addSourceSectionsToDB(data_3s.data.contents.data.newSourceSection);
				localDB.addSectionSubsectionsToDB(data_3s.data.contents.data.newSectionSubsection);
				localDB.addSubSectionsToDB(data_3s.data.contents.data.newSubsections);
				localDB.addSourceSubsectionsToDB(data_3s.data.contents.data.newSourceSubsection);
				localDB.setLastSync();
				//add sections to Scope
				$scope.sections=data_3s.data.contents.data.newSections;
				$scope.sources=data_3s.data.contents.data.newSources;
				console.log('section 7 is called', $scope.sections[7].name);

				//at this point we have all the 3s info and it should be saved so lets run



			}, 
			function(no_data_3s) {
				console.log('for some reason we couldnt get any 3s data',no_data_3s);
			}
			);

			
	}

	if (0) {
		//currently we are refreshing everytime the page loads, but probably we should do this only 
		//when last sync is a bit old maybe 10mins
		//when people first login
		//when people trigger a refresh (like dragging down in the ios app)
		refresh3s();
		refreshArticles();
	} else {
		//load3s();
		console.log('lets get some articles!');
		//put the article array into the service
		localDB.loadArticlesFromDB().then( function(db_articles) {
			console.log('got the following articles from the db',db_articles);
			Articleservice.init(db_articles);

			//works fine
			//$scope.articles=[{title:'action jackson',content:'it goes like this'}];
			$scope.articles=db_articles;

			console.log($scope.articles[1]);
			


		});



		
		

	}





  }]);
