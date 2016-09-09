angular.module('portfolio')
 .directive('iCard',function() {
 return {
     templateUrl: 'chicklets/institution/institution.tmpl.html',
     scope: {
         sectionName:'@',
       chickletPath: '=chickletPath'
     },
     controller: function($scope) {
       $scope.chickletData = $scope.chickletPath['chicklet_data'];
       $scope.chickletName = $scope.chickletPath['chickletid'];
       $scope.chicklets=$scope.chickletPath;

      // console.log($scope.chickletPath['chicklet-data']);
     }
 }
});
