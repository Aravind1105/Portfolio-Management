angular.module('portfolio')
  .controller('landingPageCtrl', ['$scope','$http','page','profile',function($scope,$http,page,profile) {
    page.getData().success(function(resource) {
      $scope.resource=resource[0];
      $scope.backgroundImg = resource[0].page[0].img;
      console.log(resource[0].profiles.sections[0].chicklets[0].chicklet_data.image.value);
    });

  profile.getData().success(function(resources) {
    $scope.resource = resources[0];
  });
}]);
