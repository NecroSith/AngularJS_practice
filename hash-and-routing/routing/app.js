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

    // This is to set mode for modern browsers to display url with hash
    // without it all url comes with '!' before hash symbol
    $locationProvider.html5Mode(false).hashPrefix('');
})

myApp.controller('mainController', ["$scope", "$log", "$location", function($scope, $log, $location) {

    $scope.name = 'Yan';

    // Output current hash value
    $log.info($location.path());

}]);

// App often has multiple controllers and multiple views (always actually)
// but it's better to store them in separate js files

// $routeParams is a part of ngRoute service and gives access to the route parameters 
myApp.controller('secondController', ["$scope", "$routeParams", function($scope, $routeParams) {

    $scope.name = $routeParams.num || 'default';

}]);