angular.module('portfolio')
  .directive('followingPeople', function() {
    return {
      templateUrl: 'chicklets/following/following.tmpl.html',
      scope: {
        sectionName: '@',
        chickletPath: '=chickletPath'
      },
      controller: function($scope, $rootScope, $mdDialog) {
        $scope.editEnabled = $rootScope.editEnabled;
        $scope.chickletData = $scope.chickletPath['chicklet_data'];
        $scope.chickletName = $scope.chickletPath['chickletid'];
        $scope.chicklets = $scope.chickletPath;
        $scope.followingModal = function(chickletData, sectionName, chickletName, chicklets) {
          $mdDialog.show({
            templateUrl: '/views/following_modal.html',
            locals: {
              chickletData: chickletData,
              sectionName: sectionName,
              chickletName: chickletName,
              chicklets: chicklets
            },
            controller: "DialogController"
          });
        };
      }
    }
  });
