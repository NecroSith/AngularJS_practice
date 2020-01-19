weatherApp.service('nameService', function() {
    this.name = 'Severodvinsk';
});


weatherApp.service('weatherService', ["$resource", function($resource) {
    this.api = "http://api.openweathermap.org/data/2.5/weather?";
    this.appId = "ee402bb9e02561ade4fa74681127a056";

    this.getWeather = function(city) {
        weatherAPI = $resource(this.api, {
            get: {
                method: "JSONP" // for browser to not block the request
            }
        });

        return weatherAPI.get({ q: city, APPID: this.appId });
    }
}])