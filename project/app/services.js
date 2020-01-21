weatherApp.service('nameService', function() {
    this.name = 'Severodvinsk';
});


weatherApp.service('weatherService', ["$resource", "$routeParams", function($resource, $routeParams) {
    this.api = "http://api.weatherbit.io/v2.0/forecast/daily?";
    this.appId = "e1dc1fb1392d41589351954694c7c655";

    this.getWeather = function(city) {
        weatherAPI = $resource(this.api, {
            get: {
                method: "JSONP" // for browser to not block the request
            }
        });

        return weatherAPI.get({ city: city, key: this.appId, days: $routeParams.days });
    }
}])