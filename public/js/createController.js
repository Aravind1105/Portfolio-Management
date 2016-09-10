angular.module('portfolio')
.controller('CreateController', ["$scope","$http","chicklet","$mdDialog","profile","$rootScope",function($scope, $http, chicklet,$mdDialog,profile,$rootScope) {
  var config={
    headers:{ 'Content-Type':'application/JSON'}
  }
  profile.getData($rootScope.profileId).success(function(resources) {
    console.log("inside createctrl");
    $scope.resource = resources[0];
  });
   $scope.chickletData = chicklet.chicklet_data;
   $scope.cancel = function() {
      $mdDialog.cancel();
   };
$scope.save = function() {
  $http.get('/generator').success(function(id){
    var temp=0;
    console.log(id);
    var temp_chicku={};
    // console.log(temp_chicku);
    $scope.resource.profiles.sections.forEach(function(section) {
    if(section.section_id === chicklet.sectionName) {
        section.chicklets.forEach(function(chicklet1) {
            if(chicklet1.chickletid===chicklet.chickletid && temp == 0){
                temp_chicku=chicklet;
                temp=1;
              }
         });
         temp_chicku["_id"] = id;
         section.chicklets.push(temp_chicku);
         console.log($scope.resource.profiles);
         var res= $http.post("/api/postdata",$scope.resource.profiles,config);
         res.success(function(data, status, headers, config) {
           console.log(data.sections[0].chicklets[7]);
          //  var res1= $http.post("/termExtraction",$scope.resource.profiles,config);
         $mdDialog.cancel();
      });
      // $mdDialog.cancel();
       }
   });
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
