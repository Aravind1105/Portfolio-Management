angular.module('portfolio')
  .controller('landingPageCtrl', ['$scope', '$http', 'page', 'profile', '$window', '$location', '$routeParams', '$rootScope', function($scope, $http, page, profile, $window, $location, $routeParams, $rootScope) {
    $rootScope.profileId = $location.path().split('/profile/')[1];
    page.getData($rootScope.profileId).success(function(resource) {
      $scope.resource = resource[0];
      $scope.backgroundImg = resource[0].page[0].img;
      console.log(resource[0].profiles.sections[0].chicklets[0].chicklet_data.image.value);
    });

    profile.getData($rootScope.profileId).success(function(resources) {
      console.log("inside landctrl");
      $scope.resource = resources[0];
    });

    $scope.logout = function() {
      $window.localStorage.removeItem("authToken");
      $window.location.href = "/login.html";
    };
  }]);
