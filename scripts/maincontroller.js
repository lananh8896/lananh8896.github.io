scotchApp.controller('maincontroller', function($scope, $http, $routeParams, ) {
    var root = "https://green-web-blog.herokuapp.com";

    var maxRandomArticleNumber = 3;
    var maxPopularArticlesNumber = 5;
    // create a message to display in our view

    /* var idCat1 = "5983510622fd58000478aaa8";
    var idCat2 = "5981d787b38ced0004f0c5db";
    var idCat3 = "5981d805b38ced0004f0c5dd";
    var myId = "5981d84fb38ced0004f0c5df";
    $scope.myComments = "";
    $scope.newComment = {
        '_user': {
            '_id': '5981d84fb38ced0004f0c5df'

        },
        'commentContent': 'Hello everybody',
        'createdDate': {

            'default': Date.now()
        },
        'updatedDate': {

            'default': Date.now()
        },
    };
    console.log($scope.newComment) */
    $scope.init = function() {
        $scope.apiGetArt();
        $scope.apiGetCat();
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



    $scope.login = function() {
        console.log($scope.user);

        //POST Login API below:
        $http.post(root + '/api/users/auth', $scope.user)
            .success(function(response) {
                var isSuccess = response.success;
                if (isSuccess) {
                    console.log(response);
                } else {
                    //Raise Error
                    alert(response.message);
                }
            }).error(function(data, status, headers, config) {
                console.log(data, status, headers, config);
            });
    };

    $scope.signup = function() {
        //POST Login API below:
        $http.post(root + '/api/users/auth', $scope.newUser)
            .success(function(response) {
                var isSuccess = response.success;
                if (isSuccess) {
                    console.log(response);
                } else {
                    //Raise Error
                    alert(response.message);
                }
            }).error(function(data, status, headers, config) {
                console.log(data, status, headers, config);
            });
    };






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
        var arrayArticles = [];
        angular.forEach($scope.articles, function(value, key) {
            if (value._category === id && arrayArticles.length < maximumArticle) {
                arrayArticles.push(value);
            }
        });
        return arrayArticles;

    };


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
        if (newArticles != undefined) {
            angular.forEach(newArticles, function(value, key) {
                if (value._id === $scope.currentArticleId) {
                    console.log("Find article of CurrentArticle");
                    $scope.article = value;
                    return false;
                }
            });
        };

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


    });



    // var getArticlesById = function(id) {
    //     var articles = [];
    //     angular.forEach($scope.Articles, function(value, key) {
    //         if (value._category === id) {
    //             articles.push(value);
    //         }

    //     });
    //     return articles;
    //     console.log("Articles in Id :" + id + articles)
    // };



});