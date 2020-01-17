weatherApp.directive('weatherResults', function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/weather-results.html',
        replace: true,
        scope: {
            city: "@",
            weatherDate: "&",
            dateFormat: "@",
            temp: "&",
            feelsLike: "&",
            weatherResult: "="
        }
    }
})