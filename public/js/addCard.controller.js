angular.module('portfolio')
.controller('addCardCtrl', function($scope,chicklets,$http,$mdDialog) {
   chicklets.getData().success(function(resources) {
    $scope.chicklets = resources;
    console.log(resources);
  });

$scope.isObject = function(object,key) {
  if(angular.isObject(object[key])) {
    return true;
  }
  return false;
}

$scope.createChicklet = function(ev,chickletData,sectionName,chickletName) {
  $mdDialog.show({
    templateUrl:'../views/contact_modal.html',
    targetEvent: ev,
    locals: { chickletData: chickletData,
      sectionName:sectionName,
      chickletName:chickletName},
    controller:"addCardCtrl",
    fullscreen: true
  });
}

});
