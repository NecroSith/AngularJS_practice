// Second argument is the list of dependencies
const myApp = angular.module('myApp', ['ngMessages', 'ngResource']);

// Controller defines a place to put the code associated with the module

// we can pass an array as the second argument.
// The last argument in this array is the function that defines the controller behavoir
// other arguments are strings with the names of used angular methods
// this is useful when minifying the file
// without these strings with names angular won't be able to determine where to get these methods from when the file is minified, because the names are different from ones angular expects, therefore no dependency injection
// with the arguments preset angular can determine what methods are used in the controller function by checking first arguments in the array and using dependecny injection
//! Order of the first arguments matters because angularjs dependency injector will look into them and insert according objects into the function in the order of appearance in the arguments list
//! If we don't use this method and list all angular methods right in the controller function - the order in this case doesn't matter
myApp.controller('mainController', ["$scope", "$log", "$filter", "$resource", function($scope, $log, $filter, $resource) {


    // Scope is a middlething between the view and controller
    // we can add properties to it (from vars to functions, basically everything) and view will have access to them too
    // but only inside this controller (mainController in this case)
    $scope.name = 'Yan';
    $scope.getName = function() {
        // we can use $log methods as safer alternative of console.log
        $log.info($scope.name);
    }
    $log.info($scope);
    $log.info($resource);

    $scope.filteredName = $filter('uppercase')($scope.name);

    $log.info($scope.filteredName);





}]);


const searchPerson = function($scope, lastname) {
    console.log('Yan Pustynnyy');
}

// when we log a function like this
console.log(searchPerson);

// we get a function body as a string
// which we can parse and determine what argument it has
// so we can inject something there
// That's what angularjs does
// it injects $scope object into the function so we can access it
console.log(angular.injector().annotate(searchPerson));