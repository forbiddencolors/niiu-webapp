'use strict';

angular.module('niiuWebappApp')
  .controller('ShareCtrl', function ($scope, $filter, constants, User, Facebook, $sanitize) {

var shareUser=User.getUser();
var generateUrl = function(id, type) {
        if (!id || !shareUser.id) {
                $scope.error='unkown article or user';
        }
        var base62_id=$filter('encodeBase62')(id);
        var base62_user=$filter('encodeBase62')(shareUser.id)
        var shareUrl = (constants.ENVIRONMENT == 'dev' ? 'niiuapp.com/' : 'niiu.de/') + type + '/' +   $filter('encodeBase62')(id) + '/' + $filter('encodeBase62')(shareUser.id);
        console.log('we generated the url '+shareUrl+' id or '+id+' encodes to '+base62_id+'& User id '+shareUser.id+' encodes to '+ base62_user);
        return shareUrl;
};

$scope.fbShare =  function(articleId,shareTitle,shareDescription,shareImage) {
	//console.log('incoming share '+articleId+' || '+shareTitle+' || '+shareDescription+' || '+shareImage);
	var shareUrl="http://"+(constants.ENVIRONMENT == 'dev' ? 'niiuapp.com/' : 'niiu.de/') +"#/articleShare/"+articleId+"/"+shareUser.id;
    //var shareUrl=generateUrl(articleId,'fb');
	//Facebook.fbShare(shareUrl, shareTitle, $filter('truncate')(shareDescription,100), shareImage);
    if(!shareDescription) shareDescription="";
    shareDescription = $filter('truncate')(shareDescription,100);
    shareDescription = $filter('htmlToPlaintext')(shareDescription);
    console.log('incoming share '+shareUrl+' || '+shareTitle+' || '+shareDescription+' || '+shareImage);

    Facebook.fbShare(shareUrl, shareTitle, shareDescription, shareImage);
};

$scope.twitterShare = function(articleId,shareTitle,shareDescription) {
    var winWidth=520;
    var winHeight=350;
    var winTop = (screen.height / 2) - (winHeight / 2);
    var winLeft = (screen.width / 2) - (winWidth / 2);
    var shareUrl="http://"+(constants.ENVIRONMENT == 'dev' ? 'niiuapp.com/' : 'niiu.de/') +"#/articleShare/"+articleId+"/"+shareUser.id;
    if(!shareDescription) shareDescription="";

    shareDescription = $filter('htmlToPlaintext')(shareDescription);
    var shareText = $filter('truncate')(shareTitle+" - "+shareDescription,100);
    console.log('incoming share '+shareUrl+' || '+shareTitle+' || '+shareDescription);
    var twitterUrl="https://twitter.com/share?url="+escape(shareUrl)+"&text="+encodeURI(shareText)+"&via=niiu_";
    window.open(twitterUrl,'sharer','top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);


} 









  });
