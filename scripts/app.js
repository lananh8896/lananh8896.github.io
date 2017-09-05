<<<<<<< HEAD
var scotchApp = angular.module('scotchApp', ['ngRoute', 'ngTagsInput', 'textAngular', 'ui.bootstrap']);
=======
var scotchApp = angular.module('scotchApp', ['ngRoute']);
>>>>>>> 1dc982b344fd2eb349ef5cd2c0d7d96eed353162
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
<<<<<<< HEAD
        })
        .when('/categories/:id', {
            templateUrl: 'view/cat_page.html',
            controller: 'maincontroller'
        });
});
=======
        });
});
>>>>>>> 1dc982b344fd2eb349ef5cd2c0d7d96eed353162
