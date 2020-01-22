weatherApp.controller('mainController', ["$scope", "nameService", "$location", function($scope, nameService, $location) {
    $scope.city = nameService.name;

    $scope.$watch('city', function() {
        nameService.name = $scope.city;
    });

    $scope.submit = function() {
        $location.path("/details"); // redirecting to the details page upon submit
    }

}]);

weatherApp.controller('forecastController', ["$scope", "nameService", "$routeParams", "weatherService", function($scope, nameService, $routeParams, weatherService) {
    $scope.formatCity = function(input) {
        return input.toLowerCase().replace(/(?:^|\s)\S/g, function(val) { return val.toUpperCase() })
    };

    $scope.city = $scope.formatCity(nameService.name);

    $scope.$watch('city', function() {
        nameService.name = $scope.city;
    });

    $scope.days = $routeParams.days;
    $scope.weatherResult = weatherService.getWeather($scope.city);


    $scope.convertToMmHg = function(day) {
        return Math.round(day.pres / 1.33322387415);
    };

    $scope.convertToDate = function(dt) {
        return new Date(dt * 1000);
    };
}]);