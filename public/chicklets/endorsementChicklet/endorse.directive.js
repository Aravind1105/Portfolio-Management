angular.module('portfolio')
 .directive('endorsementChicklet',function() {
 return {
     templateUrl: 'chicklets/endorsementChicklet/endorse.tmpl.html',
     scope: {
         sectionName:'@',
       chickletPath: '=chickletPath'
     },
     controller: function($scope,$rootScope,$mdDialog) {
       $scope.editEnabled = $rootScope.editEnabled;
       $scope.chickletData = $scope.chickletPath['chicklet_data'];
       $scope.chickletName = $scope.chickletPath['chickletid'];
       $scope.chicklets=$scope.chickletPath;
       $scope.endorsementModal=function(chickletData,sectionName,chickletName,chicklets){
         $mdDialog.show({
                 templateUrl:'/views/endorsement_modal.html',
                 locals: { chickletData: chickletData,
                           // data1: data,
                           sectionName:sectionName,
                           chickletName:chickletName,
                         chicklets:chicklets},
                 controller:"DialogController"
           });
       };

     }
 }
});
