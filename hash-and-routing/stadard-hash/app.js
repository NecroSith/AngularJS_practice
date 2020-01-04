const myApp = angular.module('myApp', []);

myApp.controller('mainController', ["$scope", function($scope) {

    $scope.name = 'Yan';
}]);

window.addEventListener('hashchange', function() {
    console.log('Hash changed! ' + window.location.hash);

    // This is basically how Single Page Aplications work
    // They mimicks normal url addresses with hash strings
    // and display specific content or a specific page depending on current hash value
    // Thus the whole app needs to load html data only once
    if (window.location.hash == '#bookmark') {
        console.log('Page 1');
    }

    if (window.location.hash == '#bookmark2') {
        console.log('Page 2');
    }
})