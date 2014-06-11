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

    function makeContentObject(data3s,dataArticles) {

    }

    /* Object containing an array of Objects */
    var contentObject = {[
        
        0  : {
            type: "titlepage",
            section : {
                id : null,
                name : null,
                logo : null 
            },
            source : {
                id : null,
                name : null,
                logo : null
            },
            subsection : {
                id : null,
                name : null,
                logo : null
            },
            custom_section : {
                id : null,
                name : null,
                logo : null
            },
            articles : {
                0 : {                 
                    subtitle: "Im Weekend schallte Donnerstag nach fünfmonatiger Renovierung wieder Techno aus den Boxen. Auch im Kater Holzig wurde gefeiert, wenn auch nur für eine Nacht.",
                    language: "de-de",
                    title: "Schöne Aussichten für Clubgänger",
                    media: 
                    [  ],
                    author: "Philip Barnstorf",
                    web_link: "http://www.tagesspiegel.de/berlin/weekend-und-kater-holzig-oeffnen-wieder-schoene-aussichten-fuer-clubgaenger/10004676.html",
                    id: 852250,
                    content: 
                    "Perfekte Frisuren, penibel gestutzte Dreitagebärte, sanfte Elektrobässe, Sonnenuntergang über der Skyline, ein Gläschen Sekt – so feierten etwa 300 geladene Gäste am Donnerstagabend die Wiedereröffnung einer der schönsten Dachterrassen der Stadt. Nach mehrmonatiger Renovierung wird im Weekend am Alexanderplatz nun wieder getanzt, am Freitag startete der normale Clubbetrieb. Zur Eröffnung hatte Betreiber Marcus Trojan einige Prominenente ins ehemalige Haus des Reisens nach Mitte geladen, zum Beispiel Marcel Dettmann, der sonst im Berghain auflegt, und Michael Biloune, der hinter einer riesigen Sonnenbrille versteckt die Beats der House-Musik zusammenmixte, zu der vor Mitternacht noch niemand so recht tanzen wollte. "+

                    "Aber das störte den Londoner, der sich als DJ Venus Six nennt, nicht. Er ist froh, dass es diesen Club im 17. Stock nun wieder gibt. „Als House-DJ ist Berlin der beste Ort“, sagte Biloune. In London gehe es nur um Aussehen und Geld, „hier verstehen die Leute viel mehr von der Musik“. Für Michi Beck von den Fantastischen Vier gilt das allemal, er genoss ebenso die Atmosphäre wie Model Eva Padberg und Schauspieler Dominic Raacke. Etwas promilastig sei das Weekend, nörgelte ein anderer Gast. „Aber die Aussicht ist atemberaubend.“ Immer wieder schlängelten sich Gäste zu den Sofas zwischen Bambuspflanzen, um durch die Glaswand zu Blicken, hinter der es mehr als 60 Meter in die Tiefe geht. "+

                    "Etwas bescheidener ging es am Donnerstagabend im Kater Holzig zu, der überraschend eine Mini-Eröffnung feierte. Ehemalige Mitarbeiter probierten schon mal die Location am neuen, alten Standort an der Holzmarktstraße, wo bis zum Jahr 2010 die Bar25 längst legendäre Partys unterhielt. Auf dem Gelände des sogenannten Holzmarkt in Friedrichshain entstehen direkt an der Spree neben einem kleinen Club auch ein Hotel, Wohnungen und Gewerbeflächen, ein Kindergarten und ein Restaurant. Die Clubgänger müssen sich allerdings noch gedulden: Irgendwann im Sommer soll der Club, der wesentlich kleiner ist als die beiden Vorgänger Bar 25 und Kater Holzig, offiziell wiedereröffnen. Ein genauer Termin ist noch nicht bekannt.",

                    type: "article",
                    tag: 
                    [  ],
                    retrieved_date: "2014-06-06 20:25:04",
                    published_date: "2014-06-06 20:10:09",
                    source_id: 28,
                    foreign_id: 10004676,
                    sections:  { 
                        subsection_id: 10,
                        section_id: 10,
                        content_priority: 23.0804,
                        custom_section: "Friedrichshain"
                    },
                     
                    clicks: 0,
                    revision: "ee313e66532be1108f45746bfe9f27b5"
                }
            } 

        }
    ]};

    

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
