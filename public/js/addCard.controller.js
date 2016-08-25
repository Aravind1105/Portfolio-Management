angular.module('portfolio')
.controller('addCardCtrl', function($scope,chicklets,$http,$mdDialog) {
     chicklets.getData().success(function(resources) {
      $scope.chicklets = resources;
      console.log(resources);
  });
  var config={
 headers:{ 'Content-Type':'application/JSON'}
}
$scope.isObject = function(object,key) {
  // console.log('Inside isObject');
  if(angular.isObject(object[key])) {
    return true;
  }
  return false;
}
$scope.save = function() {
  console.log($scope.chicklets);
$mdDialog.show({
        templateUrl:'../views/addCard.tmpl.html',
        locals:{
          chickletHead:$scope.chicklets
        },
        controller:"addCardCtrl",
        fullscreen: true
  });
 $mdDialog.cancel();
};
});
