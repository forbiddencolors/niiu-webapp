'use strict';

angular.module('niiuWebappApp')
  .controller('CarouselCtrl', function ($scope) {

  	$scope.slide_interval="3000";



  	$scope.makeSlides = function(titlePageContentObject) {
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



  });
