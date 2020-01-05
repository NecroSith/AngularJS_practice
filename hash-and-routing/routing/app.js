const myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/main.html',
            controller: 'mainController'
        })
        .when('/second', {
            templateUrl: 'pages/second.html',
            controller: 'secondController'
        })
})

myApp.controller('mainController', ["$scope", "$log", "$location", function($scope, $log, $location) {

    $scope.name = 'Yan';

    // Output current hash value
    $log.info($location.path());

}]);

// App often has multiple controllers and multiple views (always actually)
// but it's better to store them in separate js files
myApp.controller('secondController', ["$scope", "$log", "$location", function($scope, $log, $location) {

    $scope.name = 'Ivan';

}]);