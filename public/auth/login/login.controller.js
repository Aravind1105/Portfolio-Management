angular.module('portfolio')
  .controller('loginCtrl', function($scope, $mdDialog, $mdMedia, $location, authenticate) {

    $scope.credentials = {
      email: "",
      password: ""
    };

    $scope.login = function(email, password) {
      console.log("inside login");
      var token = authenticate.login(email, password);
      console.log(token);
    }

    $scope.user = function(ev) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
      $mdDialog.show({
        controller: "registerCtrl",
        templateUrl: 'auth/register/register.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: useFullScreen
      });
      $scope.$watch(function() {
        return $mdMedia('xs') || $mdMedia('sm');
      }, function(wantsFullScreen) {
        $scope.customFullscreen = (wantsFullScreen === true);
      });
    };
  });
