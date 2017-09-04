var app = angular.module('myApp', ['ngTagsInput', 'textAngular', ]);

app.controller('maincontroller', function($scope, $http) {
    var root = "https://green-web-blog.herokuapp.com";


    $scope.init = function() {
        $scope.apiGetArt();
        $scope.apiGetCat();
    }


    $scope.apiGetArt = function() {
        $http.get(root + "/api/articles")
            .then(function(response) {
                $scope.articles = response.data;
            });
    };
    $scope.apiGetCat = function() {
        $http.get(root + "/api/categories")
            .then(function(response) {
                $scope.categories = response.data;
            })
    };



    $scope.getArticle = function() {
        $scope.currentArticleId = $routeParams.id;
    };

    $scope.getCategory = function() {
        $scope.currentCategoryId = $routeParams.id;
    };

    $scope.getCategoryNameOfArticle = function(id) {
        if (undefined != $scope.categories) {
            for (i = 0; i < $scope.categories.length; i++) {
                var cat = $scope.categories[i];
                if (cat._id == id) {
                    return cat.name;
                }
            }
        };

    }





    $scope.getArticleID = function(id) {
        angular.forEach($scope.articles, function(value, key) {
            if (value._id === id) {

                $scope.article = value;
                return false;
            }
        });
    };
    $scope.getCategoryID = function(id) {
        angular.forEach($scope.categories, function(value, key) {
            if (value._id === id) {

                $scope.category = value;
                return false;
            }
        });
    };


    $scope.updateArticle = function() {
        $scope.article._author = "59830ac179630900046aba92";
        $http.patch(root + '/api/articles/' + $scope.article._id, $scope.article)
            .then(function successCallback(response) {
                window.location.href = 'admin.html';
                alert("Update Success");
            }, function errorCallback(response) {
                // console.log(data, status, headers, config);
            });
    }

    $scope.updateCategory = function() {
        $scope.category._author = "59830ac179630900046aba92";
        $http.patch(root + '/api/categories/' + $scope.category._id, $scope.category)
            .then(function successCallbak(response) {

                window.location.href = 'categories.html';
            }, function errorCallback(response) {
                // console.log(data, status, headers, config);
            });
    }

    $scope.deleteArticle = function() {
        $http.delete(root + '/api/articles/' + $scope.article._id)
            .then(function successCallback(response) {
                console.log('You have already deleted the articles')
                window.location.href = 'admin.html';
            }, function errorCallback(response) {
                // console.log(data, status, headers, config);
            });
    }
    $scope.deleteCategory = function() {
        $http.delete(root + '/api/categories/' + $scope.category._id)
            .then(function successCallback(response) {
                alert("Thành công");
                console.log('You have already deleted the categories')
                window.location.href = 'categories.html';
            }, function errorCallback(response) {
                // console.log(data, status, headers, config);
            });
    }








    $scope.submitCreateArticle = function() {
        console.log($scope.newArticle);
        $scope.newArticle._author = "59830ac179630900046aba92";
        $http.post(root + '/api/articles/', $scope.newArticle)
            .then(function successCallback(response) {
                    alert("Thành công");
                },
                function errorCallback(response) {
                    console.log(data, status, headers, config);
                });
    };

    $scope.submitCreateCategory = function() {
        if ($scope.newCategory.name.length > 0 &&
            $scope.newCategory.description.length > 0) {
            $http.post(root + "/api/categories", $scope.newCategory)
                .then(function successCallback(response) {
                        $scope.categories.push(response);
                        $scope.newCategory.name = "";
                        $scope.newCategory.description = "";
                    },
                    function errorCallback(response) {
                        console.log(data, status, headers, config);
                    });
        } else {
            alert("Input invalid");
        }
    }


});