angular.module('portfolio')
.controller('registerCtrl',function($scope,register,$mdDialog){
 $scope.newUser=function(username,email,password){
   register.newUser(username,email,password);
          $mdDialog.cancel();
};
});
