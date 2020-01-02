const myApp = angular.module('myApp', []);

myApp.controller('mainController', ["$scope", "$filter", "$timeout", function($scope, $filter, $timeout) {

    $scope.name = "Yan";
    $scope.twitterId = '';
    $scope.twitterIdLowerCase = function() {
        return $filter('lowercase')($scope.twitterId);
    };

    // This is manual representation of what's happening when we bind input in the view with twitterid variable in the controller
    // when we define ng-model watcher is created and added to angular watchlist
    // The watcher will, well, watch for this variable and all changes happening with it anywhere in the DOM
    // if something has changed watcher change the old variable value with the new one
    // This is called a digest loop and it's similar to Event Loop in vanilla javascript
    $scope.$watch('twitterId', function(newValue, oldValue) {
        console.info('Changed!');
        console.log('Old: ' + oldValue);
        console.log('New: ' + newValue);
    });

    // This function won't work
    // Log will be displayed but the scope variable will not
    // Because this change is outside angular context and is not included in watchlist since no watcher created
    // therefore this change is aside any digest loop as well
    setTimeout(function() {
        $scope.name = 'DAZZZZ';
        console.log('Scope changed!');
    }, 3000);

    // This can be solved by manually applying the necessary function(s) to the angular context
    // by isung $apply we tell angular to keep track of what's going on here and create a digest loop for this function
    setTimeout(function() {
        //! $apply will be watching for all the changes made in $scope until this moment so $scope.name on line 27 will be also changed when $apply is executed
        //! to nullify this we can set timeout with $apply less than one with $scope.name, lets say 2000. Then $scope.name won't be watched by $apply and not be affected
        $scope.$apply(function() {
            $scope.twitterId = 'DAZZZZ';
            console.log('Scope changed!');
        });
    }, 2000);

    // Another solution is to use $timeout as it's already wrapped in $apply and is part of angular context
    //* $timeout will NOT be watching for changes in the whole $scope unlike $apply
    //* so even $scope.name was changed earlier, it will not be affected because $timeout put ib digest loop only the changes inside $timeout directive
    $timeout(function() {
        $scope.name = 'human';
        console.log('Scope changed!');
    }, 5000);
}]);