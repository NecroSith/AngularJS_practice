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
        // Transclude is putting a copy of a document inside another document
        // In this case transclude means putting some element inside another element
        // By default in AngularJS this option is false
        transclude: true
    }
})