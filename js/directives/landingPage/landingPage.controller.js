angular.module('portfolio')
  .controller('landingPageCtrl', ['$scope','$http','page','profile',function($scope,$http,page,profile) {
    page.getData().success(function(response) {
      $scope.backgroundImg = response.img;
      $scope.style = {
        'background-image': 'url('+$scope.backgroundImg+ ')',
        'background-size': 'cover'
      }
      // console.log(backgroundImg);
    });

  profile.getData().success(function(profile) {
    $scope.profile = profile;
  });
}]);
