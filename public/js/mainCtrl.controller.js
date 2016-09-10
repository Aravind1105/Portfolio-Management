angular.module('portfolio')
  .controller('mainCtrl', function($scope,profile,$mdDialog,$http,$window,$routeParams,$location,$rootScope) {
    $rootScope.profileId = $location.path().split('/profile/')[1];
    $rootScope.profileId = $rootScope.profileId.substring(0,$rootScope.profileId.length-1);
    if($window.localStorage["userId"] == $rootScope.profileId) {
      $rootScope.editEnabled = true;
    } else {
      $rootScope.editEnabled = false;
    }
    console.log($window.localStorage["userId"]);
       profile.getData($rootScope.profileId).success(function(resources) {
         $scope.resource = resources[0];
       });
    var config={
   headers:{ 'Content-Type':'application/JSON'}
  }
  $scope.logout = function() {
          $window.localStorage.removeItem("authToken");
          $window.location.href="/index.html";
        };
  $scope.showChickletList = function(ev) {
    $mdDialog.show({
      templateUrl:'/views/addCard.tmpl.html',
      // template:'<add-card ></add-card>',
      targetEvent: ev,
      controller:"addCardCtrl",
      fullscreen: true
    });
  }
  $scope.DateConverter=function(value){

value=new Date(value).toString();
return value;
  }

  $scope.isObject = function(object,key) {
    if(angular.isObject(object[key])) {
      return true;
    }
    return false;
  }
});
