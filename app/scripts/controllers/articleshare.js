'use strict';

angular.module('niiuWebappApp')
  .controller('ArticleshareCtrl', function ($scope, $window, $routeParams, $location, Articleservice, User, constants, niiuSyncer) {


    $window.scrollTo(0,0);
    $scope.media_path=constants.ARTICLE_MEDIA_PATH;
    $scope.pageClass = "articlePage";
    $scope.slide_interval = -10;


  	niiuSyncer.getSharedArticle($routeParams.articleId).then(function(articleObj) {
          console.log('hey we got an article!', articleObj);

          //get article
          $scope.article=articleObj.contents.data.articles[0];
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
                        imgUrl:$scope.media_path+$scope.article.media[i].path,
                        imgText:$scope.article.media[i].caption
                      } );


                      

                    //}

                   }
                   console.log('just made some slides',$scope.slides);
                  
               }

        }
      );





  });




