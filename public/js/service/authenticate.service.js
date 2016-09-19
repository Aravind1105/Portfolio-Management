angular.module('portfolio')
.service('authenticate', function($http,$window,$location,$mdToast) {
  this.login = function(email,password) {
    console.log("inside auhtenticate");
    var loginCredentials = { "email":email,"password":password }
    return $http.post('/api/authenticate',loginCredentials).success(function (user) {
      $window.localStorage["authToken"] = user.token;
      $window.localStorage["userId"] = user.userId;
      $window.location.href = $location.path()+"/profile/"+user.userId;
                  console.log(token);
    }).error(function() {
      $mdToast.show($mdToast.simple().textContent("Invalid User").action("OK").position("top right").hideDelay(4000));
  });
}});
