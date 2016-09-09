angular.module('portfolio')
 .directive('sCard',function() {
 return {
     templateUrl: 'chicklets/educationSummary/educationSummary.tmpl.html',
     scope: {
         sectionName:'@',
       chickletPath: '=chickletPath'
     },
     controller: function($scope,$rootScope) {
       $scope.editEnabled = $rootScope.editEnabled;
       $scope.chickletData = $scope.chickletPath['chicklet_data'];
       $scope.chickletName = $scope.chickletPath['chickletid'];
     }
 }
});
