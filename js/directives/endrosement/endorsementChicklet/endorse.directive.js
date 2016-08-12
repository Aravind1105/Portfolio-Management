angular.module('portfolio')
 .directive('endorsementChicklet',function() {
 return {
     templateUrl: '../js/directives/endrosement/endorsementChicklet/endorse.tmpl.html',
     scope: {
         sectionName:'@',
       chickletPath: '=chickletPath'
     },
     controller: function($scope) {
       $scope.chickletData = $scope.chickletPath['chicklet_data'];
       $scope.chickletName = $scope.chickletPath['chickletid'];
      // console.log($scope.chickletPath['chicklet-data']);
     }
 }
});
