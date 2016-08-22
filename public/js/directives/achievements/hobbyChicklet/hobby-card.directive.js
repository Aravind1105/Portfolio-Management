angular.module('portfolio')
 .directive('hobbyChicklet',function() {
 return {
     templateUrl: '../js/directives/achievements/hobbyChicklet/hobby-card.tmpl.html',
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
