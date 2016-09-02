angular.module('portfolio')
.service('register', function($http,$window,$location) {
      this.newUser = function(username,email,password) {
        console.log("post");
        var registerCredentials = { "username": username,"email":email,"password":password };
        var user = $http.get('/register/'+registerCredentials.email).success(function(user){
          if(user.email==registerCredentials.email){
            alert("email existed already");
          }else {
             return $http.post('/register',registerCredentials);
           }
});
};
});
