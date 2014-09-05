'use strict';

angular.module('niiuWebappApp')
  .controller('UserhomeCtrl', ['$scope', '$window', 'niiuSyncer', 'niiuAuthenticator', 'localDB', '$q','$location','Articleservice', '$routeParams', 'constants','User', function ($scope, $window, niiuSyncer, niiuAuthenticator, localDB, $q, $location, Articleservice, $routeParams, constants, User) {

  	

  	$window.scrollTo(0,0);
  	$scope.media_path=constants.ARTICLE_MEDIA_PATH;
  	$scope.nav_top=angular.element('#topnav').css('top');
  	$scope.logo_path=constants.SOURCE_LOGO_PATH;
  	$scope.currentSection = 0;

        




  	$scope.pageClass="titlePage";


    $scope.slide_interval="5000";
    User.setCurrentSection(0);
    $scope.stopClick=false;


  	$scope.makeSlides = function(titlePageContentObject) {
  		//takes page articles and returns them as an array of slides
  		var articleSlides=[];
  		for (var i=0;i<titlePageContentObject.articles.length;i++) {
  			if (titlePageContentObject.articles[i].media.length) {
  				articleSlides[articleSlides.length]={ 
  						imgTitle: titlePageContentObject.articles[i].title,
  						imgSection: $scope.contentObject[titlePageContentObject.articles[i].sectionIndex].subject,
  						imgUrl: titlePageContentObject.articles[i].media[0].path,
  						imgLink:"#/article/"+titlePageContentObject.articles[i].id
  						}
  			}
  		}
  		console.log('articleSlides looks like',articleSlides);

  		return articleSlides;

  	}

  	$scope.goSection = function(sectionId) {

      User.setCurrentSection(sectionId);
      $scope.stopClick=true;
      $location.path("/sectionView/"+sectionId); //this could happen in the set function too.
    };

  	$scope.getCarouselScope = function() {

  		console.log('heres this scope, ',$scope); 
  	}

  	$scope.toggleMenu = function(onOff) {
  		User.toggleMenu(onOff);
  	}

  	$scope.sendThat = function(msg) {
  		console.log(msg);

  	}
  	$scope.goArticle = function(id,click) {
  		console.log('we saw a click event',click);

  		if($scope.stopClick) {
  			console.log('we stopped the click!',click);
  			return;
  		}
  		console.log('maybe you swiped but that click was not stopped');
  		$location.path('/article/'+id);
  	}


  	$scope.nextSectionSwipe = function(click) {
  		$scope.stopClick=true;
  		
  		console.log('user swiped, stop click!',click);
    	console.log('user swiped to ', User.getNextSectionUrl($location.path()));
  
    	
    	$location.path("/sectionView/"+User.getNextSection());
    	
    	



    };

    $scope.previousSectionSwipe = function(click) {
  		$scope.stopClick=true;

  		var previousSection=User.getPreviousSection();
    	console.log('user swiped back to section',previousSection );
  

   		angular.element('.page').addClass('backswipe');
    	$location.path("/sectionView/"+previousSection);
    	


    };


/*
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
  */


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



    function getNewArticleList(all_articles) {
    	//only use a new updateTime if you want to update the users sections
    	var contentUpdateTime = localDB.getOldProfileUpdate();

    	if(typeof(all_articles)!='undefined') {
    			console.log('sync we actually want to get all articles and not just the newest',all_articles);
    			

    	} else {
    			console.log('sync - we only want to get new articles',all_articles);
    			
    	}
    	console.log('getNewArticleList: running sync function');

    	var deferred = $q.defer();

	  	
	  	localDB.getLastSync().then(
	  		function(sync_time) {
	  			    console.log('ive got the sync time in getNewArticleList' ,sync_time);

	  			    contentUpdateTime.then(function(update_time) {

			  			    console.log('now ive also got a content update time. So its time to send an article sync.', update_time);

			  			    niiuSyncer.syncArticles($scope.user, sync_time, update_time).then(function(articleBlob) {

			  			    	console.log('Good Luck, api sync response looked like this',articleBlob);

			  			    	localDB.setLastContentSync(articleBlob.contents.data.lastContentSync);
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









    function getArticleList() {
    	console.log('not syncing but running getArticleList function');

    	var deferred = $q.defer();
    	var articleList=Articleservice.getArticles();
    	console.log('getArticleList: We just got the articleList from the articleService',articleList);
    	if(articleList.length>0) { //if we already have our articles just return them and get outta here.
    		console.log('getArticleList: okay there is already a list of articles around here so lets use that.');
    		$scope.articles=articleList;
    		deferred.resolve(articleList);
    	} else { //otherwise lets load the articles out of the db

	  	
	  	//localDB.getLastSync().then(
	  	//	function(sync_time) {
	  	//		    console.log('ive got the sync time in userHome' ,sync_time);

	  			   // localDB.getOldProfileUpdate().then(function(update_time) {



			  			    //console.log('now ive also got an old update time. So its time to send an article sync.', update_time);

			  			    //niiuSyncer.syncArticles($scope.user, sync_time, update_time).then(function(articleBlob) {
			  			    localDB.loadArticlesFromDB().then(function(article_array){
			  			    	console.log('not syncing but I Got some articles from the DB,',article_array);

			  			    	//localDB.setLastContentSync(articleBlob.contents.data.lastContentSync);
			  			    	//make sure the articles are set in the articleService
			  			    	Articleservice.init(article_array);
			  			    	var cleaned_articles=Articleservice.getArticles();
								$scope.articles=cleaned_articles;
			  			    	deferred.resolve(cleaned_articles);
			  			    	


			  			    }, function(server_error) {
			  			    		console.log('Bad Luck, the getting articles from the db didnt work.',server_error);
			  			    		deferred.reject(server_error);
			  			    		//probably we would want to do a refresh here, but we can put it somewhere higher up and fail for now.
			  			    }



			  			    	);
			  			    

			  		//	}
				//);
			}

	  		

	  	return deferred.promise;
    } //end $scope.articleList


console.log('are we online?',navigator.onLine);


function refreshArticles() {
	var deferred=$q.defer();
	//replace the scope articles if we have new ones
	getNewArticleList().then( function(theList){
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
			console.log('running refresh3s');
			niiuSyncer.sync3s().then(function(data_3s) {
			console.log('just ran sync3s which got new 3s data and saved it');	
			console.log('here is some 3s data in refresh3s',data_3s);
				console.log('refresh3s here are the sections ' ,data_3s.data.contents.data.newSections);
				//add sections to DB
					//localDB.put3s(data_3s.data).then( function(success_3s) {
						console.log('successfully saved 3s',data_3s)
						/*localDB.addSectionsToDB(data_3s.data.contents.data.newSections);
						localDB.addSourcesToDB(data_3s.data.contents.data.newSources);
						localDB.addSourceSectionsToDB(data_3s.data.contents.data.newSourceSection);
						localDB.addSectionSubsectionsToDB(data_3s.data.contents.data.newSectionSubsection);
						localDB.addSubSectionsToDB(data_3s.data.contents.data.newSubsections);
						localDB.addSourceSubsectionsToDB(data_3s.data.contents.data.newSourceSubsection);
						*/
						//localDB.setLastSync(); //this happens already as part of sync3s
						//add sections to Scope
						$scope.sections=data_3s.data.contents.data.newSections;
						$scope.sources=data_3s.data.contents.data.newSources;
						console.log('section 7 is called', $scope.sections[7].name);
						deferred.resolve(data_3s.data);
					

				

				//at this point we have all the 3s info and it should be saved so lets run



			}, 
			function(no_data_3s) {
				console.log('for some reason we couldnt get any 3s data',no_data_3s);
				deferred.reject(no_data_3s);
			}
			);
			return deferred.promise;

			
	}

	function syncCheck() {
		localDB.getSyncAge().then(function(content_sync_age) {
		console.log('the current sync is this old, ',content_sync_age);
			if(  content_sync_age>constants.SYNC_INTERVAL) { //never do this for now
				console.log('sync for new articles');
				/*
				refresh3s().then(
						function() {
							refreshArticles();
						}
					);
				*/
				doRefresh();
				return true;
			} else {
				
				console.log('not time to sync for articles, lets get stuff from the db',content_sync_age);
				getLocalStuff();
				return false;
			}
		});
	}

	function doRefresh() {
		//currently we are refreshing everytime the page loads, but probably we should do this only 
		//when last sync is a bit old maybe 10mins
		//when people first login
		//when people trigger a refresh (like dragging down in the ios app)
		console.log('starting refresh sync mode in doRefresh');
		refresh3s().then(function(new3s) { 
				console.log('refresh3s had a successful sync, now we have to refresharticles ',new3s);
			refreshArticles().then(function(new_article_blob) {

				console.log('refreshArticles sync this is the list of new articles',new_article_blob);

			//Put the articles into the service so we can get at them later
			//Articleservice.init(new_article_blob);
			//var cleaned_articles = Articleservice.getArticles();
			var newContentObject = User.setContentObject(new3s,new_article_blob);
			$scope.contentObject = newContentObject;
			//localDB.addArticlesToDB(cleaned_articles);
			console.log('the refreshed contentObj is',$scope.contentObject);
			$scope.slides = $scope.makeSlides(newContentObject[0]);
			console.log('the slides are',$scope.slides);
			$scope.articles = new_article_blob;
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
			
			},function(no_refresh_articles) {
				console.log('refreshArticles did not sync because', no_refresh_articles.contents.status);
				if (no_refresh_articles.contents.status==402) {
					console.log('doRefresh: making freemium subscription for userId '+$scope.user.id+' using apikey '+$scope.user.apiKey);
					niiuAuthenticator.makeFreemium($scope.user.id,$scope.user.apiKey).then(function(new_subscription){
							console.log('DoRefresh: now your subscription has been updated go get your articles again');
							doRefresh();
						},
						function(no_subscription) {
							console.log('Sorry we couldnt make you a new subscription');
							$scope.error=no_subscription;

						}

					);

				}

			}
			);
		},function(no_refresh3s) {
			console.log('refresh3s failed to sync because',no_refresh3s);
			$scope.error=no_refresh3s;

		}//end refresh3s

		);
		
	} 



	function init() {

		//load3s();
		console.log('lets get some articles!');
		User.getContentObject().then(function(returned_contentObject) {
			console.log("retrieved contentObject.",returned_contentObject);
			$scope.contentObject = returned_contentObject;
			$scope.slides = $scope.makeSlides(returned_contentObject[0]);
		},function(returned_content_error) {
			console.log("we didnt get the contentObject from the db right?",returned_content_error);
			doRefresh();

		}

		);

		if($routeParams.refresh=='refresh') {
			doRefresh();
		} else {
			syncCheck();
		}
		
	}
		
	function getLocalStuff() {
		//seems like you only need to do this if you don't get a contentObject...
		//put the article array into the service
		getArticleList().then( function(db_articles) {
			console.log('getLocalStuff: got the following articles from the db',db_articles);
			if (db_articles.length>0) {


					localDB.get3sFromDB().then(function(last3s) {
							console.log('getLocalStuff: we have everything to set the contentObject in the getArticleList function');
							var newContentObject = User.setContentObject(last3s,db_articles);
							$scope.contentObject = newContentObject;
							$scope.slides = $scope.makeSlides(newContentObject[0]);
							console.log('the slides from the DB ContentObject are',$scope.slides);
							$scope.articles = db_articles;
							//$scope.user = User.getUser();
							console.log('The new contentObject is like',$scope.contentObject);


					},function(no_3s) {
						console.log('interesting we didnt get a 3s from the DB this time', no_3s);
					}
					);

				/*  //this stuff is happening in getArticles()
				Articleservice.init(db_articles);
				$scope.articles=Articleservice.getArticles();
				console.log('setting contentObject with articles from DB');
				User.setContentObject($scope.db3s,db_articles).then(function(returned_contentObject) {
					
					$scope.contentObject = returned_contentObject;
					console.log('our $scope.contentObject is',$scope.contentObject);
					//$scope.slides = $scope.makeSlides($scope.contentObject[0]);
				},function(error_contentObject) {
					console.log("couldnt make a contentObject from the DB",error_contentObject);
				}
					);
				console.log('article list is a typeof array',($scope.articles instanceof Array), $scope.articles[3] )
				*/
			} else {
				console.log('unfortunately there are no articles in the db lets getNewArticleList from the api');
				getNewArticleList('all').then(function(new_article_blob) {
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
					console.log('getting the new articles we receieved the following error',new_article_error);
					console.log('maybe we should doRefresh()...');
				});

			}




		});

/*
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
	 */
				

	}
		
		

	init();





  }]);
