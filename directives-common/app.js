const myApp = angular.module('myApp', []);

myApp.controller('mainController', ["$scope", "$filter", function($scope, $filter) {

    $scope.name = "Yan";
    $scope.twitterId = '';
    $scope.twitterIdLowerCase = function() {
        return $filter('lowercase')($scope.twitterId);
    };

    $scope.characters = 2;
}]);