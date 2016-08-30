angular.module('portfolio')
.controller('registerCtrl',function($scope,register){

  $scope.newUser=function(username,email,password){
      console.log("hello");
      register.newUser(username,email,password);
  }
});
