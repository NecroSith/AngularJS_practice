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

myApp.service('nameService', function() { // self points here
    const self = this;

    this.name = 'nameService active!';

    this.nameLength = function() {
        return self.name.length; // self points to the service function on the very top
    }
})

// Custom service uses a standard dependency injection
// and as it's a singleton it shares all content between all affected controllers
myApp.controller('mainController', ["$scope", "$log", "$location", "nameService", function($scope, $log, $location, nameService) {

    $scope.name = 'Yan';
    $scope.shared = nameService.name;

    // to be able to change variable value in custom service we need to define a watcher
    // inside which we assign the value in $scope to the variable in singleton service
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