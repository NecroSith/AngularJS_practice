weatherApp.controller('mainController', ["$scope", "nameService", function($scope, nameService) {
    $scope.city = nameService.name;

    $scope.$watch('city', function() {
        nameService.name = $scope.city;
    });

}]);

weatherApp.controller('forecastController', ["$scope", "$resource", "nameService", "$routeParams", function($scope, $resource, nameService, $routeParams) {
    $scope.city = nameService.name;

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
    }

    $scope.convertToDate = function(dt) {
        return new Date(dt * 1000);
    }
}]);