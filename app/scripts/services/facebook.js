'use strict';

angular.module('niiuWebappApp')
  .service('Facebook', ['$q', '$location', '$rootScope', '$http', 'constants', 'localDB', 'niiuAuthenticator', 'User', function($q, $location, $rootScope, $http, constants, localDB, niiuAuthenticator, User) {
  
  // resolving or rejecting a promise from a third-party
  // API such as Facebook must be
  // performed within $apply so that watchers get
  // notified of the change
  var resolve = function(errval, retval, deferred) {
    $rootScope.$apply(function() {
      if (errval) {
        deferred.reject(errval);
      } else {
        retval.connected = true;
        console.log('heres the resolved response');
        console.log(retval);
        deferred.resolve(retval);
      }
    });
  }

  function facebookShare(url, title, descr, image, winWidth, winHeight) {
        var winTop = (screen.height / 2) - (winHeight / 2);
        var winLeft = (screen.width / 2) - (winWidth / 2);
        var addPicture= (image!==undefined) ? '&picture=' + escape(image)  : "";
        var facebookUrl='https://www.facebook.com/dialog/feed?app_id='+constants.FACEBOOK_APP_ID+
        '&redirect_uri=' + escape("http://niiuapp.com/#/shareThanks") + 
        '&link=' + escape(url) + 
        '&caption=' + encodeURI(title) +
        '&description=' + encodeURI(descr) +
        addPicture ;
        window.open(facebookUrl,'sharer','top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);


    }



    
  return {
    getUser: function(FB) {
      var deferred = $q.defer();
      FB.getLoginStatus(function(response) {
        console.log(response.status);
        if (response.status == 'connected') {
          FB.api('/me', function(response) {
            resolve(null, response, deferred);
            console.log("youre logged in and the response is: ");
            console.log(response);
          });
        } else if (response.status == 'not_authorized' || 'unknown') {
              console.log("youre not logged in and the response is: ", response);
              console.log(response);
          FB.login(function(response) {
            if (response.authResponse) {
              var access_token =   FB.getAuthResponse()['accessToken'];
              console.log('the access token should be in the following response');
              console.log(FB.getAuthResponse());
              auth = FB.getAuthResponse();


              FB.api('/me', function(response) {
                resolve(null, response, deferred);
              });
            } else {
              console.log("it seems like you opted not to authorize");
              console.log(response);
              resolve(response.error, null, deferred);
            }
          }, {scope: ['basic_info','email','user_birthday']});
          
        } 
      });
      var promise = deferred.promise;
      promise.connected = false;
      return promise;
    }
    ,
    dropUser: function(FB) {
      //empty so far
      console.log("the facebook object we want to logout is ");
      console.log(FB);
      FB.logout(function (response) {
        // this.getUser(FB);

        console.log(response);
      });
    } ,
    getAuth: function(FB) {
      $scope.auth = FB.getAuthResponse();

    }
    ,

    fbShare: function(shareUrl, shareTitle, shareDescription, shareImage) {
      if (!shareUrl) {
        console.log('sorry you didnt pass a url to share');
        return;
      }
      
      facebookShare(shareUrl, shareTitle, shareDescription, shareImage, 520, 350);

    },
    niiuAuth: function(scopeUser,scopeAuth) {
    console.log('weve got some userscope');
    console.log(scopeUser.birthday);
    var fbBirthDate = new Date(scopeUser.birthday);
    var niiuBirthDate = fbBirthDate.getFullYear()+"-"+(fbBirthDate.getMonth()+1)+"-"+fbBirthDate.getDate();
    console.log('niiu birthdate is '+niiuBirthDate);
    var deferred = $q.defer();

      var niiuAuthData = {



        "birthDate": niiuBirthDate,
        "eMail": scopeUser.email,
        "fbAccessToken": scopeAuth.accessToken,
        "fbID": scopeUser.id,
        "firstName": scopeUser.first_name,
        "lastName": scopeUser.last_name,
        "gender": scopeUser.gender,
        
        "password": null




      }

      var niiuAuthObj = {
        action : "login",
        api : "user",
        appGuid : constants.NIIU_APP_GUID,
        data : niiuAuthData
        
      }


      $http.post( constants.NIIU_API_URL + 'users/social_login' , "data="+angular.toJson(niiuAuthObj), 
                  {headers: { 'Content-Type': 'application/x-www-form-urlencoded'}} 
      ).
        success(function (data, status, headers, config) {
          // Hey the server accepted my post
          console.log('this is the authentication response from the niiu api', data.contents.data);

          //$rootScope.user=data.contents.data;
          User.setUser(data.contents.data);

          console.log('lets save this for later');


          //var user_table = localDB.init();
          var niiu_user_obj=data.contents.data;

          //user_table.put(constants.USER_TABLE_NAME, {user: constants.USER_LOCATOR, userInfo: niiu_user_obj})
          

          	localDB.storeUser(niiu_user_obj).then(function(data) {
          		console.log('i think we saved this user', data);

          		//return(data);
          		
          	});
          	niiuAuthenticator.changeUser(niiu_user_obj);
            //return data.contents.data;

            deferred.resolve(data);
            



      }).
        error(function (data, status, headers, config) {
          // ...
          deferred.reject(data);
      });




      return deferred.promise;

    }




  }; 




}]);
