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
})

weatherApp.controller('mainController', ["$scope", function($scope) {
    console.log('main!');

}]);

weatherApp.controller('forecastController', ["$scope", function($scope) {
    console.log('forecast!');

}])