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
   $scope.sectionName = sectionName;
   $scope.chickletName = chickletName;
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
                });
              }
            });
          }
        });

}
$scope.save = function() {

  // console.log("insideeeee");
   var skills ="";
  var flag=0;
  var chicklet_count=0;
  for(i=0;i<$scope.contacts.length;i++)
  {
    if(i==0)
     skills=$scope.contacts[i].name;
    else {
      skills=skills+","+$scope.contacts[i].name;
    }
  }
  angular.copy($scope.chickletData,chickletData);
  $scope.resource.profiles.sections.forEach(function(section) {
    if(section.section_id===sectionName){
        section.chicklets.forEach(function(chicklet) {
          if(chicklet.chickletid==='PROJECT'){
            if(chicklet._id===chicklets._id) {
           chicklet.chicklet_data=chickletData;
           if(chicklet.chicklet_data['tech_skills_used'].value == "")
           chicklet.chicklet_data['tech_skills_used'].value+=skills;
           else {
                chicklet.chicklet_data['tech_skills_used'].value+=","+skills;
           }
          //  console.log($scope.resource);
         }
       }
            else if(chicklet._id===chicklets._id) {
                chicklet.chicklet_data=chickletData;
             for(propt in chicklet.chicklet_data){
               chicklet_count=chicklet_count+1;
                       if(chicklet.chicklet_data[propt].value =="")
                          flag=flag+1;
                       }
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
   $scope.allContacts = loadContacts();
   $scope.contacts = [];
   $scope.filterSelected = true;
   $scope.querySearch = querySearch;
   $scope.data = [];
   //search functionality for searching the user
   function querySearch (criteria) {
     cachedQuery = cachedQuery || criteria;
     // console.log("checking criteria"+criteria);
     return profile.getUserByTypedString(criteria).then(function(skills){
       $scope.data = [];
       skills.data.forEach(function(item, index){
           // console.log("inside skills check");
           // console.log(item.skills);
           $scope.data.push({"name":item.skills});
       });
       return $scope.data;
     });
       //return cachedQuery ? $scope.allContacts.filter(createFilterFor(cachedQuery)) : [];
  }


 //  console.log($scope.contacts);
   function createFilterFor(query) {
     var lowercaseQuery = angular.lowercase(query);
     return function filterFn(contact) {
       return (contact._lowername.indexOf(lowercaseQuery) != -1);;
     };
   }
   function loadContacts() {
     var contacts = [

     ];

     return contacts.map(function (c, index) {
       var cParts = c.split(' ');
       var contact = {
         name: c,
         // image: 'http://lorempixel.com/50/50/people?' + index
       };
       contact._lowername = contact.name.toLowerCase();
       return contact;
     });
   }
}]);
