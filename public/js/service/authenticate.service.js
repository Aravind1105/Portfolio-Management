angular.module('portfolio')
.service('authenticate', function($http,$window,$location) {
  this.login = function(email,password) {
    console.log("inside auhtenticate");
    var loginCredentials = { "email":email,"password":password }
    return $http.post('/api/authenticate',loginCredentials).success(function (user) {
      // $scope.userProfile=token;
      // console.log($scope.userProfile);
      $window.localStorage["authToken"] = user.token;
      $window.localStorage["userId"] = user.userId;
      $window.location.href = "http://localhost:8080/profile/"+user.userId;
                  console.log(token);
    });
  };
});
