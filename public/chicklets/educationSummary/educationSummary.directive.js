angular.module('portfolio')
 .directive('sCard',function() {
 return {
     templateUrl: 'chicklets/educationSummary/educationSummary.tmpl.html',
     scope: {
         sectionName:'@',
       chickletPath: '=chickletPath'
     },
     controller: function($scope,$rootScope,$mdDialog) {
       $scope.editEnabled = $rootScope.editEnabled;
       $scope.chickletData = $scope.chickletPath['chicklet_data'];
       $scope.chickletName = $scope.chickletPath['chickletid'];
       $scope.chicklets=$scope.chickletPath;

       $scope.education_summaryModal=function(chickletData,sectionName,chickletName,chicklets){
       $mdDialog.show({
             templateUrl:'/views/education_summary_modal.html',
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
