'use strict';

angular.module('niiuWebappApp')
  .controller('ArticleCtrl', function ($scope, $window, $routeParams, $location, Articleservice, User, constants) {
    $window.scrollTo(0,0);
    $scope.media_path=constants.ARTICLE_MEDIA_PATH;
    $scope.pageClass = "articlePage";
    $scope.slide_interval = 90000;



    $scope.youShare = function(id) {
      //,'{{article.title}}','{{article.subtitle|truncate : 100}}', '{{slides[0].imgUrl}}')
      console.log('you shared'+id);

    };


  	Articleservice.getArticle($routeParams.articleId).then(function(article) {
          //get article
          $scope.article=article;
          $scope.published_dateObj = Date.parse(article.published_date);


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



  	$scope.backSwipe = function() {
  
    	console.log('user swiped back to current section');
  
    	
    	$location.path("/sectionView/"+User.getCurrentSection());
      //anytime you leave an article paage it should look like a backswipe. So we can init it here
      angular.element('.page').addClass('backswipe');


    };



  });
