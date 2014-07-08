'use strict';

angular.module('niiuWebappApp')
  .controller('ArticleCtrl', function ($scope, $routeParams, $location, Articleservice, User, constants) {
 

  	$scope.article=Articleservice.getArticle($routeParams.articleId);
  	$scope.media_path=constants.ARTICLE_MEDIA_PATH;
  	$scope.pageClass = "articlePage";
  	$scope.slide_interval = 5000;


  	$scope.backSwipe = function() {
  
    	console.log('user swiped back to current section');
  
    	
    	$location.path("/sectionView/"+User.getCurrentSection());


    };

    $scope.slides = [];
    if ($scope.article.media.length>0) {
    	console.log('make some slides',$scope.article.media);
	    for(var i=0;i<$scope.article.media.length;i++) {
	    	if ($scope.article.media[i]) {
	    		//console.log('just made some slides',$scope.slides);
	    		$scope.slides.push( {
	    			imgUrl:$scope.media_path+$scope.article.media[i].path,
	    			imgText:$scope.article.media[i].caption
	    		} );

	    		

	    	}

	     }
	     console.log('just made some slides',$scope.slides);
    	
	 }

  });
