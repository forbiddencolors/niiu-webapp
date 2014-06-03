'use strict';

angular.module('niiuWebappApp')
  .controller('ArticleCtrl', function ($scope, $routeParams, Articleservice) {
 

  	$scope.article=Articleservice.getArticle($routeParams.articleId);
  });
