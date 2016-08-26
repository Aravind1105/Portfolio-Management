angular.module('portfolio')
  .controller('landingPageCtrl', ['$scope','$http','page','profile',function($scope,$http,page,profile) {
    page.getData().success(function(response) {
      $scope.backgroundImg = response.img;
      console.log(backgroundImg);
    });

  profile.getData().success(function(profile) {
    $scope.resource = profile[0];
  });
}]);
