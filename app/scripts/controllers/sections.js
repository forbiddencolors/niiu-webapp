angular.module('demoWebAppApp')
.controller('SectionsCtrl', ['$scope','$location', function ($scope, $location) {
	
	$scope.sections = [];


	// open pouch db section
	var db = PouchDB('sections');
	// remote controle with couchDB false
	var remoteCouch = false,
		getArticleUrl = 'http://dev.niiu.de/articles/sync_3s',
		Doc_count;

	db.info(function(err, info) { 
		Doc_count = info.doc_count;
	});

	if (Doc_count < 1) {
		initialDataSettings();
	} else {
		updateDataSettings();
	}

	function getData(DataObject) {
		// stringify json data object
		var jsonString = JSON.stringify(DataObject);
		// put string in object with key = data
		var getArticleData = {data:jsonString};

		// get section data from api
		$.post(getArticleUrl, getArticleData, function(data){
			if (data) {
				var dataResponse = data.data.newSections;
				
				for (var i = dataResponse.length - 1; i >= 0; i--) {
					$scope.sections.push(dataResponse[i]);
				}

				// apply data to scope
				$scope.$apply();

				// call function add to database and add data in bulk to local DB
				addSection(dataResponse);

			}
		}, 'json');
	}

	// first time app is turned on and we do not have nothing in local DB
	function initialDataSettings() {
		
		
		var DataObject = {'api':'3s','action':'sync','appGuid':'3fc8274c-3ad4-4cc4-b5c6-9eaba0734a3c',
		'data':{
				'lastSync':'2013-10-15 13:41:25',
				'sections':[],
				'sources':[],
				'subsections':[],
				'sections_subsections':[],
				'sources_sections':[],
				'sources_subsections':[]
			}
		};

		getData(DataObject);

	}

	// this is update for local DB
	function updateDataSettings() {

		var sections = [];

		// get all section id from database
		db.allDocs({include_docs: true}, function(err, response) { 

			var databaseResponse = response.rows;

			for (var i = databaseResponse.length - 1; i >= 0; i--) {
				var id = databaseResponse[i].doc.id;

				sections.push(id);

			};


		});

		var DataObject = {'api':'3s','action':'sync','appGuid':'3fc8274c-3ad4-4cc4-b5c6-9eaba0734a3c',
		'data':{
				'lastSync':'2013-10-15 13:41:25',
				'sections': sections,
				'sources':[],
				'subsections':[],
				'sections_subsections':[],
				'sources_sections':[],
				'sources_subsections':[]
			}
		};
		
		getData(DataObject);
		
	}


	// add section in bulk function
	function addSection(dataResponse) {
		var data = dataResponse;

		db.bulkDocs({docs: dataResponse}, function(err, response) { console.log(dataResponse) });

	}

	

	$scope.enterSection = function() {
		$location.path( '/articles' );
	};
}]);


