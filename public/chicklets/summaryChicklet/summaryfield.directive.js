angular.module('portfolio')
 .directive('summaryInfo',function() {
 return {
     templateUrl: 'chicklets/summaryChicklet/summary.tmpl.html',
     scope: {
         sectionName:'@',
       chickletPath: '<chickletPath'
     },
     controller: function($scope,$rootScope,$mdDialog) {
       $scope.editEnabled = $rootScope.editEnabled;
       $scope.chickletData = $scope.chickletPath['chicklet_data'];
       $scope.chickletName = $scope.chickletPath['chickletid'];
       $scope.chicklets=$scope.chickletPath;
       $scope.aboutme_summaryModal=function(chickletData1,sectionName,chickletName,chicklets){
       $mdDialog.show({
             templateUrl:'/views/aboutme_summary_modal.html',
             locals: { chickletData: chickletData1,
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
