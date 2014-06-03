'use strict';

angular.module('niiuWebappApp')
  .controller('CustomizeCtrl', function ($rootScope, $scope, niiuSyncer, localDB, $q, User) {


  	console.log('the scope at this point is like this', $scope);
  	console.log('the root scope at this point is like', $rootScope);




  	function getSections() {
      var deferred = $q.defer();


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



  $scope.user = User.getUser();
  $scope.pageClass='menuPage';








/*
  	var newSections = function() {

  		var deferred = $q.defer();
  		var promise = deferred.promise;

  		promise.then(function(db_sections) {
  			console.log('I got the following sections from the DB', db_sections);
  			deferred.resolve(db_sections)
  		}, function (db_error) {
  			console.log('i got nothing because ',db_error);
  			deferred.reject(db_error);
  		});
  		
  		//return promise;

  		var loadSections = localDB.loadSectionsFromDB();
  		loadSections.then( function(db_sections) {
  			console.log('I got the following sections from the DB', db_sections);
  			deferred.resolve(db_sections)
  		}, function (db_error) {
  			console.log('i got nothing because ',db_error);
  			deferred.reject(db_error);
  		}
  		
  		);	



  	};

  //	newSections();
  	//localDB.loadSectionsFromDB().then(function(loaded) {
  		console.log('loaded!!',localDB.loadSectionsFromDB());
  	//}
  	//);
  
  	

  	getSections().then(
  		function(db_sections) {
  			console.log('I got the following sections from the DB', db_sections);
  			return db_sections;
  		}, function (db_error) {
  			console.log('i got nothing because ',db_error)
  		}



  		);
*/
  	//console.log(getSections());





  });
