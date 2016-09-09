angular.module('portfolio')
 .directive('contactInfo',function() {
 return {
     templateUrl: 'chicklets/contactChicklet/contact.tmpl.html',
     scope: {
         sectionName:'@',
       chickletPath: '=chickletPath'
     },
     controller: function($scope) {
       $scope.chickletData = $scope.chickletPath['chicklet_data'];
      //  $scope.chickletData1 = $scope.chickletData;
       $scope.chickletName = $scope.chickletPath['chickletid'];
       $scope.chicklets=$scope.chickletPath;

      // console.log($scope.chickletPath['chicklet-data']);
     }
}});
