angular.module('portfolio')
  .controller('mainCtrl', function($scope,profile,$mdDialog,$http) {
    profile.getData().success(function(profile) {
      $scope.profile = profile;
    });
    var config={
   headers:{ 'Content-Type':'application/JSON'}
  }
    $scope.contactModal=function(chickletData,sectionName,chickletName){
  $mdDialog.show({
          templateUrl:'../views/contact_modal.html',
          locals: { chickletData: chickletData,
                    sectionName:sectionName,
                    chickletName:chickletName},
          controller:"DialogController",
          fullscreen: true
    });
};
$scope.otherModal=function(chickletData,sectionName,chickletName){
$mdDialog.show({
      templateUrl:'../views/other_modal.html',
      locals: { chickletData: chickletData,
                sectionName:sectionName,
                chickletName:chickletName},
      controller:"DialogController"
});
};
$scope.personalModal=function(chickletData,sectionName,chickletName){
$mdDialog.show({
      templateUrl:'../views/personal_modal.html',
      locals: { chickletData: chickletData,
                sectionName:sectionName,
                chickletName:chickletName},
      controller:"DialogController"
});
};
$scope.aboutme_summaryModal=function(chickletData1,sectionName,chickletName){
$mdDialog.show({
      templateUrl:'../views/aboutme_summary_modal.html',
      locals: { chickletData: chickletData1,
                sectionName:sectionName,
                chickletName:chickletName},
      controller:"DialogController"
});
};

    $scope.activityModal=function(chickletData,sectionName,chickletName){
  $mdDialog.show({
          templateUrl:'../views/activity_modal.html',
          locals: { chickletData: chickletData,
                    sectionName:sectionName,
                    chickletName:chickletName},
          controller:"DialogController"
    });
};
$scope.conferenceModal=function(chickletData,sectionName,chickletName){
  $mdDialog.show({
          templateUrl:'../views/conference_modal.html',
          locals: { chickletData: chickletData,
                    sectionName:sectionName,
                    chickletName:chickletName},
          controller:"DialogController"
    });
};
$scope.endorsementModal=function(chickletData,sectionName,chickletName){
  $mdDialog.show({
          templateUrl:'../views/endorsement_modal.html',
          locals: { chickletData: chickletData,
                    // data1: data,
                    sectionName:sectionName,
                    chickletName:chickletName},
          controller:"DialogController"
    });
};
$scope.hobbyModal=function(chickletData,sectionName,chickletName){
  $mdDialog.show({
          templateUrl:'../views/hobby_modal.html',
          locals: { chickletData: chickletData,
                    sectionName:sectionName,
                    chickletName:chickletName},
          controller:"DialogController"
    });
};
$scope.publicationModal=function(chickletData,sectionName,chickletName){
  $mdDialog.show({
          templateUrl:'../views/publication_modal.html',
          locals: { chickletData: chickletData,
                    sectionName:sectionName,
                    chickletName:chickletName},
          controller:"DialogController"
    });
};
$scope.specialModal=function(chickletData,sectionName,chickletName){
  $mdDialog.show({
          templateUrl:'../views/specialachievement_modal.html',
          locals: { chickletData: chickletData,
                    sectionName:sectionName,
                    chickletName:chickletName},
          controller:"DialogController"
    });
};
$scope.education_summaryModal=function(chickletData,sectionName,chickletName){
$mdDialog.show({
      templateUrl:'../views/education_summary_modal.html',
      locals: { chickletData: chickletData,
                sectionName:sectionName,
                chickletName:chickletName},
      controller:"DialogController"
});
};
$scope.institutionModal=function(chickletData,sectionName,chickletName){
$mdDialog.show({
      templateUrl:'../views/institution_modal.html',
      locals: { chickletData: chickletData,
                sectionName:sectionName,
                chickletName:chickletName},
      controller:"DialogController"
});
};
$scope.qualificationModal=function(chickletData,sectionName,chickletName){
$mdDialog.show({
      templateUrl:'../views/qualification_modal.html',
      locals: { chickletData: chickletData,
                sectionName:sectionName,
                chickletName:chickletName},
      controller:"DialogController",
      fullscreen: true


});
};
$scope.current_locationModal=function(chickletData,sectionName,chickletName){
$mdDialog.show({
      templateUrl:'../views/current_location_modal.html',
      locals: { chickletData: chickletData,
                sectionName:sectionName,
                chickletName:chickletName},
      controller:"DialogController"
});
};
$scope.past_locationModal=function(chickletData,sectionName,chickletName){
$mdDialog.show({
      templateUrl:'../views/past_location_modal.html',
      locals: { chickletData: chickletData,
                sectionName:sectionName,
                chickletName:chickletName},
      controller:"DialogController"
});
};
$scope.followedModal=function(chickletData,sectionName,chickletName){
$mdDialog.show({
      templateUrl:'../views/followed_modal.html',
      locals: { chickletData: chickletData,
                sectionName:sectionName,
                chickletName:chickletName},
      controller:"DialogController"
});
};
$scope.followingModal=function(chickletData,sectionName,chickletName){
$mdDialog.show({
      templateUrl:'../views/following_modal.html',
      locals: { chickletData: chickletData,
                sectionName:sectionName,
                chickletName:chickletName},
      controller:"DialogController"
});
};
$scope.roleModal=function(chickletData,sectionName,chickletName){
$mdDialog.show({
      templateUrl:'../views/role_modal.html',
      locals: { chickletData: chickletData,
                sectionName:sectionName,
                chickletName:chickletName},
      controller:"DialogController"
});
};
$scope.professional_summaryModal=function(chickletData,sectionName,chickletName){
$mdDialog.show({
      templateUrl:'../views/summary_professional_modal.html',
      locals: { chickletData: chickletData,
                sectionName:sectionName,
                chickletName:chickletName},
      controller:"DialogController"
});
};
$scope.projectModal=function(chickletData,sectionName,chickletName){
$mdDialog.show({
      templateUrl:'../views/project_modal.html',
      locals: { chickletData: chickletData,
                sectionName:sectionName,
                chickletName:chickletName},
      controller:"DialogController"
});
};
$scope.skillModal=function(chickletData,sectionName,chickletName){
$mdDialog.show({
      templateUrl:'../views/skill_modal.html',
      locals: { chickletData: chickletData,
                sectionName:sectionName,
                chickletName:chickletName},
      controller:"DialogController"
});
};
$scope.save=function(sectionName,chickletName,chickletData){
  $scope.profile.sections.forEach(function(section) {
    if(section.section_id===sectionName){
        section.chicklets.forEach(function(chicklet) {
              if(chicklet.chickletid===chickletName){
                chicklet.chicklet_data=chickletData;
                console.log($scope.profile);
                var res= $http.post("http://localhost:3000/profiles",$scope.profile,config);
                res.success(function(data, status, headers, config) {
                $scope.message = data;
             });
           }
         });
       }
   });
}

});
