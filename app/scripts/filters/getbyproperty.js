'use strict';

angular.module('niiuWebappApp')
  .filter('getByProperty', function () {
    return function(collection, propertyName, propertyValue) {
        console.log('type colllection',typeof collection);
        if (typeof collection!=='undefined') {
              var i=0, len=collection.length, newCollection=[];
            	for (; i<len; i++) {
            		if (collection[i][propertyName] == propertyValue) {
            			console.log('heres a matching collection',collection[i]);
            			return collection[i];
        				
        			}
        }


    	}
    	/*
		    	if (newCollection.length>0) {
			    	return newCollection;
			    } else {
			    	return newCollection[0];
			    }
  		*/
  	};
   });

