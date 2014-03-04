angular.module('demoWebAppApp')
.controller('SectionsCtrl', ['$scope', function ($scope) {
	
	$scope.sections = [];


	// open pouch db section
	var db = new ydn.db.Storage('ydn-sectionsTest');
	// remote controle with couchDB false
	var getArticleUrl = 'http://kirkthedev.com/niiu/double_proxy_x.php?url=http://dev.niiu.de/articles/sync_3s';

	db.values('sections').done(function(sections) {
		var sectionsLength = sections.length;
		if (sectionsLength >= 1 && 0) {
			console.log('existing');
			renderFromDB();
			updateDataSettings();
		} else {
			console.log('not existing');
			initialDataSettings();
		}


	});

	

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

				console.log("We are scoping out these sections "+Sections+". Here is one." );
				console.log(Sections[1]);

				// apply data to scope
				$scope.$apply();

				// call function add to database and add data to local DB
				addSection(Sections);

			}
		}, 'json');
	}

	// add section in bulk function
	function addSection(dataResponse) {

		for (var i = dataResponse.length - 1; i >= 0; i--) {
			
			var objectData = {
				id: dataResponse[i].id,
				name: dataResponse[i].name
			};
console.log('adding sections to db with key '+objectData.id );
			db.put('sections', objectData, objectData.id );

		};
	}


	// this is update for local DB ************************************************************
	function updateDataSettings() {

		var sections = [];
		var sectionList = [];

		// get all section id from database
		db.values('sections').done(function(data) {
			for (var i = data.length - 1; i >= 0; i--) {
				
				var id = data[i].id;

				sections.push(id);

			};

			var sectionListString = sections.join(',');
			sectionList.push(sectionListString);

			console.log(sectionList);

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

			// call get data function
			getDataUpdate(DataObject);

		});

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

				
				// call function add to database and add data in bulk to local DB
				updateSection(updatedSections);

			}
		}, 'json');
		
	}

	function updateSection(dataResponse) {

		console.log('data to update in DB:' + dataResponse)
	}


	// rendering starting here *****************************************************************
	function renderFromDB() {

		db.values('sections').done(function(data) {
			console.log(data);
			AddToScope(data);

		});

	}


	function AddToScope(data) {
		$scope.sections = data;
		console.log($scope.sections);

		// apply data to scope
		$scope.$apply();
	}

	
	
}]);


