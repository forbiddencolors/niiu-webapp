'use strict';

angular.module('niiuWebappApp')
  .service('Articleservice', function Articleservice() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var articles = [];


    return {

		init: function(article_array) {
			articles=article_array;

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
