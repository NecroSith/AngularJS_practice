const myApp = angular.module('myApp', ['ngRoute']);


myApp.controller('mainController', ["$scope", function($scope) {

    $scope.parent1vm = {};
    $scope.parent1vm.message = "Main controller in the object!";
    $scope.message = "Main controller!";

    this.message = "This message";
}]);


myApp.controller('secondController', ["$scope", function($scope) {

    $scope.message = "Second controller!";

}]);

myApp.controller('thirdController', ["$scope", function($scope) {

    $scope.message = "Third controller!";

}]);