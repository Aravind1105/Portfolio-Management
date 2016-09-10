angular.module('portfolio')
 .directive('summaryRecord',function() {
 return {
     templateUrl: 'chicklets/recordChicklet/summarywork.tmpl.html',
     scope: {
         sectionName:'@',
       chickletPath: '=chickletPath'
     },
     controller: function($scope,$rootScope,$mdDialog) {
       $scope.editEnabled = $rootScope.editEnabled;
       $scope.chickletData = $scope.chickletPath['chicklet_data'];
       $scope.chickletName = $scope.chickletPath['chickletid'];
       $scope.chicklets=$scope.chickletPath;
       $scope.professional_summaryModal=function(chickletData,sectionName,chickletName,chicklets){
       $mdDialog.show({
             templateUrl:'/views/summary_professional_modal.html',
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
