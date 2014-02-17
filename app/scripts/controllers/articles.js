angular.module('demoWebAppApp')
.controller('ArticlesCtrl',  ['$scope','$location', function ($scope, $location) {

    // open pouch db section
    var db = PouchDB('Articles11.3');
    // remote controle with couchDB false
    var remoteCouch = false,
        getArticleUrl = 'http://dev.niiu.de/articles/get_articles';

    db.info(function(err, info) { 
        Doc_count = info.doc_count;

        // check if have data in DB or make fresh load of data
        if (Doc_count < 1) {
            initialDataSettings();
        } else {
            renderFromDB();
        }
    });



	$scope.articles = [];


    function renderFromDB() {

        db.allDocs({include_docs: true}, function(err, response) { 

            var databaseResponse = response.rows;

            var articles = [];

            for (var i = databaseResponse.length - 1; i >= 0; i--) {
                
                articles.push(databaseResponse[i].doc);

            };
            $scope.articles = articles;
            
            // apply data to scope
            $scope.$apply();
            
        });
        
    }
    

        
    function initialDataSettings() {
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

        getData(DataObject);
	   
    }
    
    function getData(DataObject) {

        var jsonString = JSON.stringify(DataObject);
        var getArticleData = {data:jsonString};

     
        $.post(getArticleUrl, getArticleData, function(data){

            if (data) {

                    dataResponse = data.data.articles;

                    for (var i = dataResponse.length - 1; i >= 0; i--) {
                        $scope.articles.push(dataResponse[i])
                    };

                    $scope.$apply();

                    // call function add to database and add data to local DB
                    addSection(dataResponse);
                    
            }
        }, 'json');
    }

	
    // add section in bulk function
    function addSection(dataResponse) {
            console.log(dataResponse)

        var data = [];
        var serverArticleNum = dataResponse.length;
        var NumOfArticleInArrey = 0;

        for (var i = dataResponse.length - 1; i >= 0; i--) {
            objectData = {
              _id: dataResponse[i].id,
              content: dataResponse[i].content,
              published_date: dataResponse[i].published_date,
              section_id: dataResponse[i].sections.section_id,
              title: dataResponse[i].title,
              web_link: dataResponse[i].web_link
            };
            
            NumOfArticleInArrey++

            data.push(objectData);

            console.log(serverArticleNum);
            console.log(NumOfArticleInArrey);

        };

        if (NumOfArticleInArrey == serverArticleNum) {
            console.log(data);
            db.bulkDocs({docs: data}, function(err, response) { });
        }

    }

}]);