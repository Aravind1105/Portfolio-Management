angular.module('portfolio')
.controller('DialogController', ["$scope","$http","sectionName","chickletName","chickletData","$mdDialog","profile","$rootScope","chicklets","$window",function($scope, $http, sectionName, chickletName, chickletData,$mdDialog,profile,$rootScope,chicklets,$window) {
  var config = {
    headers:{ 'Content-Type':'application/JSON'}
  }
  profile.getData($rootScope.profileId).success(function(resources) {
   $scope.resource = resources[0];
});
 // console.log($scope.resource);
  // $scope.chickletData = {};
  // console.log(chickletData);
   $scope.chickletData = angular.copy(chickletData);
  // console.log($scope.chickletData)
  $scope.selectedSkills = [];
  if($scope.chickletData.tech_skills_used) {
    if($scope.chickletData.tech_skills_used.value) {
      console.log($scope.chickletData.tech_skills_used.value);
      $scope.chickletData.tech_skills_used.value.split(",").forEach(function(skill) {
        console.log(skill);
        if($scope.selectedSkills.indexOf(skill)<0)$scope.selectedSkills.push({name:skill});
      });
  }
}
$scope.sectionName = sectionName;
   $scope.chickletName = chickletName;
  $scope.chicklets = chicklets;
   $scope.cancel = function() {
      $mdDialog.cancel();
   };
var removeByAttr = function(arr, attr, value){
    var i = arr.length;
    while(i--){
       if( arr[i] && arr[i].hasOwnProperty(attr) && (arguments.length > 2 && arr[i][attr] === value ) ){
           arr.splice(i,1);
       }
    }
    return arr;
}
$scope.delete = function(){
  $scope.resource.profiles.sections.forEach(function(section) {
    if(section.section_id===sectionName){
        section.chicklets.forEach(function(chicklet,index) {
              if(chicklet._id===chicklets._id) {
            removeByAttr(section.chicklets,"_id",chicklet._id)
                console.log(section.chicklets);
                var res= $http.patch("/api/postdata",$scope.resource,config);
                res.success(function(data, status, headers, config) {
                  $scope.message = data;
                  console.log(data);
                  $mdDialog.cancel();
                  $window.location.reload();

                });
              }
            });
          }
        });

}
$scope.save = function() {


   var skills ="";
  // var flag=0;
  // var chicklet_count=0;

  angular.copy($scope.chickletData,chickletData);
  // console.log(chicklets);
  $scope.resource.profiles.sections.forEach(function(section) {
    console.log($scope.sectionName);
    if(section.section_id===sectionName){
      console.log("section");
        section.chicklets.forEach(function(chicklet) {
          var flag = 0;
          var chickletPropertyCount = 0;
      //     if(chicklet.chickletid==='PROJECT11'){
      //       if(chicklet._id===chicklets._id) {
      //      chicklet.chicklet_data=chickletData;
      //      if(chicklet.chicklet_data['tech_skills_used'].value == "")
      //      chicklet.chicklet_data['tech_skills_used'].value+=skills;
      //      else {
      //           chicklet.chicklet_data['tech_skills_used'].value+=","+skills;
      //      }
      //     //  console.log($scope.resource);
      //    }
      //  }
            if(chicklet._id===chicklets._id) {
              console.log(chicklet._id);
              console.log(chicklets._id);
                chicklet.chicklet_data=chickletData;
             for(propt in chicklet.chicklet_data){
               chickletPropertyCount=chickletPropertyCount+1;
               if(!(propt =="heading"))
                       if(chicklet.chicklet_data[propt].value =="")
                          flag=flag+1;
                       }
          if(flag!=0){
            console.log("inside flag");
           if(flag==chickletPropertyCount){
             console.log("inside");
             console.log(chicklets);
           $http.patch('/api/deletechicklet',chicklets)
       .success(function (data, status, headers) {
           $scope.ServerResponse = data;
           $mdDialog.cancel();
       });
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
  //  }
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
