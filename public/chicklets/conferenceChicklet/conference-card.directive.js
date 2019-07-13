angular.module('portfolio')
  .directive('conferenceChicklet', function() {
    return {
      templateUrl: 'chicklets/conferenceChicklet/conference-card.tmpl.html',
      scope: {
        sectionName: '@',
        chickletPath: '=chickletPath'
      },
      controller: function($scope, $rootScope, $mdDialog) {
        $scope.editEnabled = $rootScope.editEnabled;
        $scope.chickletData = $scope.chickletPath['chicklet_data'];
        $scope.chickletName = $scope.chickletPath['chickletid'];
        $scope.chicklets = $scope.chickletPath;
        $scope.conferenceModal = function(chickletData, sectionName, chickletName, chicklets) {
          $mdDialog.show({
            templateUrl: '/views/conference_modal.html',
            locals: {
              chickletData: chickletData,
              sectionName: sectionName,
              chickletName: chickletName,
              chicklets: chicklets
            },
            controller: "DialogController"
          });
        };
        $scope.deletechicklet = function(chickletData, sectionName, chickletName, chicklets) {
          $mdDialog.show({
            templateUrl: '/views/delete_chicklet_modal.html',
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
