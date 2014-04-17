angular.module('demoWebAppApp')
.controller('SectionsCtrl', ['$scope','$location', function ($scope, $location) {
	
	$scope.sections = [];


	// open pouch db section
	var db = PouchDB('sections12.28');
	// remote controle with couchDB false
	var remoteCouch = false,
		getArticleUrl = 'http://kirkthedev.com/niiu/double_proxy_x.php?url=http://dev.niiu.de/articles/sync_3s',
		Doc_count;

	db.info(function(err, info) { 
		Doc_count = info.doc_count;

		// check if have data in DB or make fresh load of data
		if (Doc_count < 1) {
			console.log('getting initial data')
			initialDataSettings();
		} else {
			console.log('looking for data update')
			updateDataSettings();
		}

	});

	

	

	// engine for getting data from api
	function getData(DataObject) {
		// stringify json data object
		var jsonString = JSON.stringify(DataObject);
		// put string in object with key = data
		var getArticleData = {data:jsonString};

		// get section data from api
		$.post(getArticleUrl, getArticleData, function(data){
			if (data) {

				var Sections = data.contents.data.newSections;

				$scope.sections = Sections;

				// apply data to scope
				$scope.$apply();

				// call function add to database and add data to local DB
				addSection(Sections);


			}
		}, 'json');
	}

	function getDataUpdate(DataObject) {

		// stringify json data object
		var jsonString = JSON.stringify(DataObject);
		// put string in object with key = data
		var getArticleData = {data:jsonString};

		// get section data from api
		$.post(getArticleUrl, getArticleData, function(data){
			if (data) {
				var dataContents = data.contents;
				
				var updatedSections = dataContents.data.updatedSections;

				$scope.sections.push(updatedSections);
				$scope.$apply();
				
				// call function add to database and add data in bulk to local DB
				updateSection(updatedSections);

			}
		}, 'json');
		
	}

	function renderFromDB() {

		db.allDocs({include_docs: true}, function(err, response) { 

			var databaseResponse = response.rows;

			var sections = [];

			for (var i = databaseResponse.length - 1; i >= 0; i--) {
				
				sections.push(databaseResponse[i].doc);

			};
			$scope.sections = sections;
			
			// apply data to scope
			$scope.$apply();
			
		});
		
	}

	renderFromDB();

	// first time app is turned on and we do not have nothing in local DB
	function initialDataSettings() {
		
		
		var DataObject = {'api':'3s','action':'sync','appGuid':'3fc8274c-3ad4-4cc4-b5c6-9eaba0734a3c',
		'data':{
				'lastSync':'2014-02-26 13:41:25',
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
		var sectionList = [];

		// get all section id from database
		db.allDocs({include_docs: true}, function(err, response) { 

			var databaseResponse = response.rows;

			for (var i = databaseResponse.length - 1; i >= 0; i--) {
				
				var id = databaseResponse[i].doc._id;

				sections.push(id);

			};
		 	sectionListString = sections.join(',');
			sectionList.push(sectionListString);



		var DataObject = {'api':'3s','action':'sync','appGuid':'3fc8274c-3ad4-4cc4-b5c6-9eaba0734a3c',
		'data':{
				'lastSync':'2013-10-15 13:41:25',
				'sections': sectionList,
				'sources':[],
				'subsections':[],
				'sections_subsections':[],
				'sources_sections':[],
				'sources_subsections':[]
			}
		};
		if (navigator.onLine) {
				// call get data function
				getDataUpdate(DataObject);
			} else {
				console.log("you have to be connected to the internet to get new content.");
			}

		});
		
	}


	// add section in bulk function
	function addSection(dataResponse) {

		for (var i = dataResponse.length - 1; i >= 0; i--) {
			
			db.put({
			  _id: dataResponse[i].id,
			  name: dataResponse[i].name
			});

		};
	}

	function updateSection(dataResponse) {

		for (var i = dataResponse.length - 1; i >= 0; i--) {
				
			var id = dataResponse[i].id,
				name = dataResponse[i].name;

			db.get( id, function(err, resp) {
				db.put({
					_id: id,
					_rev: resp._rev,
					name: name
				});
			});

		};
	}

	

	$scope.enterSection = function(id) {
		$location.path( '/articles' );
		//$scope.apply();
	};
}]);


