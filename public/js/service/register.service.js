angular.module('portfolio')
 .service('register', function($http,$window,$location) {
      //  this.getData = function() {
      //    var obj=$http.get('./api/authenticate');
      //    console.log(obj);
      //    return obj;
      //  }

       this.newUser = function(username,email,password) {
         //console.log($window.localStorage["authToken"]);
         console.log("post");
         var registerCredentials = { "username": username,"email":email,"password":password };

              return $http.post('/api/register',registerCredentials);

 };
 });
