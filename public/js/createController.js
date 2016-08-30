angular.module('portfolio')
.controller('CreateController', ["$scope","$http","sectionName","chickletName","chicklet","$mdDialog","profile", function($scope, $http, sectionName, chickletName, chicklet,$mdDialog,profile) {
  var config={
    headers:{ 'Content-Type':'application/JSON'}
  }
  profile.getData().success(function(resources) {
    $scope.resource = resources[0];
  });
   $scope.chickletData = chicklet.chicklet_data;
  // console.log($scope.chickletData)
   $scope.sectionName = sectionName;
   $scope.chickletName = chickletName;
   $scope.cancel = function() {
      $mdDialog.cancel();
   };
$scope.save = function() {
  var temp_chicku={};
  console.log(chicklet.chicklet_data);
  console.log("inside");
  console.log(sectionName);
  $scope.resource.profiles.sections.forEach(function(section) {
    if(section.section_id === sectionName){
        section.chicklets.forEach(function(chicklet) {
              if(chicklet.chickletid===chickletName){
                temp_chicku=chicklet;
                temp_chicku.chicklet_data=chickletData;
                // chicklet.chicklet_data=chickletData;
            //     var res= $http.post("http://localhost:3000/profiles",$scope.profile,config);
            //     res.success(function(data, status, headers, config) {
            //     $scope.message = data;
            //  });
           }
         });
         section.chicklets.push(temp_chicku);
         console.log($scope.resource.profiles);
       }
   });
 $mdDialog.cancel();
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
