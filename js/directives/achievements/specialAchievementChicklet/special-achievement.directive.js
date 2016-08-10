angular.module('portfolio')
 .directive('specialachievementChicklet',function() {
 return {
     templateUrl: '../js/directives/achievements/specialAchievementChicklet/special-achievement.tmpl.html',
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
