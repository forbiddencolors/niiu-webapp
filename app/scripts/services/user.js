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

                var section_url="/sectionHome/"+nextSection+"/"+nextSource+"/"+nextCustom;
                section_urls.push(section_url);
            }

            return section_urls;
        }

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

    		// Save it to the database and return the promise from the DB service
    		return localDB.storeUser(newUser);

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
                if (location==section_list[i] ) {
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
