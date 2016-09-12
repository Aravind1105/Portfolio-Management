angular.module('portfolio')
 .directive('qCard',function() {
 return {
     templateUrl: 'chicklets/qualification/qualification.tmpl.html',
     scope: {
         sectionName:'@',
       chickletPath: '=chickletPath'
     },
     controller: function($scope,$rootScope,$mdDialog) {
       $scope.editEnabled = $rootScope.editEnabled;
       $scope.chickletData = $scope.chickletPath['chicklet_data'];
       $scope.chickletName = $scope.chickletPath['chickletid'];
       $scope.chicklets=$scope.chickletPath;

       $scope.qualificationModal=function(chickletData,sectionName,chickletName,chicklets){
       $mdDialog.show({
             templateUrl:'/views/qualification_modal.html',
             locals: { chickletData: chickletData,
                       sectionName:sectionName,
                       chickletName:chickletName,
                     chicklets:chicklets},
             controller:"DialogController",
             fullscreen: true


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
