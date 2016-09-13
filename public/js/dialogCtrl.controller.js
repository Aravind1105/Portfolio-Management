angular.module('portfolio')
.controller('DialogController', ["$scope","$http","sectionName","chickletName","chickletData","$mdDialog","profile","$rootScope","chicklets",function($scope, $http, sectionName, chickletName, chickletData,$mdDialog,profile,$rootScope,chicklets) {
  var config = {
    headers:{ 'Content-Type':'application/JSON'}
  }
  profile.getData($rootScope.profileId).success(function(resources) {
   $scope.resource = resources[0];
  //  console.log(resources[0].profiles);
});
  // $scope.chickletData = {};
  // console.log(chickletData);
   $scope.chickletData = angular.copy(chickletData);
  // console.log($scope.chickletData)
  $scope.selectedSkills = [];
if($scope.chickletData.tech_skills_used.value) {
  console.log($scope.chickletData.tech_skills_used.value);
  $scope.chickletData.tech_skills_used.value.split(",").forEach(function(skill) {
    console.log(skill);
    if($scope.selectedSkills.indexOf(skill)<0)$scope.selectedSkills.push({name:skill});
  });
}
$scope.sectionName = sectionName;
   $scope.chickletName = chickletName;
   $scope.cancel = function() {
      $mdDialog.cancel();
   };
$scope.delete = function(){
  $scope.resource.profiles.sections.forEach(function(section) {
    if(section.section_id===sectionName){
        section.chicklets.forEach(function(chicklet) {
              if(chicklet._id===chicklets._id) {
              // chicklet={};
                console.log($scope.resource.profiles);
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

}
$scope.save = function() {


   var skills ="";
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
                       }
                       //post
                     }
          if(flag!=0){
           if(flag==chicklet_count){
             console.log("inside");
             console.log(chicklets);
           $http.patch('/api/deletechicklet',chicklets)
       .success(function (data, status, headers) {
           $scope.ServerResponse = data;
           $mdDialog.cancel();
       });
     }
   }

     else {
       console.log($scope.resource);
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
    var pendingSearch, cancelSearch = angular.noop;
   var cachedQuery, lastSearch;
   $scope.contacts = [];
   $scope.filterSelected = true;
   $scope.querySearch = querySearch;
   $scope.data = [];
   $scope.transformChip = transformChip;
   //search functionality for searching the skill

   function transformChip(chip) {
     return {name: chip};
   }

   $scope.$watchCollection('selectedSkills', function(nv) {
     var value = "";
     nv.forEach(function(item,index,arr) {
       console.log(index,arr.length);
       if(index == arr.length-1) {
         value += item.name;
       } else {
         value += item.name+",";
       }
     });
     $scope.chickletData.tech_skills_used.value = value;
   });

   function querySearch (criteria) {
     cachedQuery = cachedQuery || criteria;
     // console.log("checking criteria"+criteria);
     return profile.getSkillByTypedString(criteria).then(function(skills){
       $scope.data = [];
       skills.data.forEach(function(item, index){
          //  console.log("inside skills check");
           console.log(item.skills);
           $scope.data.push(item.skills);
       });
       return $scope.data;
     });
  }


 //  console.log($scope.contacts);
   function createFilterFor(query) {
     var lowercaseQuery = angular.lowercase(query);
     return function filterFn(contact) {
       return (contact._lowername.indexOf(lowercaseQuery) != -1);;
     };
   }

}]);
