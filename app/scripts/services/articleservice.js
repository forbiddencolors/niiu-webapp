'use strict';

angular.module('niiuWebappApp')
  .service('Articleservice', function Articleservice() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var articles = [];

    function eliminateDuplicateArticles(origArr) {
    	//removes duplicates from an article array
    	console.log('started with ',origArr);
 
		    var newArr = [],
		        origLen = origArr.length,
		        found,
		        x, y;
			        
			    for ( x = 0; x < origLen; x++ ) {
			        found = undefined;
			        for ( y = 0; y < newArr.length; y++ ) {
			        	//remove the id property for it to work on other arrays
			            if ( origArr[x].id === newArr[y].id ) { 
			              found = true;
			              break;
			            }
			        }
			        if ( !found) newArr.push( origArr[x] );    
			    }

			    console.log('finished with ',newArr);
			   return newArr;
	}


    return {

		init: function(article_array) {
			//we dont want duplicate articles in the service so
			articles=eliminateDuplicateArticles(article_array);

		},

		getArticles: function() {
		 //returns all articles
		 return articles;

		},
		 getArticle: function(article_id) {

		 	//return function(collection, propertyName, propertyValue) {
	      	var i=0, len=articles.length;
	      	for (; i<len; i++) {
	      		if (articles[i].id == article_id) {
	      			console.log('heres a matching article',articles[i]);
	      			return articles[i];
	  			}


	    	}

		 },
		 getArticlesBySection: function(section_id) {





		 }


    }
  });
