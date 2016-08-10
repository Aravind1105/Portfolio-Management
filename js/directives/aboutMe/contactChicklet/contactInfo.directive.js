angular.module('portfolio')
 .directive('contactInfo',function() {
 return {
     templateUrl: '../js/directives/aboutMe/contactChicklet/contact.tmpl.html',
     scope: {
         sectionName:'@',
       chickletPath: '=chickletPath'
     },
     controller: function($scope) {
       $scope.chickletData = $scope.chickletPath['chicklet_data'];
       $scope.chickletName = $scope.chickletPath['chickletid'];
      // console.log($scope.chickletPath['chicklet-data']);
     }
}});
