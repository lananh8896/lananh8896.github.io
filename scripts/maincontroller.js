var scotchApp = angular.module('scotchApp', ['ngRoute', 'ngTagsInput', 'textAngular', 'ui.bootstrap', 'ngCookies']);
scotchApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);


scotchApp.controller('maincontroller', function($scope, $http, $routeParams, $cookieStore) {

    var root = "https://green-web-blog.herokuapp.com";

    var maxRandomArticleNumber = 3;
    var maxPopularArticlesNumber = 5;
    // create a message to display in our view
    //Begin Sort Array
    var compareValues = function(key, order = 'asc') {
        return function(a, b) {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                // property doesn't exist on either object
                return 0;
            }

            const varA = (typeof a[key] === 'string') ?
                a[key].toUpperCase() : a[key];
            const varB = (typeof b[key] === 'string') ?
                b[key].toUpperCase() : b[key];

            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }
            return (
                (order == 'desc') ? (comparison * -1) : comparison
            );
        };
    }


    $scope.init = function() {
        $scope.apiGetArt();
        $scope.apiGetCat();
        $scope.getArticle();
    }

    $scope.apiGetCat = function() {
        $http.get(root + "/api/categories")
            .then(function(response) {

                $scope.categories = response.data;
            })
    };

    $scope.apiGetArt = function() {
        $http.get(root + "/api/articles")
            .then(function(response) {

                $scope.articles = response.data;
            });
    };




    $scope.getArticle = function() {
        $scope.currentArticleId = $routeParams.id;
        $http.get(root + "/api/articles")
            .then(function(response) {
                $scope.articles = response.data;
            });
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
        }
    };

    $scope.submitCreateArticle = function() {
        console.log($scope.newArticle);
        $scope.newArticle._author = "59830ac179630900046aba92";
        $http.post(root + '/api/articles/', $scope.newArticle)
            .then(function successCallback(response) {
                    alert("Thành công")
                },
                function errorCallback(response) {
                    console.log(data, status, headers, config);
                });
    };

    $scope.submitCreateCategory = function() {
        if ($scope.newCategory.name.length > 0 &&
            $scope.newCategory.description.length > 0) {
            $http.post(root + "/api/categories", $scope.newCategory)
                .success(function(response) {
                    $scope.categories.push(response);
                    $scope.newCategory.name = "";
                    $scope.newCategory.description = "";
                }).error(function(data, status, headers, config) {
                    console.log(data, status, headers, config);
                });
        } else {
            alert("Input invalid");
        }
    }

    // $scope.login = function() {

    //     console.log($scope.user);

    //     //POST Login API below:
    //     $http.post(root + '/api/users/auth', $scope.user)
    //         .success(function(response) {

    //             var isSuccess = response.success;
    //             if (isSuccess) {
    //                 console.log(response);
    //             } else {
    //                 //Raise Error
    //                 alert(response.message);
    //             }

    //         }).error(function(data, status, headers, config) {
    //             console.log(data, status, headers, config);
    //         });
    // };

    // $scope.signup = function() {
    //     //POST Login API below:
    //     $http.post(root + '/api/users/auth', $scope.newUser)
    //         .success(function(response) {
    //             var isSuccess = response.success;
    //             if (isSuccess) {
    //                 console.log(response);
    //             } else {
    //                 //Raise Error
    //                 alert(response.message);
    //             }
    //         }).error(function(data, status, headers, config) {
    //             console.log(data, status, headers, config);
    //         });
    // };

    // Comment coppy 
    $scope.addCommentforArticle = function() {
        $scope.newComment._user = myId;
        $http.put(root + '/api/article/comment/' + $scope.article._id, $scope.newComment)
            .then(function successCallbak(response) {
                $scope.article = response.data;
                alert("Thành công");
                console.log(response.data);
            }, function errorCallback(response) {
                console.log(data, status, headers, config);
            });
    }




    //AllArticleinCategories tam
    $scope.getAllArticleinCategories = function() {
        $scope.currentCategoryID = $routeParams.id;
        $scope.articlesInCategory = getArticlesById($scope.currentCategoryID);

    }



    //Begin get articles by id
    var getArticlesById = function(id, maximumArticle) {
        if (maximumArticle === undefined) {
            if ($scope.articles === undefined) {
                maximumArticle = 0;
            } else {
                maximumArticle = $scope.articles.length;
            }
        }
        var articles = [];
        angular.forEach($scope.articles, function(value, key) {
            if (value._category._id === id && articles.length < maximumArticle) {
                articles.push(value);
            }
        });
        return articles;

    };

    $scope.$watchCollection("articles", function(newArticles, oldArticles) {
        if ($scope.articles != undefined && $scope.articles.length > 0) {
            //Update current Article object
            if ($scope.currentArticleId != undefined) {
                angular.forEach(newArticles, function(value, key) {
                    if (value._id === $scope.currentArticleId) {
                        $scope.article = value;
                        return false;
                    }
                });
            }

            //Update random articles
            $scope.randomArticles = [];
            var listArticles = newArticles.slice();
            for (var i = 0; i < maxRandomArticleNumber; i++) {
                if (listArticles.length > 0) {
                    var random = Math.floor(Math.random() * listArticles.length);
                    $scope.randomArticles.push(listArticles[random]);
                    listArticles.splice(random, 1);
                };
            };

            //Update Popular Articles

            $scope.popularArticles = newArticles.slice(0, maxPopularArticlesNumber);

            $scope.getAllArticleinCategories();

            //Begin Pagination
            $scope.viewby = 5;
            $scope.totalItems = newArticles.length;
            $scope.currentPage = 1;
            $scope.itemsPerPage = $scope.viewby;
            $scope.maxSize = 5;
            $scope.setPage = function(pageNo) {
                $scope.currentPage = pageNo;
            };
            $scope.pageChanged = function() {
                console.log('Page changed to: ' + $scope.currentPage);
            };
            $scope.setItemsPerPage = function(num) {
                $scope.itemsPerPage = num;
                $scope.currentPage = 1;
            }
        };
    });

    $scope.signup = function() {
        $http.post(root + '/api/users/signup/', $scope.newUser).then(function successCallbak(response) {
            var isSuccess = response.data.success;
            if (isSuccess === true) {
                $cookieStore.put('token', response.data.token);
                $cookieStore.put('user', response.data.user);
                $scope.user = $cookieStore.get('user');
                $scope.token = $cookieStore.get('token');
                //Redirect here
                window.location.href = '/#/'
            } else {
                //Raise Error
                alert(response.message);
            }
        }, function errorCallback(response) {
            console.log(data, status, headers, config);
        });
    };
    $scope.login = function() {
        console.log($scope.user);

        $http.post(root + '/api/users/auth', $scope.user)
            .then(function successCallback(response) {
                var isSuccess = response.data.success;
                if (isSuccess === true) {
                    $cookieStore.put('token', response.data.token);
                    $cookieStore.put('user', response.data.user);
                    $scope.user = $cookieStore.get('user');
                    $scope.token = $cookieStore.get('token');
                    //Redirect here
                    window.location.href = '/#/'
                } else {
                    //Raise Error
                    // alert(response.message);
                }
            }, function errorCallback(response) {
                console.log(data, status, headers, config);
            });
    };

    $scope.loadLogin = function() {
        var token = $cookieStore.get('token');
        if (token !== undefined) {
            $location.url("/")
        }
    }

    $scope.isLogged = function() {
        if ($cookieStore.get('token') != undefined) {

            return true;

        } else {
            return false;
        }
    }
    $scope.logOut = function() {
        $cookieStore.remove('token');
        $cookieStore.remove('user');
    }




});