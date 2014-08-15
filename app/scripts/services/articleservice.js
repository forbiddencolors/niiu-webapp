'use strict';

angular.module('niiuWebappApp')
  .service('Articleservice', function Articleservice($q, $filter, localDB, constants) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var articles = [];
    var sourceList = [];
    var sectionList = [];
    var subSectionList = [];
    var initPromise = $q.defer();

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


	    function listSources() {
            console.log('listSources: returning a list of sources by id');
            var deferred=$q.defer();
            if (sourceList.length>0) {
                deferred.resolve(sourceList);
            } else {
                var promise3s=localDB.get3sFromDB();
                console.log('listSources: making a list of sources by id')
                promise3s.then(function(data3s){
                    if(data3s) {
                        var dataSources=data3s.contents.data.newSources;
                        console.log('listSources: the sources are ',dataSources);
                        //still have to add names    
                        deferred.resolve(dataSources);



                    } else {
                        console.log('listSources: didnt get any 3s data to work with',data3s);
                        deferred.reject(data3s);
                    }

                },function(data3s_error){
                     console.log('listSources: didnt get any 3s data to work with',data3s_error);
                     deferred.reject(data3s_error);
                });



            }
            return deferred.promise;

        }

        function listSections() {
            console.log('listSections: returning a list of sections by id');
            var deferred=$q.defer();
            if (sectionList.length>0) {
                deferred.resolve(sourceList);
            } 
              /*else {
                var promise3s=localDB.get3sFromDB();
                console.log('listSections: making a list of sources by id')
                promise3s.then(function(data3s){
                    if(data3s) {
                        var dataSources=data3s.contents.data.newSources;
                        console.log('listSources: the sources are ',dataSources);
                        //still have to add names    
                        deferred.resolve(dataSources);



                    } else {
                        console.log('listSections: didnt get any 3s data to work with',data3s);
                        deferred.reject(data3s);
                    }

                },function(data3s_error){
                     console.log('listSections: didnt get any 3s data to work with',data3s_error);
                     deferred.reject(data3s_error);
                });
*/



            
            return deferred.promise;

        }

         function listSubSections() {
            console.log('listSections: returning a list of sections by id');
            var deferred=$q.defer();
		            if (subSectionList.length>0) {
		                deferred.resolve(subSectionList);
		            } 



            
            return deferred.promise;

        }

        function initSourcesAndSections() {
        		var deferred=$q.defer();
				var promise3s=localDB.get3sFromDB();
                console.log('initSourcesAndSections: making a list of source and section objects')
                promise3s.then(function(data3s){
                    if(data3s) {
                        var dataSources=data3s.contents.data.newSources;
                        console.log('initSourcesAndSections: the sources are ',dataSources);
                        //still have to add names    
                        sourceList=dataSources;
                        


                        var dataSections=data3s.contents.data.newSections;
                        console.log('initSourcesAndSections: the sections are ',dataSections);
                        sectionList=dataSections;


                        var dataSubSections=data3s.contents.data.newSubsections;
                        console.log('initSourcesAndSections: the subsections are ',dataSubSections);
                        subSectionList=dataSubSections;

                        deferred.resolve(dataSources);



                    } else {
                        console.log('initSourcesAndSections: didnt get any 3s data to work with',data3s);
                        deferred.reject(data3s);
                    }

                },function(data3s_error){
                     console.log('initSourcesAndSections: didnt get any 3s data to work with',data3s_error);
                     deferred.reject(data3s_error);
                });
				return deferred.promise;
        }

        function getSourceNameById(id) {
        	var deferred=$q.defer();
            if(sectionList.length==0) { 
	            initPromise.then(function(initialized) {

	               var sourceObject= $filter('getByProperty')(sourceList, "id", id);
	               console.log('getSourceNameById: looking for the sourceObject', sourceObject);
	               deferred.resolve(sourceObject.name);
	            }
	            );
	            

        	} else {
        		var sourceObject= $filter('getByProperty')(sourceList, "id", id);
        		console.log('getSourceNameById: looking for the sourceObject', sourceObject);
	            deferred.resolve(sourceObject.name);
        	}
        	return deferred.promise;
        }

        function getSectionNameById(id) {
        	var deferred=$q.defer();
        	if(sectionList.length==0) { 
        		initPromise.then( function(initialized) {//kind of unneccesary because init calls this but we cant run this function till its finished
        			var sectionObject= $filter('getByProperty')(sectionList, "id", id);
        			deferred.resolve(sectionObject.name);
        			});
        	} else {
        		var sectionObject= $filter('getByProperty')(sectionList, "id", id);
        		deferred.resolve(sectionObject.name);
        	}
        	
        	console.log('getSectionNameById: looking for the sectionObject', sectionObject);
        	return deferred.promise;

        }

        function init(article_array) {


			//we dont want duplicate articles in the service so
			articles=eliminateDuplicateArticles(article_array);

        }

        function getSubSectionNameById(id) {
        	var deferred=$q.defer();
        	if(subSectionList.length==0) { 
        		initPromise.then( function(initialized) {//kind of unneccesary because init calls this but we cant run this function till its finished
        			var subSectionObject= $filter('getByProperty')(subSectionList, "subsection_id", id);
        			deferred.resolve(subSectionObject);
        			});
        	} else {
        		var subSectionObject= $filter('getByProperty')(subSectionList, "id", id);
        		deferred.resolve(subSectionObject.name);
        	}
        	
        	console.log('getSubSectionNameById: looking for the subSectionObject', subSectionObject);
        	return deferred.promise;

        }

        function pageInit() {
    		initSourcesAndSections().then(

    			function(page_initialized) {
    				
    				initPromise.resolve('initialized');
    				console.log('pageInit: initialized sources and sections',initPromise.promise);

    		});
    		return initPromise.promise;

    	}

    	pageInit();

    return {


		init: function(article_array) {

			//we dont want duplicate articles in the service so
			init(article_array);
			

		},

		getArticles: function() {
		 //returns all articles
		 return articles;

		},
		 getArticle: function(article_id) {
		 	var deferred= $q.defer();
		 	//return function(collection, propertyName, propertyValue) {
			 	if(articles.length>0) {

			      	var i=0, len=articles.length;
			      	for (; i<len; i++) {
			      		if (articles[i].id == article_id) {
			      			console.log('heres a matching article',articles[i]);
			      			deferred.resolve(articles[i]);
			  			}

			  		}
			  	}
	  			else {
	  				//create a promise and get this from the db
	  				
	  				localDB.loadArticlesFromDB().then(function(db_articles) {
	  					init(db_articles);
	  						//find the article we were looking for
			  				var i=0, len=articles.length;
					      	for (; i<len; i++) {
					      		if (articles[i].id == article_id) {
					      			console.log('heres a matching article',articles[i]);
					      			deferred.resolve(articles[i]);
					  			}

					  		}
	  					
	  					
	  				}


	  				);
	  			

	  			}

	  			return deferred.promise;
	    	},
		 getArticlesBySection: function(section_id) {





		 },
		 
        getSourceList: function() {

            return listSources();
        },
        getSourceName: function(id) {
            return getSourceNameById(id); 
        },
        getSectionName: function(id) {
        	return getSectionNameById(id);
        },
        getSubSectionName: function(id) {
        	return getSubSectionNameById(id);
        }


    }
  });
