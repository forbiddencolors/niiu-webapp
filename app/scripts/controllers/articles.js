angular.module('demoWebAppApp')
.controller('ArticlesCtrl',  ['$scope','$location','$http', function ($scope, $location, $http) {

	$scope.articles = [];


	  $scope.items = [];
  
  $scope.push = function() {
    $scope.items.push("banane");
  };
  
  $scope.pop = function() {
    $scope.items.pop(2);
  };


	// open pouch db section
	var db = new ydn.db.Storage('ydn-ArticlesTest12');
	// remote controle with couchDB false
	var getArticleUrl = 'http://kirkthedev.com/niiu/double_proxy_x.php?url=http://dev.niiu.de/articles/get_articles';


	db.values('articles').done(function(articles) {
		var articlesLength = articles.length;
		if (articlesLength >= 1) {
			console.log('existing');
			renderFromDB();
			// updateDataSettings();
		} else {
			console.log('not existing');
			initialDataSettings();
		}
	});

	// first time app is turned on and we do not have nothing in local DB *********************
	function initialDataSettings() {
		var DataObject = {
			"api": "content",
			"action": "get",
			"appGuid": "3fc8274c-3ad4-4cc4-b5c6-9eaba0734a3c",
			"apiKey": "7c087be0fc4e6929c0e6a28183ec0dcf8105053f",
			"data": {
				"last3SSync": "2014-03-30 09:17:50",
				"lastContentSync": "2013-02-18 08:13:37",
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
					"lastUpdated": "2013-02-18 08:13:26",
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

		$.post(getArticleUrl, getArticleData, function(response) {
			if (response) {
				
				var data = response.contents.data.articles;
				$scope.articles = data;

				$scope.$apply();
				// call function add to database and add data to local DB
				addSection(data);
					
			}
				
		}, 'json');

		
	}

		// add section in bulk function
	function addSection(dataResponse) {
		//console.log(dataResponse)


		for (var i = dataResponse.length - 1; i >= 0; i--) {
			var objectData = {
				_id: dataResponse[i].id,
				content: dataResponse[i].content,
				published_date: dataResponse[i].published_date,
				section_id: dataResponse[i].sections.section_id,
				title: dataResponse[i].title,
				web_link: dataResponse[i].web_link,
				prior: i%3+1
			};

			

			db.put({name: 'articles', keyPath: '_id'}, objectData);
			// db.put('articles', objectData, objectData._id );

		};

		
	}


	// rendering starting here *****************************************************************
	
	function renderFromDB() {

		db.values('articles').done(function(data) {
		   sortArticles(data);
		});

	}

	var articlesSorted = [ [], [], [] ];

	function sortArticles(articles) {
	    for ( i in articles ) {
			articlesSorted[ articles[i].prior - 1 ].push(articles[i]);
		}

		// call sorting article to fit page
		calculateArticleGrids();
		calculateExtraGrid(grid_of_articles_prior_0, grid_of_articles_prior_1, grid_of_articles_prior_2);

	}


	// Sorting articles to fit on page **********************************************************
	var article_prior_0 = articlesSorted[0]
	, 	article_prior_1 = articlesSorted[1]
	, 	article_prior_2 = articlesSorted[2]
	,	grid_of_articles_prior_0
	,	grid_of_articles_prior_1
	,	grid_of_articles_prior_2
	,	extraGrid;




	// calculation of grid by article prior
	function calculateArticleGrids() {
		grid_of_articles_prior_0 = article_prior_0.length * 8;
		grid_of_articles_prior_1 = article_prior_1.length * 4;
		grid_of_articles_prior_2 = article_prior_2.length * 2;
	}



	// calculating extra grid 
	function calculateExtraGrid(grid_of_articles_prior_0, grid_of_articles_prior_1, grid_of_articles_prior_2) {
		var grid = grid_of_articles_prior_0 + grid_of_articles_prior_1 + grid_of_articles_prior_2
		,	pgrid = 16
		,	pages = grid / pgrid | 0
		;

		extraGrid = grid - (pages * pgrid);
		recalculatePriority(extraGrid);
	}

	// recalculating article prior to fit in page
	function recalculatePriority(extraGrid) {
		// console.log("kita" + extraGrid)

		if (extraGrid > 8 ) {
			// console.log("bigger than 8 it is " + extraGrid);
			var article;

			// check if prior 0 or 1 have some article to move down
			if (article_prior_0.length > 0) {
				article = article_prior_0.splice(0, 1);

				// push moved article to prior 2
				article = article[0]
				article['prior'] = 2
				article_prior_1.push(article);
			}
			else if (article_prior_1.length > 0) {
				article = article_prior_1.splice(0, 1);
				// push moved article to prior 3
				article = article[0]
				article['prior'] = 3
				article_prior_2.push(article);
			};

			// calculate articles grids
			calculateArticleGrids();

			// console log articles grid by prior
			consoleLogGrid()

			// calculate extra grid
			calculateExtraGrid(grid_of_articles_prior_0, grid_of_articles_prior_1, grid_of_articles_prior_2);
		}
		else if (extraGrid == 8 ) {
			// console.log("it is " + extraGrid);
			var article;

			// check if prior 0 or 1 have some article to move down
			if (article_prior_0.length > 0) {
				article = article_prior_0.splice(0, 1);

				// push moved article to prior 2
				article = article[0]
				article['prior'] = 2
				article_prior_1.push(article);
			}
			else if (article_prior_1.length > 0) {
				article = article_prior_1.splice(0, 1);

				// push moved article to prior 3
				article = article[0]
				article['prior'] = 3
				article_prior_2.push(article);
			};

			

			// calculate articles grids
			calculateArticleGrids();

			// console log articles grid by prior
			consoleLogGrid()

			// calculate extra grid
			calculateExtraGrid(grid_of_articles_prior_0, grid_of_articles_prior_1, grid_of_articles_prior_2);
			
		}
		else if (extraGrid < 8 && extraGrid > 4 ) {
			// console.log("bigger than 4 smaller than 8 it is " + extraGrid);
			var article;

			// check if prior 0 or 1 have some article to move down
			if (article_prior_0.length > 0) {
				article = article_prior_0.splice(0, 1);

				// push moved article to prior 2
				article = article[0]
				article['prior'] = 2
				article_prior_1.push(article);
			}
			else if (article_prior_1.length > 0) {
				article = article_prior_1.splice(0, 1);

				// push moved article to prior 3
				article = article[0]
				article['prior'] = 3
				article_prior_2.push(article);
			};

			

			// calculate articles grids
			calculateArticleGrids();

			// console log articles grid by prior
			consoleLogGrid()

			// calculate extra grid
			calculateExtraGrid(grid_of_articles_prior_0, grid_of_articles_prior_1, grid_of_articles_prior_2);
		}
		else if (extraGrid == 4 ) {
			// console.log("it is " + extraGrid);
			var article;

			// check if prior 0 or 1 have some article to move down
			if (article_prior_1.length > 0) {
				article = article_prior_1.splice(0, 1);

				// push moved article to prior 3
				article = article[0]
				article['prior'] = 3
				article_prior_2.push(article);
			}
			else if (article_prior_0.length > 0) {
				article = article_prior_0.splice(0, 1);

				// push moved article to prior 2
				article = article[0]
				article['prior'] = 2
				article_prior_1.push(article);
			};

			

			// calculate articles grids
			calculateArticleGrids();

			// console log articles grid by prior
			consoleLogGrid()

			// calculate extra grid
			calculateExtraGrid(grid_of_articles_prior_0, grid_of_articles_prior_1, grid_of_articles_prior_2);
		}
		else if (extraGrid < 4 && extraGrid > 2 ) {
			// console.log("bigger than 2 smaller than 4 it is " + extraGrid);
			var article;

			// check if prior 0 or 1 have some article to move down
			if (article_prior_1.length > 0) {
				article = article_prior_1.splice(0, 1);

				// push moved article to prior 2
				article = article[0]
				article['prior'] = 3
				article_prior_2.push(article);
			}
			else if (article_prior_0.length > 0) {
				article = article_prior_0.splice(0, 1);

				// push moved article to prior 2
				article = article[0]
				article['prior'] = 2
				article_prior_1.push(article);
			};

			

			// calculate articles grids
			calculateArticleGrids();

			// console log articles grid by prior
			consoleLogGrid()

			// calculate extra grid
			calculateExtraGrid(grid_of_articles_prior_0, grid_of_articles_prior_1, grid_of_articles_prior_2);
		}
		else if (extraGrid == 2 ) {
			// console.log("it is " + extraGrid);
			var article;

			// check if prior 0 or 1 have some article to move down
			if (article_prior_1.length > 0) {
				article = article_prior_1.splice(0, 1);
				// push moved article to prior 2
				article = article[0]
				article['prior'] = 3
				article_prior_2.push(article);
			}
			else if (article_prior_0.length > 0) {
				article = article_prior_0.splice(0, 1);

				// push moved article to prior 2
				article = article[0]
				article['prior'] = 2
				article_prior_1.push(article);
			}

			// calculate articles grids
			calculateArticleGrids();

			// console log articles grid by prior
			consoleLogGrid()

			// calculate extra grid
			calculateExtraGrid(grid_of_articles_prior_0, grid_of_articles_prior_1, grid_of_articles_prior_2);
		}
		else {
			// console.log("it is " + extraGrid);
			// console log articles grid by prior
			consoleLogGrid()
			// var art_0,
			// 	art_1;
			var	articlesForPage = []; 

			// if (article_prior_0.length > 0) {
			// 	art_0 = article_prior_0[1]
			// 	articlesForPage.push(art_0);
			// };
			// if (article_prior_1.length > 0) {
			// 	art_1 = article_prior_1[1];
			// 	art_2 = article_prior_1[2];
			// 	articlesForPage.push(art_1, art_2);
			// }


			PageArticles(article_prior_0, article_prior_1, article_prior_2);

			

			// console.log(article_prior_0);
			// console.log(article_prior_1);
			// console.log(article_prior_2);
		}

	}

	function consoleLogGrid() {
			// console.log(grid_of_articles_prior_0);
			// console.log(grid_of_articles_prior_1);
			// console.log(grid_of_articles_prior_2);
	}

	// making pare of articles that will be sand to scope and rendered
	function PageArticles(article_prior_0, article_prior_1, article_prior_2) {
		

		var num_art_0 = article_prior_0.length;
		var num_art_1 = article_prior_0.length;
		var num_art_2 = article_prior_0.length;

		var maxArticles,
		articlesForPage = [];

		// find array with biggest number of article and retur that number
		if (num_art_0 > num_art_1) {
			if (num_art_0 > num_art_2) {
				maxArticles = num_art_0;	
			} else {
				maxArticles = num_art_2;	
			}
		} else {
			if (num_art_1 > num_art_2) {
				maxArticles = num_art_1;	
			} else {
				maxArticles = num_art_2;	
			}
		}

		var points_0 = 0;
		var points_1 = 0;
		var points_2 = 0;
		var sum_points = 0;


		// Ordering articles in one array for rendering
		for (var i = 0; i <= maxArticles; i++) {
			// console.log(i) 

			// put article with priority 0 in array
			if (article_prior_0.length > 0) {
				// console.log("article prior 0  pushed") 

				var art_0 = article_prior_0.splice(0,1);

				articlesForPage = articlesForPage.concat(art_0);

				points_0 = points_0 + 8;
				sum_points = points_0 + points_1 + points_2;
			};

			// put 2 articles with priority 1 in array
			if (article_prior_1.length >= 2) {
				// console.log("article prior 1  pushed 2 time")

				var art_1 = article_prior_1.splice(0,2);

				articlesForPage = articlesForPage.concat(art_1);

				points_1 = points_1 + 8;
				sum_points = points_0 + points_1 + points_2;
			};

			// put 1 articles with priority 1 in array if it is just one article with this priority and only if cak of points i biger or equal 8
			if (article_prior_1.length === 1  ) {

				var extra_points = sum_points % 16;

				if (extra_points >= 8) {

					// console.log("lack of points" + extra_points)

					// console.log("article prior 1  pushed 1 time")

					var	art_1 = article_prior_1.splice(0,1);

					articlesForPage = articlesForPage.concat(art_1);

					points_1 = points_1 + 4;
					sum_points = points_0 + points_1 + points_2;
				};
				
			};

			// deal with article prioity 2
			if ((sum_points % 16) !== 0 ) {
				// console.log("test" + (sum_points % 16))

				var extra_points = sum_points % 16;

				var num_of_items_needed = (16 - extra_points) / 2;
				
				// console.log("article prior 2  pushed "+ num_of_items_needed +" time")

				art_2 = article_prior_2.splice(0,num_of_items_needed);

				articlesForPage = articlesForPage.concat(art_2);

				points_2 = points_2 + (num_of_items_needed * 2)
				sum_points = points_0 + points_1 + points_2;
				
			};
		};

		var RenderThisArticle = articlesForPage

		var count = 0;
		var old = 0;
		var grid = 1;
		var articles = [];
		var firstTime = true;
		var ready_to_render = false;
		var haveArticles = true;


		$scope.GetOldArticles = function() {


			if (!haveArticles) {
				alert("No more articles")
				
			} else {
				$scope.articles.splice(0, count)
				console.log("old articles")
				$scope.old_article_engine();
			}


			//  this part not sure, need to move forward but will come back
			if (0 == count) {
				haveArticles = false;
			}

		}
		
		$scope.GetNewArticles = function() {

			var stop = RenderThisArticle.length - count;

			if (!haveArticles) {
				alert("No more articles")
				
			} else {
				$scope.articles.splice(0, count)
				// console.log("new articles")
				$scope.new_article_engine();
			}


			//  this part not sure, need to move forward but will come back
			if (stop == 2) {
				haveArticles = false;
			}
			
		}
		
		$scope.new_article_engine = function() {
			
			// console.log(RenderThisArticle)

			for (var i = count; i <= RenderThisArticle.length - 1; i++) {
				// console.log("grid " + (grid % 16)  )


				if (grid % 16 === 0 ) {
					// console.log(articles)
					$scope.articles = articles;
					grid = 1;
					count = i ++ 
					firstTime = true;

					return
				}


				if (firstTime) {
					grid = grid - 1; 
					firstTime = false
				};

				var art = RenderThisArticle[i];

				var prior = art.prior

				if (prior == 1) {
					// console.log(art)

					articles.push(art);
					grid = 8 + grid
				} else if (prior == 2) {
					// console.log(art)
					articles.push(art);
					grid = 4 + grid
				} else if (prior == 3) {
					// console.log(art)
					articles.push(art);
					grid = 2 + grid
				} else {
					console.log("no priority");
				}
				

			};

			// console.log(articles)

		}

		var second_time = 0;
		var index_of_last_art = 0;

		$scope.old_article_engine = function() {

			for (var i = count; i > 0; --i) {
				console.log("iteracija broj " + i)
				if (grid % 16 === 0 && second_time === 0  ) {
					second_time = second_time++

					console.log("ovaj kurac mora svijetlit" + index_of_last_art);

					second_time = 1
					index_of_last_art = i;

					firstTime = true;
					grid = 1;

				}
				
				console.log("first time je: " + firstTime );
				console.log("dali moze uci prvi argument mora biti o: " + (grid % 16));
				console.log("drugi argument dali ulazi second time mora biti 1" + second_time)

				if (grid % 16 === 0 && second_time == 1 || i == 1) {

					console.log("start " + index_of_last_art)
					console.log("end " + i)
					
					articles = RenderThisArticle.slice( i , index_of_last_art)
					console.log(articles)
					$scope.articles = articles;
					grid = 1;
					count = i ++ 
					firstTime = true;

					return
				};


				if (firstTime) {
					grid = grid - 1; 
					firstTime = false
				};

				var art = RenderThisArticle[i];

				var prior = art.prior

				if (prior == 1) {
					grid = 8 + grid
				} else if (prior == 2) {
					grid = 4 + grid
				} else if (prior == 3) {
					grid = 2 + grid
				} else {
					console.log("no priority");
				}


			};
			
		}




	}



}]);
























