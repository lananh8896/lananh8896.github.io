var scotchApp = angular.module('scotchApp', ['ngRoute', 'ngTagsInput', 'textAngular', 'ui.bootstrap']);
// configure our routes
scotchApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);
scotchApp.config(function($routeProvider) {
    $routeProvider
    // route for the home page
        .when('/', {
            templateUrl: 'view/home.html',
            controller: 'maincontroller'
        })
        // route for the about page
        .when('/detail/:id', {
            templateUrl: 'view/single.html',
            controller: 'maincontroller'
        })
        .when('/categories/:id', {
            templateUrl: 'view/cat_page.html',
            controller: 'maincontroller'
        });
});