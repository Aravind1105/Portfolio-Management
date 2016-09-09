angular.module('portfolio')
 .directive('otherInfo',function() {
 return {
     templateUrl: 'chicklets/otherChicklet/other.tmpl.html',
     scope: {
         sectionName:'@',
       chickletPath: '=chickletPath'
     },
     controller: function($scope,$mdDialog) {
       $scope.chickletData = $scope.chickletPath['chicklet_data'];
       $scope.chickletName = $scope.chickletPath['chickletid'];
       $scope.chicklets=$scope.chickletPath;
      // console.log($scope.chickletPath['chicklet-data']);
      $scope.otherModal=function(chickletData,sectionName,chickletName,chicklets){
      $mdDialog.show({
            templateUrl:'../views/other_modal.html',
            locals: { chickletData: chickletData,
                      sectionName:sectionName,
                      chickletName:chickletName,
                      chicklets:chicklets
                    },
            controller:"DialogController"
      });
      };
     }
 }
});
