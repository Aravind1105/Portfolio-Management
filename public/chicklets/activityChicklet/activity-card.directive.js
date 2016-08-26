angular.module('portfolio')
 .directive('activityChicklet',function() {
 return {
     templateUrl: 'chicklets/activityChicklet/activity-card.tmpl.html',
     scope: {
        sectionName:'@',
       chickletPath: '=chickletPath'
     },
     controller: function($scope) {
       $scope.chickletData = $scope.chickletPath['chicklet_data'];
       $scope.chickletName = $scope.chickletPath['chickletid'];
     }
 }
});
