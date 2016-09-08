angular.module('portfolio')
 .service('authenticate', function($http,$window,$location) {

       this.login = function(email,password) {
         //console.log($window.localStorage["authToken"]);
        //  console.log("post");
         var loginCredentials = { "email":email,"password":password}

              return $http.post('/authenticate',loginCredentials).success(function (token) {
                  // console.log("token");

                  // var base64Url = token.split('.')[1];
                  // console.log(base64Url);
                  // var base64 = base64Url.replace('-', '+').replace('_', '/');
                  // console.log(JSON.parse($window.atob(base64)));

                  $window.localStorage["authToken"] = token;
                  console.log(token);
                  $window.location.href = "http://localhost:8080/index2.html";
                  //$window.localStorage.removeItem("authToken");     //for logout
                });
              // var req = {
              //    method: 'POST',
              //    url: '/api/authenticate',
              //    headers: {
              //      'x-access-token': $window.localStorage["authToken"]
              //    },
              //    data: object
              // };
              //
              // return $http(req).success(function (token) {
              //   console.log(token);
              //       var base64Url = token.split('.')[1];
              //       console.log(base64Url);
              //       var base64 = base64Url.replace('-', '+').replace('_', '/');
              //       console.log(JSON.parse($window.atob(base64)));
              // });
 };
 });
