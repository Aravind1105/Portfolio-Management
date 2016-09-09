angular.module('portfolio')
.controller('registerCtrl',function($scope,register,$mdDialog){
//   $scope.newUser=function(username,email,password){
//   register.newUser(username,email,password).success(function(user) {
//     $scope.authUser=user;
//     console.log($scope.authUser);
//       $mdDialog.cancel();
//   });
// };
 $scope.newUser=function(username,email,password){
register.newUser(username,email,password).success(function(user) {
  $scope.authUser=user;
  console.log($scope.authUser);
        $mdDialog.cancel();
});
}
});
