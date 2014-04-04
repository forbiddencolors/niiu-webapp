'use strict';

angular.module('demoWebAppApp')
.directive('content', [ "$compile", function ($compile) {
    var prior_0 = '<li class="col-md-12 grid-8"><h3>{{article.title}}</h3><div ng-bind-html="article.content" class="article" ></div><a class="btn btn-default" href="#" role="button" ng-href="/article/{{article._id}}">Read more &raquo;</a></li>';
    var prior_1 = '<li class="col-md-6 grid-4"><h3>{{article.title}}</h3><div ng-bind-html="article.content" class="article" ></div><a class="btn btn-default" href="#" role="button" ng-href="/article/{{article._id}}">Read more &raquo;</a></li>';
    var prior_2 = '<li class="col-md-6 grid-2"><h3>{{article.title}}</h3><div ng-bind-html="article.content" class="article" ></div><a class="btn btn-default" href="#" role="button" ng-href="/article/{{article._id}}">Read more &raquo;</a></li>';

    var getTemplate = function(prior) {
        var template = '';

        if (prior === 1) {

                template = prior_0;
                console.log(template)

            return template
        } else if (prior === 2) {
                template = prior_1;
                console.log(template)
            return template
        } else if (prior === 3) {

                template = prior_2;
                console.log(template)

            return template
        } else {
            return
        };

        // switch(prior) {
        //     case 1:
        //         template = prior_0;
        //         break;
        //     case 2:
        //         template = prior_1;
        //         break;
        //     case 3:
        //         template = prior_2;
        //         break;
        // }

        // return template;
    }

    var linker = function(scope, element, attrs) {
        
        element.html(getTemplate(scope.article.prior)).show();

        $compile(element.contents())(scope);

        // console.log(scope.article.prior);
    }

    return {
        restrict: "E",
        replace: true,
        link: linker,
        scope: {
            article:'='
        }
    };
}]);


// scope.article.prior