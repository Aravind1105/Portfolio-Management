angular.module('ProSearch')
.controller('loginCtrl',function($scope,$mdDialog,$mdToast,$mdMedia,$window,$location,authenticate,register){

    $scope.credentials = {
      email : "",
      password : ""
    };

    $scope.login = function(email,password){
        authenticate.login(email,password).success(function(token)
        {
            $window.localStorage["authToken"] = token.token;
            $window.location.href = "./";
        }).error(function() {
          $mdToast.show($mdToast.simple().textContent("Invalid User").action("OK").position("top right").hideDelay(4000));
        })
    }

    $scope.register = function(username,email,password) {
      register.newUser(username,email,password);
      $mdDialog.cancel();
    };

    $scope.user = function(ev) {

      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
      $mdDialog.show({
         templateUrl: 'auth/register/register.tmpl.html',
         scope: $scope,
         parent: angular.element(document.body),
         targetEvent: ev,
         clickOutsideToClose:true,
         fullscreen: useFullScreen
      });
      $scope.$watch(function() {
         return $mdMedia('xs') || $mdMedia('sm');
     }, function(wantsFullScreen){
       $scope.customFullscreen = (wantsFullScreen === true);
     });
    };
  }
);
