angular.module('portfolio')
.service('register', function($http,$window,$location,$mdDialog,$mdToast) {
  this.newUser = function(username,email,password){
    console.log("post");
    var registerCredentials = { "username": username,"email":email,"password":password };
    var user= $http.get('/register/'+registerCredentials.email).success(function(user){
      if(user.email == registerCredentials.email){
          $mdToast.show($mdToast.simple().textContent("Email already existing").action("OK").position("center").hideDelay(4000));
        return 1;
      }
      else {
        return $http.post('/register',registerCredentials);
        $scope.authUser=user;
        alert("Login Success");
        $mdDialog.cancel();
      }
    });
  };
});
