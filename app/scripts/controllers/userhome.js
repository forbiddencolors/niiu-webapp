'use strict';

angular.module('niiuWebappApp')
  .controller('UserhomeCtrl', ['$scope', 'niiuSyncer', 'localDB', '$q','$location','Articleservice', '$routeParams', 'constants','User', function ($scope, niiuSyncer, localDB, $q, $location, Articleservice, $routeParams, constants, User) {

  	


  	$scope.media_path=constants.ARTICLE_MEDIA_PATH;



  	$scope.pageClass="titlePage";


    $scope.slide_interval="10000";


  	$scope.makeSlides = function(titlePageContentObject) {
  		//takes page articles and returns them as an array of slides
  		var articleSlides=[];
  		for (var i=0;i<titlePageContentObject.articles.length;i++) {
  			if (titlePageContentObject.articles[i].media.length) {
  				articleSlides[articleSlides.length]={ 
  						imgTitle: titlePageContentObject.articles[i].title,
  						imgUrl: $scope.media_path+titlePageContentObject.articles[i].media[0].path,
  						imgLink:"#/article/"+titlePageContentObject.articles[i].id
  						}
  			}
  		}
  		console.log('articleSlides looks like',articleSlides);

  		return articleSlides;

  	}

  	$scope.getCarouselScope = function() {

  		console.log('heres this scope, ',$scope); 
  	}

  	$scope.sendThat = function(msg) {
  		console.log(msg);

  	}

  	$scope.nextSectionSwipe = function() {
  
    	console.log('user swiped to ', User.getNextSectionUrl($location.path()));
  
    	
    	$location.path("/sectionView/"+User.getNextSection());


    };

    $scope.previousSectionSwipe = function() {
  		
  		var previousSection=User.getPreviousSection();
    	console.log('user swiped back to section',previousSection );
  
    	
    	$location.path("/sectionView/"+previousSection);


    };



  	$scope.getLogoPath = function(source_id) {
  		//console.log('this source_id is',(Math.floor(source_id*1)>0));
  		//console.log('why are we calling this',$scope.slides)
  		if(source_id) {
  			return constants.SOURCE_LOGO_PATH;
  			//return ('yes '+Math.floor(source_id));
  		} else {
  			return "";
  			//return ('no '+Math.floor(source_id));
  		}
  	}


  	//$scope.user=User.getUser();

  	/*  //this would generate a content Object from nothing, but we'd rather do it from the articles and 3s we can access here
  		User.getContentObject().then(
  		function(contentObject) {
  			$scope.contentObject=contentObject; 
  			console.log('we just set the pages contentObject',contentObject);
  		},function(error) {
  			console.log('we couldnt set the scope ContentObject',error);
  		}
  		);
  	*/
  	localDB.get3sFromDB().then(function(data_3s) {
  		$scope.db3s=data_3s;
  		console.log('we got some data',data_3s);
  		getArticleList();
  	},function(no_3s) {
  		console.log('there is no 3s in the db',no_3s);
  		niiuSyncer.sync3s().then(function(data_3s) {
  			console.log('instead we just did a real 3s',data_3s);

  			localDB.put3s(data_3s.data).then(function(saved) {
  				getArticleList();

  			}

  				);
  		}

  			)
  	}
  	);


    var deferred = $q.defer();


    function getArticleList() {

	  	
	  	localDB.getLastSync().then(
	  		function(sync_time) {
	  			    console.log('ive got the sync time in userHome' ,sync_time);

	  			    localDB.getLastProfileUpdate().then(function(update_time) {

			  			    console.log('now ive also got the update time. So its time to send an article sync.', update_time);

			  			    niiuSyncer.syncArticles($scope.user, sync_time, update_time).then(function(articleBlob) {

			  			    	console.log('Good Luck, the api sync response looked like this',articleBlob);


			  			    	Articleservice.init(articleBlob.contents.data.articles);
			  			    	deferred.resolve(articleBlob);
			  			    	


			  			    }, function(server_error) {
			  			    		console.log('Bad Luck, the api sync response looked like this',server_error);
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
	var deferred=$q.defer();
	//replace the scope articles if we have new ones
	getArticleList().then( function(theList){
			console.log('article list is finished',theList);
			


			//Put the articles into the service so we can get at them later
			Articleservice.init(theList.contents.data.articles);

			var cleaned_articles=Articleservice.getArticles();
			$scope.articles=cleaned_articles;

			//put the articles in the db so we can get to them if the user is offline or leaves the site
			localDB.addArticlesToDB(cleaned_articles).then(function(added_articles) {
				console.log('articles added',added_articles);
				User.getContentObject();
				deferred.resolve(cleaned_articles);
			});
			

		},  function(noList) {
			console.log('crap our attempt to get a list failed.',noList);
			deferred.reject(noList);
		}

	);
	return deferred.promise;
}


	function refresh3s() {
			var deferred=$q.defer();
			niiuSyncer.sync3s().then(function(data_3s) {
			console.log('here is some 3s data',data_3s);
				console.log('>>> here are the sections ' ,data_3s.data.contents.data.newSections);
				//add sections to DB
					localDB.put3s(data_3s.data).then( function() {
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
						deferred.resolve(data_3s.data);
					});

				

				//at this point we have all the 3s info and it should be saved so lets run



			}, 
			function(no_data_3s) {
				console.log('for some reason we couldnt get any 3s data',no_data_3s);
				deferred.reject(no_data_3s);
			}
			);
			return deferred.promise;

			
	}

	console.log('the current sync is this old, ',localDB.getSyncAge());

	if (0 || $routeParams.refresh=='refresh') {
		//currently we are refreshing everytime the page loads, but probably we should do this only 
		//when last sync is a bit old maybe 10mins
		//when people first login
		//when people trigger a refresh (like dragging down in the ios app)
		refresh3s().then(function(new3s) {
			refreshArticles().then(function(new_article_blob) {

			//Put the articles into the service so we can get at them later
			Articleservice.init(new_article_blob.contents.data.articles);
			var cleaned_articles = Articleservice.getArticles();
			var newContentObject = User.setContentObject(new3s,cleaned_articles);
			$scope.contentObject = newContentObject;
			$scope.slides = $scope.makeSlides(newContentObject[0]);
			console.log('the slides are',$scope.slides);
			$scope.articles = cleaned_articles;
			$scope.user = User.getUser();
			console.log('The new contentObject is like',$scope.contentObject);

				/*
				User.setContentObject(new3s,new_articles).then(function(returned_contentObject) {
						console.log("does the getContentObject returns a promise all right.",returned_contentObject);
						$scope.contentObject = returned_contentObject;
					},function(returned_content_error) {
						console.log("we didnt get the contentObject at all right?",returned_content_error);
					}
				)
				*/
			
			}//end refreshArticles
			)
		}//end refresh3s


		);
	} else {
		//load3s();
		console.log('lets get some articles!');
		User.getContentObject().then(function(returned_contentObject) {
			console.log("retrieved contentObject.",returned_contentObject);
			$scope.contentObject = returned_contentObject;
			$scope.slides = $scope.makeSlides(returned_contentObject[0]);
		},function(returned_content_error) {
			console.log("we didnt get the contentObject from the db right?",returned_content_error);
		}

			);
		
		
		//put the article array into the service
		localDB.loadArticlesFromDB().then( function(db_articles) {
			console.log('got the following articles from the db',db_articles);
			if (db_articles.length>0) {
				Articleservice.init(db_articles);
				$scope.articles=db_articles;
				console.log('checking for my methods', User);
				User.getContentObject($scope.db3s,db_articles).then(function(returned_contentObject) {
					
					$scope.contentObject = returned_contentObject;
					console.log('our $scope.contentObject is',$scope.contentObject);
					//$scope.slides = $scope.makeSlides($scope.contentObject[0]);
				},function(error_contentObject) {
					console.log("couldnt make a contentObject from the DB",error_contentObject);
				}
					);
				
				
				console.log('article list is a typeof array',($scope.articles instanceof Array), $scope.articles[3] )
			} else {
				console.log('unfortunately there are no articles in the db lets get some from the api');
				getArticleList().then(function(new_article_blob) {
					console.log('fortunately now we do have some articles',new_article_blob);
					Articleservice.init(new_article_blob.contents.data.articles);
					$scope.articles=Articleservice.getArticles();
					console.log('after we strip duplicates there are only ',$scope.articles);
					localDB.addArticlesToDB(Articleservice.getArticles());
					User.getContentObject().then(function(returned_contentObject) {
						console.log("creating a new contentObject I hope",returned_contentObject);

						$scope.contentObject = returned_contentObject;
						$scope.slides = $scope.makeSlides(returned_contentObject[0]);
					},function(returned_content_error) {
						console.log("no new content Object",returned_content_error);
					});



				}, function(new_article_error) {
					console.log('getting the new articles we receieved the following error',new_article_error)
				});

			}
		});
		/*

		localDB.loadSourcesFromDB().then( function(db_sources) {
			console.log('got the following sources from the db',db_sources);
			$scope.sources=db_sources;


		});

		localDB.loadSectionsFromDB().then( function(db_sections) {
			console.log('got the following sections from the db',db_sections);
			$scope.sections=db_sections;


		}); 

		localDB.loadSubSectionsFromDB().then( function(db_subsections) {
			console.log('got the following subsections from the db',db_subsections);
			$scope.subsections=db_subsections;


		}); 
*/
/*
		//this is probably how we should get the 3s info here but whatever.
		localDB.load3s().then( function(array[section_array , subsection_array, source_array ]) {

				$scope.sections=section_array;
				$scope.sources=source_array;

			}
		);

*/
/*
//sorting test
    $scope.sort_items = [
       {date: '2019-01-19 00:16:00',house:'red'},
       {date: '2017-03-19 00:16:00', house:'blue'},
       
       {date: '2012-03-11 00:00:00', house:'orange'},
      {date: '2012-03-19 00:16:00', house:'green'},
        {date: '2014-03-19 00:00:00', house:'tan'}
    ];
*/
				

	}
		
		

	





  }]);
