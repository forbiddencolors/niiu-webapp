angular.module('demoWebAppApp')
.controller('SectionsCtrl', ['$scope','$location', function ($scope, $location) {
	
	$scope.sections = [];

	var getArticleUrl = 'http://dev.niiu.de/articles/sync_3s';
	var DataObject = {'api':'3s','action':'sync','appGuid':'3fc8274c-3ad4-4cc4-b5c6-9eaba0734a3c',
	'data':{
			'lastSync':'2013-10-15 13:41:25',
			'sections':[1,2,3,5,6,7,8,9,10],
			'sources':[8,9,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50],
			'subsections':[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
			'sections_subsections':[271,273,274,296,297,298,299,300,301,302,303,304],
			'sources_sections':[960,1102,1498,1536,1547,1548,1550,1553,1645,1649,1664,1667,1681,1748,1750],
			'sources_subsections':[62,63,129,140,141,174,176,178,182,184,193,194,195,202,203,204]
		}
	};
	var jsonString = JSON.stringify(DataObject);
	var getArticleData = {data:jsonString};

	$.post(getArticleUrl, getArticleData, function(data){
		if (data) {
			var dataResponse = data.data.newSections;

			for (var i = dataResponse.length - 1; i >= 0; i--) {
				$scope.sections.push(dataResponse[i]);
			}

			$scope.$apply();

		}
	}, 'json');



	$scope.enterSection = function() {
		$location.path( '/articles' );
	};
}]);


