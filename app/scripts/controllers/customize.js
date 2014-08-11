'use strict';

angular.module('niiuWebappApp')
  .controller('CustomizeCtrl', function ($rootScope, $window, $scope, niiuSyncer, localDB, $q, $location, User,constants) {
    $window.scrollTo(0,0);

  	console.log('the scope at this point is like this', $scope);
  	console.log('the root scope at this point is like', $rootScope);
    niiuSyncer.createMenuObj().then(function(menuObj) {
        console.log('The MenuObj looks like this',menuObj);
        $scope.menuObj=menuObj;
        $scope.importUserSections(User.getUser().contentProfile.items);
        $scope.treeArray=[];


        for (var i in menuObj) {
          console.log('making treeObj');
         console.log( 'menuObj['+i+'] is in the house', menuObj[i]);
          $scope.treeArray.push(menuObj[i]);

        }

        console.log('The treeArray looks like this',$scope.treeArray);

    }
   );

   $scope.sectionsToAdd = [];
   //console.log("are there user sections?",User.getUser().contentProfile.items);

   $scope.isCollapsed = true;
   $scope.isSubCollapsed = true;



  	function getSections() {
      var deferred = $q.defer();
      console.log('niiuSyncer', niiuSyncer);


       		localDB.loadSectionsFromDB().then(function(db_sections) {
  			console.log('I got the following sections from the DB', db_sections);
  			deferred.resolve(db_sections)
  		}, function (db_error) {
  			console.log('i got nothing because ',db_error);
  			deferred.reject(db_error);
  		});
  			//this tells the next function to wait for the answer
  			return deferred.promise;

  			
  	};



   $scope.addSection = function(section,src,subsection,custom) {

        //if everything is null dont do anything
        if(section===null && src===null && subsection===null && custom===null) {
            var this_error="Please enter a custom section or choose a source and section";
            console.log(this_error);
            $scope.error=this_error;
            return;
        }


        section = section || null;
        src = src || null;
        subsection = subsection || null;
        custom = custom || null;
        console.log('user added section:'+section+' src:'+src+' subsection:'+subsection+' custom:'+custom, $scope.menuObj);
        var sectionName= section ? $scope.menuObj["sec_"+section].name : "";
        var sourceName= src ? $scope.menuObj["sec_"+section].sources["source_"+src].name : "";
        var subsectionName= subsection ? $scope.menuObj["sec_"+section].sources["source_"+src].subsections["sub_"+subsection].name : ""
        var customName= custom ? custom : "";
        var handle_string= src +"|"+ section +"|"+  subsection  +"|"+custom;
        
        var newSection = {
            "json" : {
                        "section": section,
                        "source": src,
                        "subsection": subsection,
                        "custom_section": custom 
                       },
            "name" : sourceName +" "+ sectionName +" "+  subsectionName  +" "+customName,
            "handle" : handle_string
        }

        console.log('adding sections');
        //check and see if this section is a duplicate
        var duplicates = $scope.sectionsToAdd.filter(function( obj ) {
          
          return obj.handle == handle_string;
        });

        
        if (duplicates.length) {
          console.log('this section totally exists',duplicates);
          $scope.error="This is a duplicate section";
        } else {
          console.log('this section seems new',duplicates);

              if($scope.sectionsToAdd.length>=constants.MAXIMUM_SECTIONS) {
                  $scope.error="You have reached your maximum number of sections. Please remove some if you would like to add new ones";
              } else {
                  $scope.sectionsToAdd.push(newSection);
                  console.log('new Section added', handle_string);
                }


         } 

        
    };

$scope.addCustomSection = function() {
   
   $scope.addSection(null,null,null,$scope.custom_section);

 }


$scope.importUserSections = function(user_sections) {
   //Put all existing sections into the sectionsToAdd Array
   angular.forEach(user_sections, function(user_section, key) {
    //console.log($scope);
    $scope.addSection(user_section.section,user_section.source,user_section.subsection,user_section.custom_section);


   }, null);

 }

    

    $scope.removeSection = function(section_handle) {
          
         if (!section_handle) {
          } else {
            //loop through the array and remove the matching items
            console.log($scope.sectionsToAdd);
            for(var i = $scope.sectionsToAdd.length; i--;){
              if ($scope.sectionsToAdd[i].handle === section_handle) {
                console.log('removing section'+i,($scope.sectionsToAdd[i].handle));
                $scope.sectionsToAdd.splice(i, 1);
              }
              
            }
            console.log($scope.sectionsToAdd);

        
        
      }

    };


    $scope.syncSections = function(section_list_array) {
      //current_user,last_sync_time,last_cp_update_time
    localDB.getLastSync().then(function(sync_time) {
      console.log('the last 3s sync time in the db is',sync_time);
      var update_time = localDB.getNowTime();

      
      var json_section_array=[];

       angular.forEach(section_list_array, function(new_section, key) {

            this.push(new_section.json);

        }, json_section_array);

       $scope.user.contentProfile.items=json_section_array;
       console.log('i want to change the contentProfile',$scope.user);



      

      console.log('send to niiusyncer',Array($scope.user,sync_time,update_time,json_section_array) );
      
      var syncObject=niiuSyncer.createSectionObject($scope.user,sync_time,update_time,json_section_array);
      console.log('this is the object that should update your sections',syncObject);
      niiuSyncer.syncNewSections(syncObject).then(function(syncResponse) {
          console.log('successfully updated sections!!',syncResponse);
          //syncResponse.contents.data.contentProfile.items;
          User.setContentProfile(syncResponse.contents.data.contentProfile);

          //instead of syncResponse we need 3s
          localDB.get3sFromDB().then(function(current3s){
          User.setContentObject(current3s, syncResponse.contents.data.articles);
          
            $scope.user=User.getUser();
            User.saveCurrentUser().then(function(saved_user) {

                          console.log('the updated user has the following contentProfile',$scope.user);

                          $location.path('/userHome/');
                    }

                    );
          },function(error3s) {
            console.log('there was no 3s to create this new contentObject with');
          })

      },
      function(syncError) {
        console.log('we didnt get to update your section, we should save the request in the db',syncError);
        $scope.error=syncError;
              niiuSyncer.sync3s().then(function(data_3s) {
              console.log('just did a 3s, now we will try again to sync sections',data_3s.data.contents.data.last3SSync);
              localDB.put3s(data_3s).then(function(put3s_confirmation) {
                    $scope.syncSections(section_list_array);
                  }


                );
              
            });

      }



        );



    },

    function(sync_error) {
      console.log('unfortunately we couldnt find a sync time in the db, just use a generic time, we should probably rerun',sync_error);
      //return "2012-12-12 12:12:12";
    }

    );


    };

$scope.refresh3s = function()  {
      var deferred=$q.defer();
      niiuSyncer.sync3s().then(function(data_3s) {
      console.log('here is some 3s data',data_3s);
        console.log('>>> here are the sections ' ,data_3s.data.contents.data.newSections);
        //add sections to DB
          localDB.put3s(data_3s.data).then( function() {
         /*   localDB.addSectionsToDB(data_3s.data.contents.data.newSections);
            localDB.addSourcesToDB(data_3s.data.contents.data.newSources);
            localDB.addSourceSectionsToDB(data_3s.data.contents.data.newSourceSection);
            localDB.addSectionSubsectionsToDB(data_3s.data.contents.data.newSectionSubsection);
            localDB.addSubSectionsToDB(data_3s.data.contents.data.newSubsections);
            localDB.addSourceSubsectionsToDB(data_3s.data.contents.data.newSourceSubsection); */
            
            //add sections to Scope
            $scope.sections=data_3s.data.contents.data.newSections;
            $scope.sources=data_3s.data.contents.data.newSources;
            console.log('section 7 is called', $scope.sections[7].name);
                  localDB.setLastSync().then( function() {
                      deferred.resolve(data_3s.data);
                  }

              );
            
          });

        

        //at this point we have all the 3s info and it should be saved so lets run



      }, 
      function(no_data_3s) {
        console.log('for some reason we couldnt get any 3s data',no_data_3s);
        deferred.reject(no_data_3s);
      }
      );
      return deferred.promise;

      
  };

    function getSourceSections() {
      var deferred = $q.defer();


      localDB.loadSourceSectionsFromDB().then(function(db_sectionSources) {
        console.log('I got the following sectionsources from the DB', db_sectionSources);
        deferred.resolve(db_sectionSources);
      }, function (db_error) {
        console.log('i got no subsections because ',db_error);
        deferred.reject(db_error);
      });
        //this tells the next function to wait for the answer
        return deferred.promise;

        
    };

function getSectionSubSections() {
      var deferred = $q.defer();


      localDB.loadSectionSubsectionsFromDB().then(function(section_subsections) {
        console.log('I got the following sectionsubsections from the DB', section_subsections);
        deferred.resolve(section_subsections);
      }, function (db_error) {
        console.log('i got no section_subsections because ',db_error);
        deferred.reject(db_error);
      });
        //this tells the next function to wait for the answer
        return deferred.promise;

        
    };

function getSourceSubSections() {
      var deferred = $q.defer();


      localDB.loadSourceSubsectionsFromDB().then(function(source_subsections) {
        console.log('I got the following source_subsections from the DB', source_subsections);
        deferred.resolve(source_subsections);
      }, function (db_error) {
        console.log('i got no source_subsections because ',db_error);
        deferred.reject(db_error);
      });
        //this tells the next function to wait for the answer
        return deferred.promise;

        
    };
function addSection(section_id) {
console.log(section_id);

};

    function getSubSections() {
      var deferred = $q.defer();


      localDB.loadSubSectionsFromDB().then(function(db_subsections) {
        console.log('I got the following subsections from the DB', db_subsections);
        $scope.subsections=db_subsections;
        deferred.resolve(db_subsections);
      }, function (db_error) {
        console.log('i got no subsections because ',db_error);
        deferred.reject(db_error);
      });
        //this tells the next function to wait for the answer
        return deferred.promise;

        
    };

  	  function getSources() {
        var deferred = $q.defer();

  		localDB.loadSourcesFromDB().then(function(db_sources) {
  			console.log('I got the following sources from the DB', db_sources);
  			deferred.resolve(db_sources)
  		}, function (db_error) {
  			console.log('i got nothing because ',db_error);
  			deferred.reject(db_error);
  		});
  			//this tells the next function to wait for the answer
  			return deferred.promise;

  			
  	};

  	getSections().then(function(sections) {
  		$scope.sections = sections;
  		console.log('putting the section list into the scope of this page');

  	}

  	).then(function() {
  		console.log('chained response');

  	getSubSections().then(function(subsections) {
  			$scope.subsections=subsections;
  			console.log('adding subsections to scope',subsections);

	   }
  	);

    getSectionSubSections().then(function(section_subsections) {
        $scope.section_subsections=section_subsections;
        console.log('adding section_subsections to scope',section_subsections);

     }
    );

      getSourceSections().then( function(source_sections) {
        var deferred = $q.defer();
        console.log('I got the following sourcesections from the DB', source_sections);
        $scope.source_sections=source_sections;
        deferred.resolve(source_sections);


      }, function(error_sectionsources) {
          console.log('we didnt get sourcesections because ',error_sectionsources);
          deferred.reject(error_sectionsources);
      }   
      );
  		
  	

      getSourceSubSections().then( function(source_subsections) {
        var deferred = $q.defer();
        console.log('I got the following source_subsections from the DB', source_subsections);
        $scope.source_subsections=source_subsections;
        deferred.resolve(source_subsections);


      }, function(error_source_subsections) {
          console.log('we didnt get source_subsections because ',error_source_subsections);
          deferred.reject(error_source_subsections);
      }   
      );
      
    });


  	getSources().then(function(sources) {
  			$scope.sources=sources;
  			console.log('add sources to scope',sources);
        //$scope.apply();
	}
  	);


$scope.init=function() {

  $scope.user = User.getUser();
  $scope.pageClass='menuPage';
  $scope.refresh3s().then(  

     ); 

}
$scope.init();











  });
