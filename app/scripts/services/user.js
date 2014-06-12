'use strict';

angular.module('niiuWebappApp')
  .service('User', function User(localDB) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var user = {};
    function makeSectionUrls() {
            //Get list of section urls to rotate through
                var user_sections=user.contentProfile.items;
                var section_urls=[];
                
            for (var i=0; i<user_sections.length; i++) {
                var nextSection = user_sections[i].section || "";
                var nextSource = user_sections[i].source || "";
                var nextCustom = user_sections[i].custom_section || "";

                var section_url="/sectionHome/"+nextSource+"/"+nextSection+"/"+nextCustom;
                section_urls.push(section_url);
            }
            console.log('next section urls ', section_urls); 
            return section_urls;
        }

     /* ContentObject is array of up to 11 pageObjects */
    var contentObject = [];

    function makeContentObject(data3s,dataArticles) {
        
        console.log('did we pass anything for the contentObject?',dataArticles);
        if (data3s===undefined) data3s=localDB.get3sFromDB();
        if (dataArticles==undefined) dataArticles=localDB.loadArticlesFromDB().then(function(done) {
            console.log('now we have some contentObject articles from the DB',done);
            }
            );
        var user_sections=user.contentProfile.items;
        var section_urls=["/sectionHome/"];
        var userPage=[];
        console.log('this is the contentObject basis',user_sections);
        console.log('here we have the following to play with',user_sections);
        var pageArticles = [];
        for (var i=-1; i<user_sections.length; i++) {
                console.log('for some reason we cant define this contentObject section',(user_sections[i+1]))
                var thisSection = (user_sections[i]) ? user_sections[i].section : "";
                var thisSource = (user_sections[i]) ? user_sections[i].source : "";
                var thisCustom = (user_sections[i]) ? user_sections[i].custom_section : "";
                 pageArticles[i] = [];
                



                var section_url="/sectionHome/"+thisSource+"/"+thisSection+"/"+thisCustom;
                section_urls.push(section_url);

                var page_type = i===-1 ? "titlepage" : "3s";
                
                if (page_type==="titlepage") {
                    //add the first article
                    //pageArticles[i].push(dataArticles[0]);
                    //pageArticles[i].push(dataArticles[1]);
                    pageArticles[i]=dataArticles.slice( 0, 2)
                    

                    console.log('added two articles to the contentObject for the title page', pageArticles[i]);
                } else {
                

                //loop through all articles and select the ones that match this section
                for (var h=0; h<dataArticles.length; h++) {

                    //console.log('is this a custom contentObject page '+dataArticles[h].sections.custom_section+':', (dataArticles[h].sections.custom_section!=null));
                    if (dataArticles[h].sections.custom_section === user_sections[i].custom_section && dataArticles[h].sections.custom_section!= null ||
                        dataArticles[h].sections.section === user_sections[i].section &&
                        dataArticles[h].sections.subsection_id === user_sections[i].subsection &&
                        dataArticles[h].source === user_sections[i].source 
                        
                        ) {
                           

                                pageArticles[i].push(dataArticles[h]);
                            console.log('contentObject page'+i+' gets these articles, ',dataArticles[h]);
                             console.log('passed contentObject filter because data',dataArticles[h].sections.custom_section +" is equal to "+user_sections[i].custom_section, (dataArticles[h].sections.custom_section === user_sections[i].custom_section && dataArticles[h].sections.custom_section!= null) );
                             console.log('passed contentObject filter because section',dataArticles[h].sections.section_id +" is equal to "+user_sections[i].section, (dataArticles[h].sections.section === user_sections[i].section));
    

                    }
                }



                }
                 console.log('here are the contentObject pageArticles ',pageArticles[i]);
            

                var page_section = (user_sections[i]) ? user_sections[i].section : null;
                var page_source = (user_sections[i]) ? user_sections[i].source : null;
                var page_subsection = (user_sections[i]) ? user_sections[i].subsection : null;
                var page_custom_section = (user_sections[i]) ? user_sections[i].custom_section : null;


                    userPage[i]=  {
                                    type: page_type,
                                    url : section_url,
                                    section : {
                                        id : page_section,
                                        name : null,
                                        logo : null 
                                    },
                                    source : {
                                        id : page_source,
                                        name : null,
                                        logo : null
                                    },
                                    subsection : {
                                        id : page_subsection,
                                        name : null,
                                        logo : null
                                    },
                                    custom_section : {
                                        id : page_custom_section,
                                        name : null,
                                        logo : null
                                    },


                                    articles : pageArticles[i]

                                
                                } 
                
                console.log('pushing to contentObject', userPage[i]);
                contentObject.push(userPage[i]);
        } //end for loop
        return contentObject;
    }  //end makeContentObject

   





   // ];

    

    return {

    	setUser:function(newUser) {
    		// Maybe make this function return a promise

    		if (newUser == null){
    			console.log('You just passed an empty user, Im ignoring you');
    			return;

    			// Reject the promise here
    		}

    		//set the main user to the newUser we just got 
    		user=newUser;
           // makeContentObject();

    		// Save it to the database and return the promise from the DB service
    		return localDB.storeUser(newUser);

    	},
        getContentObject: function(data3s,dataArticles) {
                
                 makeContentObject(data3s, dataArticles);
                
                console.log('heres the contentObject we made',contentObject)

                return contentObject;

        },
    	getUser: function() {
			//Give access to the private user elsewhere
			/*var d = $q.defer();

				d.resolve(user);
				return d.promise;*/
			return user;
    	},
        getSectionUrls: function() {
            return makeSectionUrls();

        },
        getNextSectionUrl: function(location) {
            
            console.log('before next the current location is ',location);
            var section_list=makeSectionUrls();
            console.log('the list of urls is',section_list);
            //Get list the next section based on your current section home                
            for (var i=0; i<section_list.length; i++) {
                if (location==section_list[i] || location+"/"==section_list[i] ) { //angular drops the last / from urls
                    if ( i<section_list.length-1 ) {
                        return section_list[i+1];
                    } else { //if we are already at the last item in the list return the first item
                        return section_list[0];
                    }
                } 
            }
            //or if they didn't pass in a location go to the first section
            return section_list[0];

        },
    	isValid: function() {
    		if (user.eMail != "") {
    			return true;
    		}
    	},
    	exists: function() {
    		return (user !== {} );
    	},
    	deleteUser : function() {
    		// Remove the user 
    		user = {};

    		console.log('deleting user');
    		// Delete the user from the database
    		//The deleteLocalUser function already returns a promise so we can just return it through
    		return localDB.deleteLocalUser();

    	}
    }
  });
