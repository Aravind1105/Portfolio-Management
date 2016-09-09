angular.module('portfolio')
  .controller('landingPageCtrl', ['$scope','$http','page','profile','$window','$location',function($scope,$http,page,profile,$window,$location) {
    page.getData().success(function(resource) {
      $scope.resource=resource[0];
      $scope.backgroundImg = resource[0].page[0].img;
      console.log(resource[0].profiles.sections[0].chicklets[0].chicklet_data.image.value);
    });

  profile.getData().success(function(resources) {
    console.log("inside landctrl");
    $scope.resource = resources[0];
  });
  $scope.logout = function() {
        $window.localStorage.removeItem("authToken");
        $window.location.href="/index.html";
      };
}]);
