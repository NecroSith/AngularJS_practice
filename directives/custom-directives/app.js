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
        restrict: 'AECM', // we tell angular to look for Element approach only
        // it will ignore Attribute approach altogether
        // E for element, A for attribute, C for class, M for comment
        // they can be combined, by default it is EA
        template: '<a href="#" class="list-group-item list-group-item-action"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">List group item heading</h5><small>3 days ago</small></div><p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p><small>Donec id elit non mi porta.</small></a>',
        replace: true // default is false. If false, the whole template block will be wrapped in HTML inside <search-results> tag. If true this tag is hidden
    }
})