'use strict';
 
angular.module('niiuWebappApp')
.controller('usermenuCtrl', function ($scope, $q, $location, $translate, niiuAuthenticator, User) {
    console.log($location);
    var contentObject = [];
    var contentArticles = [];
    $scope.browser=navigator.userAgent;
    $scope.user=User.getUser();
    

    $scope.getContentObject = function() {
        var deferred = $q.defer();
         User.getContentObject().then(function(gotContentObject) {
            $scope.contentObject=gotContentObject;
            console.log('getContentObject: the menu got a contentObject',contentObject);
            $scope.contentArticles= User.getContentArticles();
            console.log('getContentObject: the menu has an article list called contentArticles',contentArticles);
            /*
            User.getContentArticles().then(function(newArticles) {
                console.log('got some new articles for here',newArticles);

            }
            )
         */  
            deferred.resolve(gotContentObject);

        },function(error_contentObject) {
            $scope.error=error_contentObject;
            console.log('the couldnt get a contentObject',error_contentObject);
            deferred.reject(error_contentObject);

        });
         return deferred.promise;

    }



    $scope.toggleMenu = function() {
        User.toggleMenu(); 
     
    }

    $scope.nextSection = function() {
        console.log('this pre next page is', $location.path());
    	console.log('next pageurl is ', User.getNextSectionUrl($location.path()));
  
    	
    	$location.path(User.getNextSectionUrl($location.path()));


    };

    $scope.nextPage = function() {
       // console.log('next contentPage is '+ User.getNextSection());
        
        $location.path("/sectionView/" + User.getNextSection());


    };
        $scope.currentPage = function() {
        console.log('current contentPage is '+ User.getCurrentSection());
        
        $location.path("/sectionView/" + User.getCurrentSection());


    };

    $scope.goToArticle = function(articleId) {
        console.log('going to article', articleId);
      //  if(articleId!==undefined) {
            User.toggleMenu();
            $location.path("/article/" +articleId);
       // }

    };

    $scope.goSection =  function(sectionId) {
        User.toggleMenu();
        User.setCurrentSection(sectionId);

    };

    $scope.captureSelection = function(item, model, label) {
        console.log('the searcher selected this item',item);
        console.log('the searcher selected this model',model);
        console.log('the searcher selected this label',label);

        $scope.goToArticle(item.id);

    }


    $scope.keyPress = function(keyCode){
       console.log("someone pressed",keyCode);
       if (keyCode==39) {

        console.log('time to go to the next section');
        $location.path(User.getNextSectionUrl($location.path()));

       }
    };


    $scope.init = function() {
        console.log('at least init ran');
                 
            $scope.getContentObject().then(
                //set the contentObject and populate the articles from it
                function(contentObject) {
               // console.log('init is still running!',contentArticles);
                    //$scope.contentArticles=contentArticles;
                    console.log('init: now we have contentArticles',$scope.contentArticles);

                }
            );
   



        

         
        

    }
    $scope.init();


 
  });