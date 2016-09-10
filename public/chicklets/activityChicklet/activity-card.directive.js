angular.module('portfolio')
 .directive('activityChicklet',function() {
 return {
     templateUrl: 'chicklets/activityChicklet/activity-card.tmpl.html',
     scope: {
        sectionName:'@',
       chickletPath: '=chickletPath'
     },
     controller: function($scope,$rootScope,$mdDialog) {
       $scope.editEnabled = $rootScope.editEnabled;
       $scope.chickletData = $scope.chickletPath['chicklet_data'];
       $scope.chickletName = $scope.chickletPath['chickletid'];
       $scope.chicklets=$scope.chickletPath;
       $scope.activityModal=function(chickletData,sectionName,chickletName,chicklets){
     $mdDialog.show({
             templateUrl:'/views/activity_modal.html',
             locals: { chickletData: chickletData,
                       sectionName:sectionName,
                       chickletName:chickletName,
                     chicklets:chicklets},
             controller:"DialogController"
       });
   };
     }
 }
});
