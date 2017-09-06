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