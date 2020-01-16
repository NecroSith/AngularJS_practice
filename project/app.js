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
        })
        .when('/details/:days', {
            templateUrl: './pages/details.html',
            controller: 'forecastController'
        })

    $locationProvider.html5Mode(false).hashPrefix('');
});

weatherApp.service('nameService', function() {
    this.name = '';

    this.api = "http://api.openweathermap.org/data/2.5/weather?";
    this.appId = "ee402bb9e02561ade4fa74681127a056";
});


weatherApp.controller('mainController', ["$scope", "nameService", function($scope, nameService) {
    $scope.city = nameService.name;

    $scope.$watch('city', function() {
        nameService.name = $scope.city;
    });

}]);

weatherApp.controller('forecastController', ["$scope", "$resource", "nameService", "$routeParams", function($scope, $resource, nameService, $routeParams) {
    $scope.city = nameService.name;

    $scope.$watch('city', function() {
        nameService.name = $scope.city;
    });

    $scope.days = $routeParams.days;

    $scope.weatherAPI = $resource(nameService.api, {
        get: {
            method: "JSONP" // for browser to not block the request
        }
    });

    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, APPID: nameService.appId });

    $scope.convertToCelcius = function(degK) {
        return Math.round(degK - 273, 4);
    }

    $scope.convertToDate = function(dt) {
        return new Date(dt * 1000);
    }
}]);