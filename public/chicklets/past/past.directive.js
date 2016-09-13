angular.module('portfolio')
 .directive('pastCard',function() {
 return {
     templateUrl: 'chicklets/past/past.tmpl.html',
     scope: {
         sectionName:'@',
       chickletPath: '=chickletPath'
     },
     controller: function($scope,$rootScope,$mdDialog) {
       $scope.editEnabled = $rootScope.editEnabled;
       $scope.chickletData = $scope.chickletPath['chicklet_data'];
       $scope.chickletName = $scope.chickletPath['chickletid'];
       $scope.chicklets=$scope.chickletPath;
       $scope.past_locationModal=function(chickletData,sectionName,chickletName,chicklets){
       $mdDialog.show({
             templateUrl:'/views/past_location_modal.html',
             locals: { chickletData: chickletData,
                       sectionName:sectionName,
                       chickletName:chickletName,
                     chicklets:chicklets},
             controller:"DialogController"
       });
       };
       $scope.deletechicklet=function(chickletData,sectionName,chickletName,chicklets){
       $mdDialog.show({
               templateUrl:'/views/delete_chicklet_modal.html',
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
