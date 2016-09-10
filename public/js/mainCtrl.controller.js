function isEmptyObject(o) {
  return Object.keys(o).every(function(x) {
      return o[x]===''||o[x]===null;  // or just "return o[x];" for falsy values
  });
}

function processSectionDisplay(type,resources) {
  if (type=="profile"){
  for(counter=0; counter < resources[0].profiles.sections.length; counter++){
     for (counterChicklets = 0; counterChicklets < resources[0].profiles.sections[counter].chicklets.length; counterChicklets++){
       for (counterChickletsData = 0; counterChickletsData < Object.keys(resources[0].profiles.sections[counter].chicklets[counterChicklets].chicklet_data).length; counterChickletsData++){
         var value = resources[0].profiles.sections[counter].chicklets[counterChicklets].chicklet_data[Object.keys(resources[0].profiles.sections[counter].chicklets[counterChicklets].chicklet_data)[counterChickletsData]]["value"] ? resources[0].profiles.sections[counter].chicklets[counterChicklets].chicklet_data[Object.keys(resources[0].profiles.sections[counter].chicklets[counterChicklets].chicklet_data)[counterChickletsData]]["value"] : "";
         if(value !=""){
               resources[0].profiles.sections[counter]["showSection"] = true;
               break;
         }
     }
     if (resources[0].profiles.sections[counter]["showSection"]){
       break;
     }
     resources[0].profiles.sections[counter]["showSection"] = false;
   }
  }
  return resources[0];
  }
  else if(type=="section"){

    for (counterChicklets = 0; counterChicklets < resources.chicklets.length; counterChicklets++){
      for (counterChickletsData = 0; counterChickletsData < Object.keys(resources.chicklets[counterChicklets].chicklet_data).length; counterChickletsData++){
      var value = resources.chicklets[counterChicklets].chicklet_data[Object.keys(resources.chicklets[counterChicklets].chicklet_data)[counterChickletsData]]["value"] ? resources.chicklets[counterChicklets].chicklet_data[Object.keys(resources.chicklets[counterChicklets].chicklet_data)[counterChickletsData]]["value"] : "";
      if(value !=""){
            resources["showSection"] = true;
            break;
      }
    }
    if(resources["showSection"])
      break;

    resources["showSection"] = false;
  }
  return resources;
  }
}

angular.module('portfolio')
  .controller('mainCtrl', function($scope,profile,$mdDialog,$http,$window,$routeParams,$location,$rootScope) {
    $rootScope.profileId = $location.path().split('/profile/')[1];
    $rootScope.profileId = $rootScope.profileId.substring(0,$rootScope.profileId.length-1);
    if($window.localStorage["userId"] == $rootScope.profileId) {
      $rootScope.editEnabled = true;
    } else {
      $rootScope.editEnabled = false;
    }
    console.log($window.localStorage["userId"]);
       profile.getData($rootScope.profileId).success(function(resources) {
         $scope.resource = processSectionDisplay("profile",resources);
        //  $scope.resource = resources[0];
       });
    var config={
   headers:{ 'Content-Type':'application/JSON'}
  }
  $scope.logout = function() {
          $window.localStorage.removeItem("authToken");
          $window.location.href="/index.html";
        };
  $scope.showChickletList = function(ev) {
    $mdDialog.show({
      templateUrl:'/views/addCard.tmpl.html',
      // template:'<add-card ></add-card>',
      targetEvent: ev,
      controller:"addCardCtrl",
      fullscreen: true
    });
  }
  $scope.DateConverter=function(value){

value=new Date(value).toString();
return value;
  }

  $scope.isObject = function(object,key) {
    if(angular.isObject(object[key])) {
      return true;
    }
    return false;
  }
});
