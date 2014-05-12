'use strict';

angular.module('niiuWebappApp')
  .factory('niiuAuthenticator', function ($rootScope) {
    // Service logic
    // ...

    

    // Public API here
    return {
    changeUser: function(user) {
        //angular.extend(currentUser, user);
        $rootScope.user=user;
        $scope.apply();
        return user;
    }






    };
  });
