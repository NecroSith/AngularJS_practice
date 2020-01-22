weatherApp.directive('weatherResults', function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/weather-results.html',
        replace: true,
        scope: {
            city: "@",
            dateFormat: "@", // Just value
            weatherResult: "=", // two way binding
            convertToMmHg: "&" // function
        }
    }
})