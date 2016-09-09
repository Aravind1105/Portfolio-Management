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
         $scope.resource = resources[0];
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

  $scope.isObject = function(object,key) {
    if(angular.isObject(object[key])) {
      return true;
    }
    return false;
  }

$scope.contactModal=function(chickletData,sectionName,chickletName){
      $mdDialog.show({
          templateUrl:'/views/contact_modal.html',
          locals: { chickletData: chickletData,
                    sectionName:sectionName,
                    chickletName:chickletName},
          controller:"DialogController",
          fullscreen: true,

    });
};
$scope.otherModal=function(chickletData,sectionName,chickletName){
$mdDialog.show({
      templateUrl:'/views/other_modal.html',
      locals: { chickletData: chickletData,
                sectionName:sectionName,
                chickletName:chickletName},
      controller:"DialogController"
});
};
$scope.personalModal=function(chickletData,sectionName,chickletName){
$mdDialog.show({
      templateUrl:'/views/personal_modal.html',
      locals: { chickletData: chickletData,
                sectionName:sectionName,
                chickletName:chickletName},
      controller:"DialogController"
});
};
$scope.aboutme_summaryModal=function(chickletData1,sectionName,chickletName){
$mdDialog.show({
      templateUrl:'/views/aboutme_summary_modal.html',
      locals: { chickletData: chickletData1,
                sectionName:sectionName,
                chickletName:chickletName},
      controller:"DialogController"
});
};
$scope.aboutme_summaryCard=function(chickletData,sectionName,chickletName){
$mdDialog.show({
      templateUrl:'/views/aboutme_summary_modal.html',
      // templateUrl:'../addChicklet/summaryChicklet/summary.tmpl.html',
      // template:'<summaryInfo></summaryInfo>'
      locals: { chickletData: chickletData,
                sectionName:sectionName,
                chickletName:chickletName},
      controller:"DialogController"
});
};
    $scope.activityModal=function(chickletData,sectionName,chickletName){
  $mdDialog.show({
          templateUrl:'/views/activity_modal.html',
          locals: { chickletData: chickletData,
                    sectionName:sectionName,
                    chickletName:chickletName},
          controller:"DialogController"
    });
};
$scope.conferenceModal=function(chickletData,sectionName,chickletName){
  $mdDialog.show({
          templateUrl:'/views/conference_modal.html',
          locals: { chickletData: chickletData,
                    sectionName:sectionName,
                    chickletName:chickletName},
          controller:"DialogController"
    });
};
$scope.endorsementModal=function(chickletData,sectionName,chickletName){
  $mdDialog.show({
          templateUrl:'/views/endorsement_modal.html',
          locals: { chickletData: chickletData,
                    // data1: data,
                    sectionName:sectionName,
                    chickletName:chickletName},
          controller:"DialogController"
    });
};
$scope.hobbyModal=function(chickletData,sectionName,chickletName){
  $mdDialog.show({
          templateUrl:'/views/hobby_modal.html',
          locals: { chickletData: chickletData,
                    sectionName:sectionName,
                    chickletName:chickletName},
          controller:"DialogController"
    });
};
$scope.publicationModal=function(chickletData,sectionName,chickletName){
  $mdDialog.show({
          templateUrl:'/views/publication_modal.html',
          locals: { chickletData: chickletData,
                    sectionName:sectionName,
                    chickletName:chickletName},
          controller:"DialogController"
    });
};
$scope.specialModal=function(chickletData,sectionName,chickletName){
  $mdDialog.show({
          templateUrl:'/views/specialachievement_modal.html',
          locals: { chickletData: chickletData,
                    sectionName:sectionName,
                    chickletName:chickletName},
          controller:"DialogController"
    });
};
$scope.education_summaryModal=function(chickletData,sectionName,chickletName){
$mdDialog.show({
      templateUrl:'/views/education_summary_modal.html',
      locals: { chickletData: chickletData,
                sectionName:sectionName,
                chickletName:chickletName},
      controller:"DialogController"
});
};
$scope.institutionModal=function(chickletData,sectionName,chickletName){
$mdDialog.show({
      templateUrl:'/views/institution_modal.html',
      locals: { chickletData: chickletData,
                sectionName:sectionName,
                chickletName:chickletName},
      controller:"DialogController"
});
};
$scope.qualificationModal=function(chickletData,sectionName,chickletName){
$mdDialog.show({
      templateUrl:'/views/qualification_modal.html',
      locals: { chickletData: chickletData,
                sectionName:sectionName,
                chickletName:chickletName},
      controller:"DialogController",
      fullscreen: true


});
};
$scope.current_locationModal=function(chickletData,sectionName,chickletName){
$mdDialog.show({
      templateUrl:'/views/current_location_modal.html',
      locals: { chickletData: chickletData,
                sectionName:sectionName,
                chickletName:chickletName},
      controller:"DialogController"
});
};
$scope.past_locationModal=function(chickletData,sectionName,chickletName){
$mdDialog.show({
      templateUrl:'/views/past_location_modal.html',
      locals: { chickletData: chickletData,
                sectionName:sectionName,
                chickletName:chickletName},
      controller:"DialogController"
});
};
$scope.followedModal=function(chickletData,sectionName,chickletName){
$mdDialog.show({
      templateUrl:'/views/followed_modal.html',
      locals: { chickletData: chickletData,
                sectionName:sectionName,
                chickletName:chickletName},
      controller:"DialogController"
});
};
$scope.followingModal=function(chickletData,sectionName,chickletName){
$mdDialog.show({
      templateUrl:'/views/following_modal.html',
      locals: { chickletData: chickletData,
                sectionName:sectionName,
                chickletName:chickletName},
      controller:"DialogController"
});
};
$scope.roleModal=function(chickletData,sectionName,chickletName){
$mdDialog.show({
      templateUrl:'/views/role_modal.html',
      locals: { chickletData: chickletData,
                sectionName:sectionName,
                chickletName:chickletName},
      controller:"DialogController"
});
};
$scope.professional_summaryModal=function(chickletData,sectionName,chickletName){
$mdDialog.show({
      templateUrl:'/views/summary_professional_modal.html',
      locals: { chickletData: chickletData,
                sectionName:sectionName,
                chickletName:chickletName},
      controller:"DialogController"
});
};
$scope.projectModal=function(chickletData,sectionName,chickletName){
$mdDialog.show({
      templateUrl:'/views/project_modal.html',
      locals: { chickletData: chickletData,
                sectionName:sectionName,
                chickletName:chickletName},
      controller:"DialogController"
});
};
$scope.skillModal=function(chickletData,sectionName,chickletName){
$mdDialog.show({
      templateUrl:'/views/skill_modal.html',
      locals: { chickletData: chickletData,
                sectionName:sectionName,
                chickletName:chickletName},
      controller:"DialogController"
});
};
});
