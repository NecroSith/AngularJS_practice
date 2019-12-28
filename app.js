// Second argument is the list of dependencies
const myApp = angular.module('myApp', ['ngMessages']);

// Controller defines a place to put the code associated with the module
myApp.controller('mainController', function($scope, $log, $filter) {


    // Scope is a middlething between the view and controller
    // we can add properties to it (from vars to functions, basically everything) and view will have access to them too
    // but only inside this controller (mainController in this case)
    $scope.name = 'Yan';
    $scope.getName = function() {
        // we can use $log methods as safer alternative of console.log
        $log.info($scope.name);
    }
    $log.info($scope);

    $scope.filteredName = $filter('uppercase')($scope.name);

    $log.info($scope.filteredName);





});


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