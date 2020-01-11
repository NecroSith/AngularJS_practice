const myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/main.html',
            controller: 'mainController'
        })
        .when('/second', {
            templateUrl: 'pages/second.html',
            controller: 'secondController'
        })
        .when('/second/:num', {
            templateUrl: 'pages/second.html',
            controller: 'secondController'
        })

    $locationProvider.html5Mode(false).hashPrefix('');
});

myApp.service('nameService', function() {
    const self = this;

    this.name = 'nameService active!';

    this.nameLength = function() {
        return self.name.length;
    }
})

myApp.controller('mainController', ["$scope", "$log", "$location", "nameService", function($scope, $log, $location, nameService) {

    $scope.name = 'Yan';
    $scope.shared = nameService.name;

    $scope.people = [{
            name: 'Alex',
            age: 666,
            occupation: 'Medical engineer',
            sex: 'Male'
        },
        {
            name: 'Max',
            age: 23,
            occupation: 'Java developer',
            sex: 'Male'
        },
        {
            name: 'Nastya',
            age: 24,
            occupation: 'Graphical designer',
            sex: 'Female'
        },
        {
            name: 'Fox',
            age: 122,
            occupation: 'Graphical designer',
            sex: 'Trans'
        },
    ]

    $scope.getPersonInfo = function(person) {
        return `${person.name}, ${person.sex}, age ${person.age}, occupation: ${person.occupation}`;
    }

    $scope.$watch('shared', function() {
        nameService.name = $scope.shared;
    })

    $log.info($location.path());
    $log.info('From first controller' + nameService.nameLength());

    $log.main = 'Main';
    $log.log($log);

}]);


myApp.controller('secondController', ["$scope", "$routeParams", "$log", "nameService", function($scope, $routeParams, $log, nameService) {

    $scope.name = $routeParams.num || 'default';

    $scope.$watch('shared', function() {
        nameService.name = $scope.shared;
    })

    $scope.shared = nameService.name;

    $log.second = 'Second';
    $log.log($log);

}]);

myApp.directive('searchResults', function() {
    return {
        restrict: 'AECM',
        templateUrl: 'directives/search-results.html',
        replace: true,
        scope: {
            personObj: '=',
            getPersonInfo: "&"
        },
        compile: function(elem, attrs) {

            //Code inside compile if you want to use something in the entire directive html
            // Pre and post is used if we want to change comething in every instance of a directive
            console.log('Compiling...');
            console.log(elem.html());

            return {

                // Pre link is used to pass through all nested directives inside current one if there are any
                //* It's not recommended to use pre link as it could be dangerous
                pre: function(scope, elem, attrs) {
                    console.log('Pre-compiling...');
                    console.log(elem);

                },

                // Then post link executes and finishes the cycle going back to the directive
                //* Scope is the controller for this particular instance of the directive
                //* elem is the view of the current instance of the directive
                //* So we have model-view pair for every repeated instance of search-results in ng-repeat
                //! It's not dependency injection that is used here
                post: function(scope, elem, attrs) {
                    console.log('Post-compiling...');

                    // we can change the view as we see fit
                    // and use scope for it
                    // scope contains personObj and all its properties for all people
                    if (scope.personObj.name === 'Alex') {
                        elem.removeAttr('class');
                    }
                    console.log(elem);
                }
            }
        }

    }
})