'use strict';

angular.module('niiuWebappApp')
  .controller('ShareCtrl', function ($scope, $filter, constants, User, Facebook) {

var shareUser=User.getUser();
var generateUrl = function(id, type) {
        if (!id || !shareUser.id) {
                $scope.error='unkown article or user';
        }
        var base62_id=$filter('encodeBase62')(id);
        var base62_user=$filter('encodeBase62')(shareUser.id)
        var shareUrl = (constants.ENVIRONMENT == 'dev' ? 'niiu.de/' : 'forbiddencolors.com?niiuwww.cloudapp.net/') + type + '/' +   $filter('encodeBase62')(id) + '/' + $filter('encodeBase62')(shareUser.id);
        console.log('we generated the url '+shareUrl+' id or '+id+' encodes to '+base62_id+'& User id '+shareUser.id+' encodes to '+ base62_user);
        return shareUrl;
};

$scope.fbShare =  function(articleId,shareTitle,shareDescription,shareImage) {
	console.log('incoming share '+articleId+', '+shareTitle+', '+shareDescription+', '+shareImage);
	var shareUrl=generateUrl(articleId,'fb');
	Facebook.fbShare(shareUrl, shareTitle, shareDescription, shareImage);
}







  });
