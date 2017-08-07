scotchApp.controller('maincontroller', function ($scope, $http, $routeParams) {
    var root = "https://green-web-blog.herokuapp.com";

    $scope.apiGetCat = function () {
        $http.get(root + "/api/categories")
            .then(function (response) {
                $scope.categories = response.data;
            })
    };

    $scope.apiGetArt = function () {
        $http.get(root + "/api/articles")
            .then(function (response) {
                $scope.articles = response.data;
            });
    };

    $scope.getArticle = function () {
        $scope.currentArticleId = $routeParams.id;
    };
    


    $scope.submitCreateArticle = function () {
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

    $scope.submitCreateCategory = function () {
        if ($scope.newCategory.name.length > 0 &&
            $scope.newCategory.description.length > 0) {
            $http.post(root + "/api/categories", $scope.newCategory)
                .success(function (response) {
                    $scope.categories.push(response);
                    $scope.newCategory.name = "";
                    $scope.newCategory.description = "";
                }).error(function (data, status, headers, config) {
                    console.log(data, status, headers, config);
                });
        } else {
            alert("Input invalid");
        }
    }



    $scope.login = function () {
        console.log($scope.user);

        //POST Login API below:
        $http.post(root + '/api/users/auth', $scope.user)
            .success(function (response) {
                var isSuccess = response.success;
                if (isSuccess) {
                    console.log(response);
                } else {
                    //Raise Error
                    alert(response.message);
                }
            }).error(function (data, status, headers, config) {
                console.log(data, status, headers, config);
            });
    };

    $scope.signup = function () {
        //POST Login API below:
        $http.post(root + '/api/users/auth', $scope.newUser)
            .success(function (response) {
                var isSuccess = response.success;
                if (isSuccess) {
                    console.log(response);
                } else {
                    //Raise Error
                    alert(response.message);
                }
            }).error(function (data, status, headers, config) {
                console.log(data, status, headers, config);
            });
    };
    $scope.$watchCollection("articles", function (newArticles, oldArticles) {
        if (newArticles != undefined) {
            angular.forEach(newArticles, function (value, key) {
                if (value._id === $scope.currentArticleId) {
                    console.log("Find article of CurrentArticle");
                    $scope.article = value;
                    return false;
                }
            });
        };

    });

});