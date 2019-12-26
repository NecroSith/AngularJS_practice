// Second argument is the list of dependencies
const myApp = angular.module('myApp', []);

// Controller defines a place to put the code associated with the module
myApp.controller('mainController', function($scope) {


    // Scope is a middlething between the view and controller
    // we can add properties to it (from vars to functions, basically everything) and view will have access to them too
    // but only inside this controller (mainController in this case)
    $scope.name = 'Yan';
    $scope.getName = function() {
        console.log($scope.name);
    }
    console.log($scope);

});