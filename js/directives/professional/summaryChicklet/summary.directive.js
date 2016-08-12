angular.module('portfolio')
 .directive('summaryRecord',function() {
 return {
     templateUrl: '../js/directives/professional/summaryChicklet/summarywork.tmpl.html',
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
