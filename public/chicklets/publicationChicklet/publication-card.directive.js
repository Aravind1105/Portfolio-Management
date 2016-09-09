angular.module('portfolio')
 .directive('publicationChicklet',function() {
 return {
     templateUrl: 'chicklets/publicationChicklet/publication-card.tmpl.html',
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
