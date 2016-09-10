angular.module('portfolio')
 .directive('specialachievementChicklet',function() {
 return {
     templateUrl: 'chicklets/specialAchievementChicklet/special-achievement.tmpl.html',
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
