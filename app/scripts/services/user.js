'use strict';

angular.module('niiuWebappApp')
  .service('User', function User(localDB, $filter, $q, constants) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var user = {};
    /* ContentObject is array of up to 11 pageObjects */
    var contentObject = [];
    var currentSection = 0;
    var hideMenu = true;

    function makeSectionUrls() {
            //Get list of section urls to rotate through
                var user_sections=contentObject;
                console.log('heres the ',contentObject);
                var section_urls=[];
                
            for (var i=0; i<user_sections.length; i++) {

                var section_url=user_sections[i].url;
                section_urls.push(section_url);
            }
            console.log('next section urls ', section_urls); 
            return section_urls;
        }





    function makeContentObject(data3s,dataArticles) {
        
        var tempObjArray=[];
        console.log('passed contentObject 3s',data3s);
        console.log('passed contentObject articles', dataArticles);
        /*
        //apparently we don't have access to the contentobject here
        if (data3s===undefined && dataArticles===undefined && contentObject)
        {
            console.log('you get passed the old contentObj',contentObj);
            //if we already have a contentObj
            //return contentObject;
        }  
        */
        
        if (typeof(data3s)=='undefined') data3s=localDB.get3sFromDB();
        if (typeof(dataArticles)=='undefined') { 
            dataArticles=localDB.loadArticlesFromDB().then(function(done) {
            console.log('now we have some contentObject articles from the DB',done);
            });
        } else {
               //if dataArticles isn't undefined then they must already be there so lets just move along.
               // localDB.addArticlesToDB(dataArticles);

            }
        var user_sections=user.contentProfile.items;
        var section_urls=[];
        var userPage=[];
        console.log('this is the contentObject basis',user_sections);
        console.log('here we have the following to play with',user_sections);

        var pageArticles = [];
        var homeArticles = [];
        var homeArticlesNum = 1; //amount of articles per section on the title page
        for (var i=0; i<user_sections.length; i++) {
                //if (i>0 && user_sections[i]==='undefined') continue;

                
               // console.log('for some reason we cant define this contentObject section',(user_sections[i+1]))
                var thisSection = (user_sections[i]) ? user_sections[i].section : "";
                var thisSource = (user_sections[i]) ? user_sections[i].source : "";
                var thisSubsection = (user_sections[i]) ? user_sections[i].subsection : "";
                var thisCustom = (user_sections[i]) ? user_sections[i].custom_section : "";

                console.log('data3s #'+i+' looks like',data3s);
                var testFilter=(thisSection && thisSection!="") ? $filter('getByProperty')(data3s.contents.data.newSections, "id", thisSection) : "filters broken";
                console.log('does my filter work?',testFilter);

                var thisSectionObj = (thisSection && thisSection!="") ? $filter('getByProperty')(data3s.contents.data.newSections, "id", thisSection): {};
                var thisSourceObj = (thisSource && thisSource!="") ? $filter('getByProperty')(data3s.contents.data.newSources, "id", thisSource): {};
                var thisSubsectionObj = (thisSubsection && thisSubsection!="") ? $filter('getByProperty')(data3s.contents.data.newSubsections, "id", thisSubsection): {};


                console.log('contentObject'+i+' needs thisSection ',thisSectionObj);
                console.log('contentObject'+i+' needs thisSource ',thisSourceObj);

                 pageArticles[i] = [];
                



                var section_url="/sectionHome/"+thisSource+"/"+thisSection+"/"+thisCustom;
                section_urls.push(section_url);

                var page_type = "3s";
                

                //loop through all articles and select the ones that match this section
                for (var h=0; h<dataArticles.length; h++) {

                  /*  if (user_sections[i] && dataArticles[h].sections) console.log('failing contentObject check because '
                        +dataArticles[h].sections.section_id+' is not equal to '+user_sections[i].section+
                        ' or '+ dataArticles[h].sections.subsection_id+' is not equal to '+ user_sections[i].subsection +
                        ' or '+ dataArticles[h].source_id +' is not equal to '+ user_sections[i].source +
                        ' check'
                        , 
                        (dataArticles[h].sections.section_id === user_sections[i].section &&
                        dataArticles[h].sections.subsection_id === user_sections[i].subsection &&
                        dataArticles[h].source_id === user_sections[i].source ));
                    */
                  //  if (page_type==="titlepage" ) {
                        
                        //this page doesn't follow the have any articles associated with it, so im not sending it through the standard article process
                        //add the first article
                        /*
                        if(1) {
                            console.log('contentObject articles zero again')
                            pageArticles[i].push(dataArticles[h]);
                        }
                        */
                        

                        //console.log('added two articles to the contentObject for the title page', pageArticles[i]);
                  //  } else   

                    
                     if (dataArticles[h].sections.custom_section === user_sections[i].custom_section && 
                        dataArticles[h].sections.custom_section!== null ||
                        dataArticles[h].sections.section_id === user_sections[i].section &&
                        dataArticles[h].sections.subsection_id === user_sections[i].subsection &&
                        dataArticles[h].source_id === user_sections[i].source 
                        
                        ) {
                           //console.log('failing contentObject filter because article section '+dataArticles[h].sections.section+'is equal to'+user_sections[i].section,(user_sections[i].source));
                            //console.log('failing',user_sections[i].source );
                                
                                //when need to know the section title we can just look up the title for contentObject[i].sectionIndex;
                                dataArticles[h].sectionIndex=i+1;
                                dataArticles[h].source_logo=thisSourceObj.logo;
                                dataArticles[h].source_logo=$filter('getByProperty')(data3s.contents.data.newSources, "id", dataArticles[h].source_id).logo


                                pageArticles[i].push(dataArticles[h]);

                            //console.log('contentObject page'+i+' gets these articles, ',dataArticles[h]);
                             //console.log('passed contentObject filter because data',dataArticles[h].sections.custom_section +" is equal to "+user_sections[i].custom_section, (dataArticles[h].sections.custom_section === user_sections[i].custom_section && dataArticles[h].sections.custom_section!= null) );
                             //console.log('passed contentObject filter because section',dataArticles[h].sections.section_id +" is equal to "+user_sections[i].section, (dataArticles[h].sections.section === user_sections[i].section));
                                console.log('homeArticles count'+i,homeArticles);
                                //not a pretty formula but it says for if there are less than 2*the amount of sections we have, add an article to the homepage
                                //so if there we are making section three and we have less than six articles on the home page add another.
                              var  currentHomeArticle= (i+1)*homeArticlesNum;
                              if (homeArticles.length < currentHomeArticle) {

                                        homeArticles.push(dataArticles[h])
                                        console.log('add new homeArticle')
                                } else if (dataArticles[h].published_date>homeArticles[currentHomeArticle-1].published_date) {
                                        //add a couple articles to the titlepage

                                     //   pageArticles[0].push(dataArticles[h]);
                                        

                                        homeArticles[currentHomeArticle-1]=dataArticles[h];
                                        console.log('update with newer homeArticle dated',dataArticles[h].published_date)
                              }
                              
                              

                    }

                }



                
                 console.log('here are the contentObject pageArticles ',pageArticles[i]);
            

                var page_section = (user_sections[i]) ? user_sections[i].section : null;
                var page_source = (user_sections[i]) ? user_sections[i].source : null;
                var page_subsection = (user_sections[i]) ? user_sections[i].subsection : null;
                var page_custom_section = (user_sections[i]) ? user_sections[i].custom_section : null;
                var page_custom_logo = (user_sections[i]) ? constants.CUSTOM_SECTION_LOGO : null;
                var page_title =  "No Title";
                var page_subject = "No Subject";
                console.log('what is this user_section'+i,user_sections[i]);
                /*
                if(i===-1) {
                    //clear out these values on the title page
                    console.log('only for the title page',user_sections[i])
                    thisSectionObj={};
                    thisSectionObj.name=null;
                    thisSectionObj.logo =null;

                    thisSourceObj={};
                    thisSourceObj.name=null;
                    thisSourceObj.logo=null;

                    thisSubsectionObj={};
                    thisSubsectionObj.name=null;
                    thisSubsectionObj.logo=null;



                }
                */
                
                    console.log('MakeContentObject: do I still have a sourceObj?',thisSourceObj);
                    console.log('Do we have a source?'+i,(thisSourceObj));
                    console.log('Do we have a source with a name',(!thisSourceObj.hasOwnProperty('name')));
                    //when we are dealing with a custom section fill in the other contentObject properties 
                    if (!thisSourceObj.hasOwnProperty('name')) { 

                        thisSourceObj={};
                        thisSourceObj.name=null;
                        thisSourceObj.logo=null;

                    }
                    if (!thisSubsectionObj.hasOwnProperty('name')) {
                        thisSubsectionObj={};
                        thisSubsectionObj.name=null;
                        thisSubsectionObj.logo=null;

                    }
                    if (!thisSectionObj.hasOwnProperty('name')) {
                        thisSectionObj={};
                        thisSectionObj.name=null;
                        thisSectionObj.logo =null;

                    }
                    

                    if(thisSourceObj) {

                        console.log('MakeContentObject: got a source!!!',(typeof thisSourceObj.name!=='undefined'));

                        console.log('in this case',thisSubsectionObj);
                        if ( thisSourceObj.name) {
                            page_title = thisSourceObj.name+" >> ";
                            console.log('MakeContentObject:  source',thisSourceObj.name);
                        }
                        if (thisSubsectionObj.name) {
                            page_title += thisSubsectionObj.name;
                            page_subject = thisSubsectionObj.name;
                            console.log('MakeContentObject:  subsection',thisSubsectionObj.name);
                        } else if (thisSectionObj.name) {
                            page_title += thisSectionObj.name;
                            page_subject = thisSectionObj.name;
                            console.log('MakeContentObject: section',thisSectionObj.name);
                        }
                    }
                    if(user_sections[i]) {
                        if (user_sections[i].custom_section!==null) {

                            page_title = user_sections[i].custom_section;
                            page_subject = user_sections[i].custom_section;
                            thisSourceObj.logo = page_custom_logo;
                        }
                    }
                        

                        /*if (typeof thisSourceObj!=='undefined') {
                            page_title = thisSourceObj.name + " - ";

                        } */
                        




                


                    userPage[i]=  {
                                    type: page_type,
                                    title: page_title,
                                    subject: page_subject,
                                    url : section_url,
                                    section : {
                                        id : page_section,
                                        name : thisSectionObj.name,
                                        logo : thisSectionObj.logo 
                                    },
                                    source : {
                                        id : page_source,
                                        name : thisSourceObj.name,
                                        logo : thisSourceObj.logo
                                    },
                                    subsection : {
                                        id : page_subsection,
                                        name : thisSubsectionObj.name,
                                        logo : thisSubsectionObj.logo
                                    },
                                    custom_section : {
                                        id : page_custom_section,
                                        name : page_custom_section,
                                        logo : page_custom_logo
                                    },


                                    articles : pageArticles[i]

                                
                                } 
                
                console.log('pushing to contentObject'+i, userPage[i]);
                
                tempObjArray.push(userPage[i]);
        } //end for loop
        
        //add the title page here
        console.log("homeArticles?",homeArticles)
        var titlePage = {
                                    type: "titlepage",
                                    title: "menu_titlepage",
                                    subject: "menu_titlepage",
                                    url : "/sectionHome/",
                                    sectionIndex : 0,
                                    section : {
                                        id : "",
                                        name : "",
                                        logo : "" 
                                    },
                                    source : {
                                        id : "",
                                        name : "",
                                        logo : ""
                                    },
                                    subsection : {
                                        id : "",
                                        name : "",
                                        logo : ""
                                    },
                                    custom_section : {
                                        id : "",
                                        name : "",
                                        logo : ""
                                    },


                                    articles : homeArticles

                                
                                } 
        tempObjArray.unshift(titlePage);

        contentObject = tempObjArray;
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
        saveCurrentUser:function() {
            // Maybe make this function return a promise

            // Save it to the database and return the promise from the DB service
            return localDB.storeUser(user);

        },
        setContentProfile: function(content_profile) {
            if (typeof content_profile==='undefined') return;
            console.log('just updated the content_profile for ',content_profile);
            user.ContentProfile=content_profile;
            localDB.storeUser(user);
            return user;
        },
        getCurrentSection:function() {
            return currentSection;
        },
        setCurrentSection:function(secNum) {
            console.log('go to section',secNum);
            currentSection = secNum;
            $location.path('/sectionView/'+secNum);
        },
        getNextSection:function() {
            console.log(' go forward currentSection is currently'+currentSection );
            if ((currentSection+1)>=contentObject.length) {
                currentSection=0;
            }else {
                currentSection=currentSection+1;
            }

            return currentSection;
        },
        getPreviousSection:function() {
            console.log('go back currentSection is currently'+currentSection );
            if (currentSection===0) {
                console.log('on CurrentSection 0');
                currentSection=contentObject.length-1;

            }else {

                currentSection=currentSection-1;
                console.log('going to currentSection '+currentSection);
            }

            return currentSection;
        },
        getContentObject: function() {
            var deferred=$q.defer();
                if (contentObject.length<1) {
                    localDB.get3sFromDB().then(function(data_3s) {
                       var local_db3s=data_3s;
                       localDB.loadArticlesFromDB().then(function(db_data) {
                        var db_articles = db_data;
                        console.log('3s data we are about to pass', local_db3s);
                        makeContentObject(local_db3s,db_articles);
                        console.log('created a new contentObject right',contentObject)
                        //console.log('right',deferred.promise);
                        deferred.resolve( contentObject);
                       },function(error_articles) {
                            deferred.reject( error_articles);
                       });
                    }, function(error_3s) {
                            deferred.reject( error_3s);
                    });


                    
                } else {
                    console.log('we already have a contentObject');
                    deferred.resolve( contentObject);

                } 
              
                
                console.log('heres the contentObject we are getting',contentObject)
                return deferred.promise;
                

        },
        getContentArticles: function() {
            console.log('pulling articles from contentObject',contentObject);
           // var deferred=$q.defer();
            var contentArticles=[];
            if(contentObject.length>0) {
                for (var i=0;i<contentObject.length;i++) {
                    contentArticles=contentArticles.concat(contentObject[i].articles);
                    console.log('adding to contentObject',contentArticles);
                }
                console.log('here are your contentArticles ', contentArticles);
                return contentArticles;
            } else {
                console.log('no contentObject for contentArticles ');
                makeContentObject().then(function(newContentObj) {
                    /*
                    for (var i=0;i<contentObject.length;i++) {
                        contentArticles.concat(contentObject[i].articles);
                    }
                    */
                    console.log('made new contentObject for contentArticles',newContentObj);
                    getContentArticles();

                }); 
            }


        },
        setContentObject: function(data3s,dataArticles) {

                console.log('did we get some new articles here?',dataArticles);
                //makes a new contentObject based on whats been passed
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
                        console.log('next Up is PageNum'+i);
                        return section_list[i+1];
                    } else { //if we are already at the last item in the list return the first item
                        return section_list[0];
                    }
                } 
            }
            //or if they didn't pass in a location go to the first section
            return section_list[0];

        },
        toggleMenu: function(onOff) {
            console.log('toggleMenu onOff is ',onOff);
            if(onOff===false || onOff===true) {
                hideMenu=onOff;
                 console.log('toggleMenu handled so now hideMenu is ',hideMenu);

            }

            console.log('toggleMenu so now hideMenu is ',hideMenu);

            if(hideMenu == false) {
                console.log('hide menu');

                angular.element('.row-offcanvas-left').removeClass('active');
                hideMenu=true;
             } else {
                console.log('show menu');

                 angular.element('.row-offcanvas-left').addClass('active');
                 hideMenu=false;

             }  


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
