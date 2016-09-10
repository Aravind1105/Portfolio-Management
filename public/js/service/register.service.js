angular.module('portfolio')
.service('register', function($http,$window,$location,$mdDialog) {
  this.newUser = function(username,email,password){
    console.log("post");
    var registerCredentials = { "username": username,"email":email,"password":password };

    var user= $http.get('/register/'+registerCredentials.email).success(function(user){
      if(user.email == registerCredentials.email){
        alert("email existed already");
        $mdDialog.cancel();
        return 1;
      }
      else {
        return $http.post('/register',registerCredentials);
        $scope.authUser=user;
        $mdDialog.cancel();
      }
     });
  };
});
