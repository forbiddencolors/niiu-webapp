angular.module('demoWebAppApp')
.controller('ArticlesCtrl',  ['$scope','$location' ,function ($scope, $location) {
	// $scope.articles = [
	// 	{ title: 'Bahn-Schnellstrecke nach Westen ab November wieder offen', content: 'Berlin - Ulrich Homburg und Volker Kefer haben merklich Freude an diesem Termin. Immer neue Worte finden die zwei Bahn-Vorstände für ihre Botschaft, am Dienstagmittag im Bahntower in Berlin-Mitte. „Das volle Angebot, volle Geschwindigkeit.“ – „Sämtliche Verzögerungen aufgehoben.“ – „Der Zugverkehr rollt wieder nach Normalplan.“ – „Leistung in gewohnter Qualität.“</p>' },
	// 	{ title: 'politic', content: 'Berlin - Ulrich Homburg und Volker Kefer haben merklich Freude an diesem Termin. Immer neue Worte finden die zwei Bahn-Vorstände für ihre Botschaft, am Dienstagmittag im Bahntower in Berlin-Mitte. „Das volle Angebot, volle Geschwindigkeit.“ – „Sämtliche Verzögerungen aufgehoben.“ – „Der Zugverkehr rollt wieder nach Normalplan.“ – „Leistung in gewohnter Qualität.“</p>' },
	// 	{ title: 'politic', content: 'Berlin - Ulrich Homburg und Volker Kefer haben merklich Freude an diesem Termin. Immer neue Worte finden die zwei Bahn-Vorstände für ihre Botschaft, am Dienstagmittag im Bahntower in Berlin-Mitte. „Das volle Angebot, volle Geschwindigkeit.“ – „Sämtliche Verzögerungen aufgehoben.“ – „Der Zugverkehr rollt wieder nach Normalplan.“ – „Leistung in gewohnter Qualität.“</p>' },
	// ];
	 $scope.articles = [];

	var getArticleUrl = 'http://dev.niiu.de/articles/get_articles ';
	var DataObject = {
    "api": "content",
    "action": "get",
    "appGuid": "3fc8274c-3ad4-4cc4-b5c6-9eaba0734a3c",
    "apiKey": "7c087be0fc4e6929c0e6a28183ec0dcf8105053f",
    "data": {
        "last3SSync": "2014-02-13 08:17:50",
        "lastContentSync": "2013-10-25 08:13:37",
        "user_id": "1004",
        "version": 102.5,
        "article_ids": [
            {
                "id": 354821
            },
            {
                "id": 354959
            },
            {
                "id": 354964
            },
            {
                "id": 354965
            },
            {
                "id": 354968
            },
            {
                "id": 354970
            },
            {
                "id": 354972
            },
            {
                "id": 354973
            },
            {
                "id": 354974
            },
            {
                "id": 354975
            },
            {
                "id": 354978
            },
            {
                "id": 354985
            },
            {
                "id": 355238
            },
            {
                "id": 355239
            },
            {
                "id": 355243
            },
            {
                "id": 355249
            },
            {
                "id": 355277
            },
            {
                "id": 355294
            },
            {
                "id": 355304
            },
            {
                "id": 355305
            },
            {
                "id": 355307
            },
            {
                "id": 355308
            },
            {
                "id": 355313
            },
            {
                "id": 355395
            },
            {
                "id": 355397
            },
            {
                "id": 355637
            },
            {
                "id": 355653
            }
        ],
        "contentProfile": {
            "id": 1524,
            "localID": 2,
            "isPublic": 1,
            "name": "Default Content Profile",
            "subscribedTo": null,
            "lastUpdated": "2013-10-25 08:13:26",
            "items": [
                {
                    "section": null,
                    "source": null,
                    "subsection": null,
                    "custom_section": "Bayern München"
                },
                {
                    "section": 7,
                    "source": 30,
                    "subsection": null,
                    "custom_section": null
                },
                {
                    "section": 7,
                    "source": 9,
                    "subsection": null,
                    "custom_section": null
                }
            ]
        },
        "forceSync": true
    }
};

	var jsonString = JSON.stringify(DataObject);
	var getArticleData = {data:jsonString};

	$.post(getArticleUrl, getArticleData, function(data){
		if (data) {
				dataResponse = data.data.articles;

				console.log(dataResponse);

				for (var i = dataResponse.length - 1; i >= 0; i--) {
					$scope.articles.push(dataResponse[i])
				};

				$scope.$apply();
				
		}
	}, 'json');





	$scope.enterArticle = function() {
		$location.path( '/article' );
	};
}]);