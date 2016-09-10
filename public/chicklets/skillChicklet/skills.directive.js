angular.module('portfolio')
 .directive('skills',function() {
 return {
     templateUrl: 'chicklets/skillChicklet/skills.tmpl.html',
     scope: {
         sectionName:'@',
       chickletPath: '=chickletPath'
     },
     controller: function($scope,$rootScope,$mdDialog) {
       $scope.editEnabled = $rootScope.editEnabled;
       $scope.chickletData = $scope.chickletPath['chicklet_data'];
       $scope.chickletName = $scope.chickletPath['chickletid'];
       $scope.chicklets=$scope.chickletPath;
       $scope.skillModal=function(chickletData,sectionName,chickletName,chicklets){
       $mdDialog.show({
             templateUrl:'/views/skill_modal.html',
             locals: { chickletData: chickletData,
                       sectionName:sectionName,
                       chickletName:chickletName,
                     chicklets:chicklets},
             controller:"DialogController"
       });
       };

     }
 }
});
