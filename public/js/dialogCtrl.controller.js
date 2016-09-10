angular.module('portfolio')
.controller('DialogController', ["$scope","$http","sectionName","chickletName","chickletData","$mdDialog","profile","$rootScope","chicklets",function($scope, $http, sectionName, chickletName, chickletData,$mdDialog,profile,$rootScope,chicklets) {
  var config = {
    headers:{ 'Content-Type':'application/JSON'}
  }
  profile.getData($rootScope.profileId).success(function(resources) {
    // console.log("inside dialogctrl");
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
  // console.log("insideeeee");
  var flag=0;
  var chicklet_count=0;
  angular.copy($scope.chickletData,chickletData);
  $scope.resource.profiles.sections.forEach(function(section) {
    if(section.section_id===sectionName){
        section.chicklets.forEach(function(chicklet) {
              if(chicklet._id===chicklets._id) {
                chicklet.chicklet_data=chickletData;
             for(propt in chicklet.chicklet_data){
               chicklet_count=chicklet_count+1;
                       if(chicklet.chicklet_data[propt].value =="")
                          flag=flag+1;
                          // console.log("insidegg");
                       }
                       //post
                     }

           if(flag==chicklet_count){
             console.log("inside");
             console.log(chicklets);
           $http.patch('/api/deletechicklet',chicklets)
       .success(function (data, status, headers) {
           $scope.ServerResponse = data;
           $mdDialog.cancel();
       });
     }

     else {
       var res= $http.patch("/api/postdata",$scope.resource,config);
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
