angular.module('portfolio')
.controller('CreateController', ["$scope","$http","chicklet","$mdDialog","profile", function($scope, $http, chicklet,$mdDialog,profile) {
  var config={
    headers:{ 'Content-Type':'application/JSON'}
  }
  profile.getData().success(function(resources) {
    $scope.resource = resources[0];
  });
   $scope.chickletData = chicklet.chicklet_data;
//    $scope.sectionName = chicklet.sectionName;
//    $scope.chickletName = chicklet.chickletName;
   $scope.cancel = function() {
      $mdDialog.cancel();
   };
$scope.save = function() {
  var temp=0;
  var temp_chicku={};
    $scope.resource.profiles.sections.forEach(function(section) {
    if(section.section_id === chicklet.sectionName) {
        section.chicklets.forEach(function(chicklet1) {
              console.log(chicklet1);
              if(chicklet1.chickletid===chicklet.chickletid && temp == 0 )
              {
                console.log(chicklet1);
                // console.log(chicklet);
                temp_chicku=chicklet;
                temp=1;
                // console.log(temp_chicku.chicklet_data);
                  // temp_chicku.chicklet_data=chicklet.chicklet_data;
              }
         });
         section.chicklets.push(temp_chicku);
         console.log($scope.resource.profiles);
         var res= $http.patch("/api/postdata",$scope.resource.profiles,config);
         res.success(function(data, status, headers, config) {
      //    $scope.message = data;
         $mdDialog.cancel();
      });
      $mdDialog.cancel();
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
