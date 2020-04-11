weatherApp.service('nameService', function() {
    this.name = 'Severodvinsk';
});


weatherApp.service('weatherService', ["$resource", "$routeParams", function($resource, $routeParams) {
    this.apiCurrent = "http://api.weatherbit.io/v2.0/forecast/current?";
    this.api = "http://api.weatherbit.io/v2.0/forecast/daily?";
    this.appId = "e1dc1fb1392d41589351954694c7c655";

    this.getWeather = function(city, current = false) {
        const api = current ? this.apiCurrent : this.api;
        weatherAPI = $resource(api, {
            get: {
                method: "JSONP" // for browser to not block the request
            }
        });

        return weatherAPI.get({ city: city, key: this.appId, days: $routeParams.days || 2 });
    };
}])