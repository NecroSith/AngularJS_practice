const weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

weatherApp.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: './pages/main.html',
            controller: 'mainController'
        })
        .when('/details', {
            templateUrl: './pages/details.html',
            controller: 'forecastController'
        });

    $locationProvider.html5Mode(false).hashPrefix('');
});

weatherApp.service('nameService', function() {
    this.name = '';
});


weatherApp.controller('mainController', ["$scope", "nameService", function($scope, nameService) {
    $scope.city = nameService.name;

    $scope.$watch('city', function() {
        nameService.name = $scope.city;
    });

}]);

weatherApp.controller('forecastController', ["$scope", "nameService", function($scope, nameService) {
    $scope.city = nameService.name;

    $scope.$watch('city', function() {
        nameService.name = $scope.city;
    });
}]);