'use strict';

angular.module('niiuWebappApp')
  .controller('ArticleCtrl', function ($scope, $routeParams, Articleservice, constants) {
 

  	$scope.article=Articleservice.getArticle($routeParams.articleId);
  	$scope.media_path=constants.ARTICLE_MEDIA_PATH;
  	$scope.pageClass = "articlePage";
  });
