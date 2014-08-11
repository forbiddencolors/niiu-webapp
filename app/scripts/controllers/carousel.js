'use strict';

angular.module('niiuWebappApp')
  .controller('CarouselCtrl', function ($scope) {

  



    $scope.send = function(msg) {
      console.log(msg);
    }

  $scope.showNext = function(){
      var index = ($('#niiuCarousel .active').index()+1)%($scope.slides.length);
      var modIndex = (((index)%($scope.slides.length))+($scope.slides.length))%($scope.slides.length);
      $scope.slides[modIndex].active=true;
  }
  $scope.showPrev = function(){
      var index = ($('#niiuCarousel .active').index()-1)%($scope.slides.length);
      var modIndex = (((index)%($scope.slides.length))+($scope.slides.length))%($scope.slides.length);
      $scope.slides[modIndex].active=true;
  }




  });
