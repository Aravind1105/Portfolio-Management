angular.module('portfolio')
 .directive('hobbyChicklet',function() {
 return {
     templateUrl: 'chicklets/hobbyChicklet/hobby-card.tmpl.html',
     scope: {
         sectionName:'@',
       chickletPath: '=chickletPath'
     },
     controller: function($scope,$rootScope) {
       $scope.editEnabled = $rootScope.editEnabled;
       $scope.chickletData = $scope.chickletPath['chicklet_data'];
       $scope.chickletName = $scope.chickletPath['chickletid'];
       $scope.chicklets=$scope.chickletPath;

     }
 }
});
