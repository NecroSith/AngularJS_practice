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

    $scope.person = {
        name: 'Alex',
        age: 666
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
            // here we created so called isolated scope
            // so our search-results.html became the view and this is its controller
            // all directive share their parents' scope so it can work without isolating scope
            // but it's potentially dangerous as any directive can change the scope from anywhere
            personName: "@",
            //* here we told directive to expect person-name attribute as we transfer data through it
            //* @ sign means we transfer only text
            personAge: "@"
        }
    }
})