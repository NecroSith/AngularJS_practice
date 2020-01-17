weatherApp.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: './pages/main.html',
            controller: 'mainController'
        })
        .when('/details', {
            templateUrl: './pages/details.html',
            controller: 'forecastController'
        })
        .when('/details/:days', {
            templateUrl: './pages/details.html',
            controller: 'forecastController'
        })

    $locationProvider.html5Mode(false).hashPrefix('');
});