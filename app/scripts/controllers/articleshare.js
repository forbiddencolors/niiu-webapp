'use strict';

angular.module('niiuWebappApp')
  .controller('ArticleshareCtrl', function ($scope, $window, $routeParams, $location, $http,  constants, niiuSyncer) {


    $window.scrollTo(0,0);
    $scope.media_path=constants.ARTICLE_MEDIA_PATH;
    $scope.pageClass = "articlePage";
    $scope.slide_interval = -10;


	$scope.setTitle = function(title) {
		console.log("setting the title to "+title);
	$window.document.title = "niiu - "+ title;

	}

 $scope.getDevSrc = function(index) {
  console.log('tried for backup',$index)
  return $scope.media_path+$scope.slides[index].imgUrl;
}

	$scope.getSharedArticle2 = function(article_id) {

            var deferred= $q.defer();

            var guestArticleObject = {
                  "action": "get_article",
                 "api": "content",
                 "apiKey": constants.GUEST_API_KEY,
                 "appGuid": constants.NIIU_APP_GUID,
                 "version": 222,
                 "data": {
                     "articleIDs": [
                         article_id
                     ],
                    "userID": constants.GUEST_ID
                  }
            };
                  console.log('heres the guestarticle request object',guestArticleObject);

                 $http.post(constants.NIIU_API_URL+"articles/get_article", "data="+angular.toJson(guestArticleObject), {
                        
                    }).success(function(guestResponse){
                        console.log('heres the guest article response from the niiu api', guestResponse);
                        
                        if (guestResponse.contents.status==200) {

                            console.log('The guest article response was good', guestResponse);

                          deferred.resolve(guestResponse);
                        
                        } else {
                                
                                console.log('The guest article response wasnt so good...', guestResponse);
                                
                                deferred.reject(guestResponse);
                        }

                    }).error(function(guestArticleError){
                        console.log('this was a guest article error',guestArticleError);
                        deferred.reject(guestArticleError);
                     });
                    //hang on we don't have an answer yet
                    return deferred.promise;

                
            },



  	niiuSyncer.getSharedArticle($routeParams.articleId).then(function(articleObj) {
          console.log('hey we got an article!', articleObj);

          //get article
          $scope.article=articleObj.contents.data.articles[0];
          $scope.setTitle($scope.article.title);
          $scope.published_dateObj = Date.parse($scope.article.published_date);


          console.log('try slides');

          //make slides
              $scope.slides = [];
                if ($scope.article.media.length>0) {
                  console.log('make some slides',$scope.article.media);
                  for(var i=0;i<$scope.article.media.length;i++) {
                    //if ($scope.article.media[i]) {
                      //console.log('making slides',$scope.slides);
                      $scope.slides.push( {
                        imgUrl:$scope.article.media[i].path,
                        imgText:$scope.article.media[i].caption
                      } );


                      

                    //}

                   }
                   console.log('just made some slides',$scope.slides);
                  
               }

        }
      );





  });




