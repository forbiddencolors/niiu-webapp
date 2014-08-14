'use strict';

angular.module('niiuWebappApp')
  .controller('ArticleCtrl', function ($scope, $window, $routeParams, $location, Articleservice, User, constants, $q) {
    $window.scrollTo(0,0);
    $scope.media_path=constants.ARTICLE_MEDIA_PATH;
    $scope.pageClass = "articlePage";
    $scope.slide_interval = -9000;



    $scope.youShare = function(id) {
      //,'{{article.title}}','{{article.subtitle|truncate : 100}}', '{{slides[0].imgUrl}}')
      console.log('you shared'+id);

    };

    function getArticleSourceName(source_id) {
      var deferred=$q.defer();
        Articleservice.getSourceName(source_id).then(function(source_name) {
          console.log('getArticleSourceName: just got a name for this article source ',source_name);
          deferred.resolve( source_name);

          },function(not_source_name) {
            console.log('getArticleSourceName: failed to get the source name for this article',not_source_name);
            deferred.reject( not_source_name);
          });
        return deferred.promise;
    }



    function getArticleSubject(section,subsection,custom_id) {
      var deferred=$q.defer();
      console.log('getArticleSubject: looking for the title between section/subsection/custom '+section+'/'+subsection+'/'+custom_id);
      if(custom_id) {
          deferred.resolve(custom_id);
          console.log('getArticleSubject: subject is ',custom_id);

      } 

      if (subsection) {
          Articleservice.getSubSectionName(subsection).then(function(subSectionName) {
              deferred.resolve(subSectionName);
              console.log('getArticleSubject: subject is ',subSectionName);
          });
      }

      if (section) {
          Articleservice.getSectionName(section).then(function(sectionName) {
              deferred.resolve(sectionName);
              console.log('getArticleSubject: subject is ',sectionName);
          });
      }

      return deferred.promise;


    }


  	Articleservice.getArticle($routeParams.articleId).then(function(article) {
          //get article
          $scope.article=article;
          $scope.published_dateObj = Date.parse(article.published_date);
          getArticleSourceName(article.source_id).then(function(sourceName) {
            $scope.article.sourceName = sourceName;
          }
            );
          getArticleSubject(article.sections.section_id,article.sections.subsection_id,article.sections.custom_section).then(
            function(article_subject) {
              $scope.article.subject = article_subject;
            });


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
