angular.module('demoWebAppApp')
.controller('ArticlesCtrl',  ['$scope','$location' ,function ($scope, $location) {
	$scope.articles = [
		{ title: 'Bahn-Schnellstrecke nach Westen ab November wieder offen', content: 'Berlin - Ulrich Homburg und Volker Kefer haben merklich Freude an diesem Termin. Immer neue Worte finden die zwei Bahn-Vorstände für ihre Botschaft, am Dienstagmittag im Bahntower in Berlin-Mitte. „Das volle Angebot, volle Geschwindigkeit.“ – „Sämtliche Verzögerungen aufgehoben.“ – „Der Zugverkehr rollt wieder nach Normalplan.“ – „Leistung in gewohnter Qualität.“</p>' },
		{ title: 'politic', content: 'Berlin - Ulrich Homburg und Volker Kefer haben merklich Freude an diesem Termin. Immer neue Worte finden die zwei Bahn-Vorstände für ihre Botschaft, am Dienstagmittag im Bahntower in Berlin-Mitte. „Das volle Angebot, volle Geschwindigkeit.“ – „Sämtliche Verzögerungen aufgehoben.“ – „Der Zugverkehr rollt wieder nach Normalplan.“ – „Leistung in gewohnter Qualität.“</p>' },
		{ title: 'politic', content: 'Berlin - Ulrich Homburg und Volker Kefer haben merklich Freude an diesem Termin. Immer neue Worte finden die zwei Bahn-Vorstände für ihre Botschaft, am Dienstagmittag im Bahntower in Berlin-Mitte. „Das volle Angebot, volle Geschwindigkeit.“ – „Sämtliche Verzögerungen aufgehoben.“ – „Der Zugverkehr rollt wieder nach Normalplan.“ – „Leistung in gewohnter Qualität.“</p>' },
	];
	$scope.enterArticle = function() {
		$location.path( '/article' );
	};
}]);