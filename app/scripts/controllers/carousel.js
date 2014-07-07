'use strict';

angular.module('niiuWebappApp')
  .controller('CarouselCtrl', function ($scope) {

  	$scope.slide_interval="5000";


    $scope.send = function(msg) {
      console.log(msg);
    }

  $scope.showNext = function(){
      var index = ($('#myCarousel .active').index()+1)%(slides.length);
      var modIndex = (((index)%(slides.length))+(slides.length))%(slides.length);
      $scope.slides[modIndex].active=true;
  }
  $scope.showPrev = function(){
      var index = ($('#myCarousel .active').index()-1)%(slides.length);
      var modIndex = (((index)%(slides.length))+(slides.length))%(slides.length);
      $scope.slides[modIndex].active=true;
  }



  });
