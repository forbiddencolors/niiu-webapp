var app = angular.module('plunker', ['ezfb', 'hljs'])

.config(function (ezfbProvider) {
  ezfbProvider.setInitParams({
    appId: '386469651480295'
  });  
})

.controller('MainCtrl', function($scope, $FB, $window, $location) {
  
  updateLoginStatus(updateApiMe);

  $scope.login = function () {
    $FB.login(function (res) {
      /**
       * no manual $scope.$apply, I got that handled
       */
      if (res.authResponse) {
        updateLoginStatus(updateApiMe);
      }
    }, {scope: 'email,user_likes'});
  };

  $scope.logout = function () {
    $FB.logout(function () {
      updateLoginStatus(updateApiMe);
    });
  };

  $scope.share = function () {
    $FB.ui(
      {
        method: 'feed',
        from: "1368750610",
        to: "7002535",
        message: 'hey'
      },
      null
    );
  };

  var autoToJSON = ['loginStatus', 'apiMe']; 
  angular.forEach(autoToJSON, function (varName) {
    $scope.$watch(varName, function (val) {
      $scope[varName + 'JSON'] = JSON.stringify(val, null, 2);
    }, true);
  });
  
  function updateLoginStatus (more) {
    $FB.getLoginStatus(function (res) {
      $scope.loginStatus = res;

      (more || angular.noop)();
    });
  }

  function updateApiMe () {
    $FB.api('/me', function (res) {
      $scope.apiMe = res;
    });
  }
});
