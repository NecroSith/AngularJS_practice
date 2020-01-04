const myApp = angular.module('myApp', []);

myApp.controller('mainController', ["$scope", "$filter", function($scope, $filter) {

    $scope.name = "Yan";
    $scope.twitterId = '';
    $scope.twitterIdLowerCase = function() {
        return $filter('lowercase')($scope.twitterId);
    };

    $scope.characters = 2;

    // This is how requests are handled via standard XMLHTTPRequest in vanilla JS
    //* The following code doesn't work since no api present
    const requestobject = new XMLHttpRequest();
    requestobject.onreadystatechange = function() {
        $scope.$apply(function() {
            // readystate == 4 means request is ready
            // 200 status is ok
            if (requestobject.readyState == 4 && requestobject.status == 200) {
                $scope.rules = JSON.parse(requestobject.responseText);
            }
        });
    }

    requestobject.open('GET', 'http://localhost:3001/api', true);
    requestobject.send();

    // ------- end of code that doesn't work ----------

    $scope.alertClick = function() {
        alert('Clicked!');
    }
}]);