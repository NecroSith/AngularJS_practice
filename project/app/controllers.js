weatherApp.controller('mainController', ["$scope", "nameService", "$location", function($scope, nameService, $location) {
    $scope.city = nameService.name;

    $scope.$watch('city', function() {
        nameService.name = $scope.city;
    });

    $scope.submit = function() {
        $location.path("/details"); // redirecting to the details page upon submit
    }

}]);

weatherApp.controller('forecastController', ["$scope", "$resource", "nameService", "$routeParams", function($scope, $resource, nameService, $routeParams) {
    $scope.formatCity = function(input) {
        return input.toLowerCase().replace(/(?:^|\s)\S/g, function(val) { return val.toUpperCase() })
    };

    $scope.city = $scope.formatCity(nameService.name);

    $scope.$watch('city', function() {
        nameService.name = $scope.city;
    });

    $scope.days = $routeParams.days;

    $scope.weatherAPI = $resource(nameService.api, {
        get: {
            method: "JSONP" // for browser to not block the request
        }
    });

    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, APPID: nameService.appId });

    $scope.convertToCelcius = function(degK) {
        return Math.round(degK - 273, 4);
    };

    $scope.convertToDate = function(dt) {
        return new Date(dt * 1000);
    };
}]);