angular.module('portfolio')
.controller('CreateController', ["$scope","$http","chicklet","$mdDialog","profile","$rootScope","$window",function($scope, $http, chicklet,$mdDialog,profile,$rootScope,$window) {
  var config={
    headers:{ 'Content-Type':'application/JSON'}
  }
  profile.getData($rootScope.profileId).success(function(resources) {
    console.log("inside createctrl");
    $scope.resource = resources[0];
  });
  // console.log($scope.resource);
   $scope.chickletData = chicklet.chicklet_data;
   $scope.cancel = function() {
      $mdDialog.cancel();
   };
$scope.save = function() {
  // $http.get('/generator').success(function(id){
    // var temp=0;
    // var temp_chicku={};
    for(i=0;i<$scope.contacts.length;i++)
    {
      if(i==0)
       skills=$scope.contacts[i].name;
      else {
        skills=skills+","+$scope.contacts[i].name;
      }
    }
    $scope.resource.profiles.sections.forEach(function(section) {
    if(section.section_id === chicklet.sectionName) {
        section.chicklets.push(chicklet);
        // section.chicklets.forEach(function(chicklet1) {
        //     if(chicklet1.chickletid===chicklet.chickletid && temp == 0){
        //         temp_chicku=chicklet;
        //         temp=1;
        //       }
        //  });
        //  temp_chicku["_id"] = id;
        //  section.chicklets.push(temp_chicku);

         console.log($scope.resource.profiles);
         var res= $http.patch("/api/postdata",$scope.resource,config);
         res.success(function(data, status, headers, config) {
            section = processSectionDisplay("section",section);
          //  console.log(data);
           $mdDialog.cancel();
           $window.location.reload();
      });
    }
   });
 // });
};
// $scope.chickletData.who.value=null;
  $scope.endorsers=[
        "Co-worker",
         "Customer",
         "Reported",
          "Manager"
      ];
      $scope.sex=[
        "Male",
        "Female"
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
  //  $scope.allContacts = loadContacts();
   $scope.contacts = [];
   $scope.filterSelected = true;

   $scope.querySearch = querySearch;
   $scope.data = [];
   $scope.transformChip = transformChip;
   $scope.selectedSkills = [];
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
   //search functionality for searching the skills
function querySearch (criteria) {
  cachedQuery = cachedQuery || criteria;
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
