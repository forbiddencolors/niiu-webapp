angular.module('demoWebAppApp')
.controller('SectionsCtrl', ['$scope','$location', function ($scope, $location) {

	// This is what our customer data looks like.
	var SectionData = [];
	var	getArticleUrl = 'http://kirkthedev.com/niiu/double_proxy_x.php?url=http://dev.niiu.de/articles/sync_3s';

	$scope.sections = [];



	function initialDataSettings() {
		console.log("initialDataSettings start");
		
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
		console.log("initialDataSettings done");

	}

	// engine for getting data from api
	function getData(DataObject) {
		console.log("getData start");

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




	var count = 0;



	function addSection(dataResponse) {
		console.log("addSection start");

		for (var i = dataResponse.length - 1; i >= 0; i--) {
			
			var obj = { id: dataResponse[i].id, name: dataResponse[i].name };

			SectionData.push(obj);
			
			count ++;


		};

		if (dataResponse.length == count)  {
			console.log("database call");

			database(SectionData);
		}

	}

	database();

	function database(SectionData) {
		// body...
		console.log("database start");

		var dbName = "sections";
		var request = indexedDB.open(dbName, 1);

		request.onerror = function(event) {
		  // Handle errors.
		  console.log('not working :(((((((')
		};
		request.onupgradeneeded = function(event) {
			var db = event.target.result;

			console.log('crating object store')

			  // Create an objectStore to hold information about our customers. We're
			  // going to use "ssn" as our key path because it's guaranteed to be
			  // unique.
			  var objectStore = db.createObjectStore("sections", { keyPath: "id" });

			  // Create an index to search sections by name. We may have duplicates
			  // so we can't use a unique index.

			  objectStore.createIndex("id", "id", { unique: false });

			  // Create an index to search sections by email. We want to ensure that
			  // no two sections have the same email, so use a unique index.

			  objectStore.createIndex("name", "name", { unique: true });

			  // Use transaction oncomplete to make sure the objectStore creation is 
			  // finished before adding data into it.

			  objectStore.transaction.oncomplete = function(event) {

			  	console.log('transaction started')

				// Store values in the newly created objectStore.
				var sectionObjectStore = db.transaction("sections", "readwrite").objectStore("sections");
				for (var i in SectionData) {
					sectionObjectStore.add(SectionData[i]);
				}
				console.log('saved to DB')

			}

		};
		request.onsuccess = function(event) {
			console.log('take from DB')

		  // Do something with the request.result!
		  var db = event.target.result;
		  var trans = db.transaction(["sections"], "readwrite");
		  var store = trans.objectStore("sections");

			 // Get everything in the store;
			 var keyRange = IDBKeyRange.lowerBound(0);
			 var cursorRequest = store.openCursor(keyRange);

			  // var result;
			 cursorRequest.onsuccess = function(e) {

			  	var result = e.target.result;

			  	if(!!result == false) {
			  		initialDataSettings();
			  		return;
			  	}

			  	renderFromDB(result.value);

			  	result.continue();
			  };

		};

	}

	function renderFromDB(data) {

		$scope.sections.push(data);
		
		// apply data to scope
		$scope.$apply();
		
	}



}]);


