const myApp = angular.module('myApp', []);

myApp.controller('mainController', ["$scope", "$filter", "$http", function($scope, $filter, $http) {

    $scope.name = "Yan";
    $scope.twitterId = '';
    $scope.twitterIdLowerCase = function() {
        return $filter('lowercase')($scope.twitterId);
    };

    $scope.characters = 2;
    $scope.newRule = '';

    $scope.addNewRule = function() {
        $http({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                url: 'http://127.0.0.1:5500/http-requests/http-directive/api/',
                data: {
                    rulename: $scope.newRule
                }
            })
            .then(function(response) {
                $scope.rules = response.data;
                $scope.newRule = '';
            }, function(err) {
                console.log(err);
            });
    }

    //! Valid until AngularJS v1.4.3
    // $http.get('http://127.0.0.1:5500/http-requests/http-directive/api/data.json')
    //     .success(function(data) {
    //         // As it is a part of angular context there is no need for $apply here
    //         $scope.rules = data;
    //     })
    //     .error(function(data, status) {
    //         console.error('Error ' + status + ': ' + data)
    //     });

    //! From AngularJS v1.4.3 and up one should use this syntax
    $http({
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            url: 'http://127.0.0.1:5500/http-requests/http-directive/api/data.json',
        })
        .then(function(response) {
            $scope.rules = response.data;
        }),
        function(errorResponse) {
            console.log(errorResponse);
        }
}]);