'use strict';

angular.module('niiuWebappApp')
  .filter('sectionFilter', function () {

        return function (article, sectionId, sourceId, customId) {
            if (sectionId !== undefined && sourceId !== undefined) {
            	    if(article.sections.section_id == sectionId && article.sections.source_id == sourceId)
            	    	return article;
			}
            if (customId !== undefined) {
            		if(article.sections.custom_section == customId)
                		return article;
            }
        };    
  });
