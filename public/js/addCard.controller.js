angular.module('portfolio')
.controller('addCardCtrl', ["$scope","$http","chickletData","sectionName","chickletName","profile", function($scope, $http, chickletData,sectionName, chickletName,profile) {
  var config={
    headers:{ 'Content-Type':'application/JSON'}
  }
  profile.getData().success(function(profile) {
    $scope.profile = profile;
  });
  $scope.chickletData=chickletData;
$scope.sectionName = sectionName;
   $scope.chickletName = chickletName;
}
]);
