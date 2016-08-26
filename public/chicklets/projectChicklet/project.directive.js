angular.module('portfolio')
 .directive('projectInfo',function() {
 return {
     templateUrl: 'chicklets/projectChicklet/project.tmpl.html',
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
