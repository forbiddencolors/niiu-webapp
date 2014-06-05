'use strict';

angular.module('niiuWebappApp')
  .filter('sectionFilter', function () {

        return function (article_array, sectionId, sourceId, customId) {
        	console.log('filtering articles', sectionId, sourceId, customId);
        	var filtered_array=[];
        	for (var i=0; i<article_array.length; i++) {
        		if (sectionId  && sourceId ) {
        			console.log('we are trying a source section filter on article'+i,article_array[i]);
            	    if(article_array[i].sections.section_id == sectionId && article_array[i].source_id == sourceId) {
            	    	console.log('I matched section and source',sectionId, sourceId);
            	    	filtered_array.push(article_array[i]);
            	    }	
				}
				if (customId) {
            		if(article_array[i].sections.custom_section == customId) {
            			console.log('i matched custom ',customId);
                		filtered_array.push(article_array[i]);
                	}
        		}

        	}
        	if (!sectionId && !sourceId && !customId) filtered_array = article_array;
        	return filtered_array;
        };    
  });
