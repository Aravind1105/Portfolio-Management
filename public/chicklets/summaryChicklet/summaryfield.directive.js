angular.module('portfolio')
 .directive('summaryInfo',function() {
 return {
     templateUrl: 'chicklets/summaryChicklet/summary.tmpl.html',
     scope: {
         sectionName:'@',
       chickletPath: '<chickletPath'
     },
     controller: function($scope,$rootScope) {
       $scope.editEnabled = $rootScope.editEnabled;
       $scope.chickletData = $scope.chickletPath['chicklet_data'];
       $scope.chickletName = $scope.chickletPath['chickletid'];
       $scope.chicklets=$scope.chickletPath;

     }
 }
});
