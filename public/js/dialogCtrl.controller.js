angular.module('portfolio')
.controller('DialogController', ["$scope","$http","sectionName","chickletName","chickletData","$mdDialog","profile", function($scope, $http, sectionName, chickletName, chickletData,$mdDialog,profile) {
  var config={
    headers:{ 'Content-Type':'application/JSON'}
  }
  profile.getData().success(function(resources) {
   $scope.resource = resources[0];
  //  console.log(resources[0].profiles);
});
  // $scope.chickletData = {};
  // console.log(chickletData);
   $scope.chickletData = angular.copy(chickletData);
  // console.log($scope.chickletData)
   $scope.sectionName = sectionName;
   $scope.chickletName = chickletName;
   $scope.cancel = function() {
      $mdDialog.cancel();
   };
$scope.save = function() {
  angular.copy($scope.chickletData,chickletData);
  $scope.resource.profiles.sections.forEach(function(section) {
    if(section.section_id===sectionName){
        section.chicklets.forEach(function(chicklet) {
              if(chicklet.chickletid===chickletName){
                chicklet.chicklet_data=chickletData;
                // console.log($scope.profile.profiles);
                var res= $http.patch("/api/postdata",$scope.resource.profiles,config);
                res.success(function(data, status, headers, config) {
                $scope.message = data;
                console.log(data);
                $mdDialog.cancel();
             });

           }
         });
       }

   });
};
  $scope.endorsers=[
        "Co-worker",
         "Customer",
         "Reported",
          "Manager"
      ];
      $scope.activity_types=[
        "Co-curricular",
        "Volunteering"
      ];
      $scope.publication_types=[
        "Books",
        "Journals",
        "Scientific Papers"
      ];
      $scope.conference_types=[
        "Industry",
         "Technical",
         "Scientific"
      ];
      $scope.statuses = [
           "Beta",
           "Released",
           "Open Source"
       ];
       $scope.types = [
           "School",
           "College",
           "Institute",
           "University"
       ];
      $scope.streams = [
           "Engineering",
           "Others"
        ];
       $scope.levels = [
         "U G",
         "P G",
         "Doctoral",
         "Certification"
     ];
     $scope.activities = [
         "Stay",
         "Work",
         "Study"
     ];
     $scope.blood_group=[
       "A+","AB+","A-","O+","B+","O-","B-","AB-"
     ];
     $scope.marital_status= [
    "Married","single"
    ];
}]);
