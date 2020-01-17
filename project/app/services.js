weatherApp.service('nameService', function() {
    this.name = 'Severodvinsk';

    this.api = "http://api.openweathermap.org/data/2.5/weather?";
    this.appId = "ee402bb9e02561ade4fa74681127a056";
});