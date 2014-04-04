
var article_prior_0 = [ {title: "some title", content: "some content", prior: "0"}, {title: "some title", content: "some content", prior: "0"}, {title: "some title", content: "some content", prior: "0"}, {title: "some title", content: "some content", prior: "0"}  ]
, 	article_prior_1 = [  {title: "some title", content: "some content", prior: "0"}, {title: "some title", content: "some content", prior: "0"}, {title: "some title", content: "some content", prior: "0"}, {title: "some title", content: "some content", prior: "0"} ]
, 	article_prior_2 = [ {title: "some title", content: "some content", prior: "2"}, {title: "some title", content: "some content", prior: "0"}, {title: "some title", content: "some content", prior: "0"}, {title: "some title", content: "some content", prior: "0"} ]
,	grid_of_articles_prior_0
,	grid_of_articles_prior_1
,	grid_of_articles_prior_2
,	extraGrid;

calculateArticleGrids();

// calculation of grid by article prior
function calculateArticleGrids() {
	grid_of_articles_prior_0 = article_prior_0.length * 8;
	grid_of_articles_prior_1 = article_prior_1.length * 4;
	grid_of_articles_prior_2 = article_prior_2.length * 2;
}

calculateExtraGrid(grid_of_articles_prior_0, grid_of_articles_prior_1, grid_of_articles_prior_2);

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

	if (extraGrid > 8 ) {
		console.log("bigger than 8 it is " + extraGrid);
		var article;

		// check if prior 0 or 1 have some article to move down
		if (article_prior_0.length > 0) {
			article = article_prior_0.splice(0, 1);
		}
		else if (article_prior_1.length > 0) {
			article = article_prior_1.splice(0, 1);
		};

		// push moved article to prior 1
		article_prior_1.push(article);

		// calculate articles grids
		calculateArticleGrids();

		// console log articles grid by prior
		consoleLogGrid()

		// calculate extra grid
		calculateExtraGrid(grid_of_articles_prior_0, grid_of_articles_prior_1, grid_of_articles_prior_2);
	}
	else if (extraGrid == 8 ) {
		console.log("it is " + extraGrid);
		var article;

		// check if prior 0 or 1 have some article to move down
		if (article_prior_0.length > 0) {
			article = article_prior_0.splice(0, 1);
		}
		else if (article_prior_1.length > 0) {
			article = article_prior_1.splice(0, 1);
		};

		// push moved article to prior 1
		article_prior_1.push(article);

		// calculate articles grids
		calculateArticleGrids();

		// console log articles grid by prior
		consoleLogGrid()

		// calculate extra grid
		calculateExtraGrid(grid_of_articles_prior_0, grid_of_articles_prior_1, grid_of_articles_prior_2);
		
	}
	else if (extraGrid < 8 && extraGrid > 4 ) {
		console.log("bigger than 4 smaller than 8 it is " + extraGrid);
		var article;

		// check if prior 0 or 1 have some article to move down
		if (article_prior_0.length > 0) {
			article = article_prior_0.splice(0, 1);
		}
		else if (article_prior_1.length > 0) {
			article = article_prior_1.splice(0, 1);
		};

		// push moved article to prior 2
		article_prior_2.push(article);

		// calculate articles grids
		calculateArticleGrids();

		// console log articles grid by prior
		consoleLogGrid()

		// calculate extra grid
		calculateExtraGrid(grid_of_articles_prior_0, grid_of_articles_prior_1, grid_of_articles_prior_2);
	}
	else if (extraGrid == 4 ) {
		console.log("it is " + extraGrid);
		var article;

		// check if prior 0 or 1 have some article to move down
		if (article_prior_1.length > 0) {
			article = article_prior_1.splice(0, 1);
		}
		else if (article_prior_0.length > 0) {
			article = article_prior_0.splice(0, 1);
		};

		// push moved article to prior 2
		article_prior_2.push(article);

		// calculate articles grids
		calculateArticleGrids();

		// console log articles grid by prior
		consoleLogGrid()

		// calculate extra grid
		calculateExtraGrid(grid_of_articles_prior_0, grid_of_articles_prior_1, grid_of_articles_prior_2);
	}
	else if (extraGrid < 4 && extraGrid > 2 ) {
		console.log("bigger than 2 smaller than 4 it is " + extraGrid);
		var article;

		// check if prior 0 or 1 have some article to move down
		if (article_prior_1.length > 0) {
			article = article_prior_1.splice(0, 1);
		}
		else if (article_prior_0.length > 0) {
			article = article_prior_0.splice(0, 1);
		};

		// push moved article to prior 2
		article_prior_2.push(article);

		// calculate articles grids
		calculateArticleGrids();

		// console log articles grid by prior
		consoleLogGrid()

		// calculate extra grid
		calculateExtraGrid(grid_of_articles_prior_0, grid_of_articles_prior_1, grid_of_articles_prior_2);
	}
	else if (extraGrid == 2 ) {
		console.log("it is " + extraGrid);
		var article;

		// check if prior 0 or 1 have some article to move down
		if (article_prior_1.length > 0) {
			article = article_prior_1.splice(0, 1);
		}
		else if (article_prior_0.length > 0) {
			article = article_prior_0.splice(0, 1);
		}

		// push moved article to prior 2
		article_prior_2.push(article);

		// calculate articles grids
		calculateArticleGrids();

		// console log articles grid by prior
		consoleLogGrid()

		// calculate extra grid
		calculateExtraGrid(grid_of_articles_prior_0, grid_of_articles_prior_1, grid_of_articles_prior_2);
	}
	else {
		console.log("it is " + extraGrid);
		// console log articles grid by prior
		consoleLogGrid()
	}

}

function consoleLogGrid() {
		console.log(grid_of_articles_prior_0);
		console.log(grid_of_articles_prior_1);
		console.log(grid_of_articles_prior_2);
}



