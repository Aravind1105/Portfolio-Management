angular.module('portfolio')
  .controller('addCardCtrl', function($scope, chicklets, $http, $mdDialog) {
    chicklets.getData().success(function(resources) {
      $scope.chicklets = resources;
      console.log($scope.chicklets);
    });

    $scope.isObject = function(object, key) {
      if (angular.isObject(object[key])) {
        return true;
      }
      return false;
    }
    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    var templateMapper = {
      "PROFILE_DATA": "/views/personal_modal.html",
      "CONTACT_INFORMATION": "/views/contact_modal.html",
      "OTHER_PERSONEL_DATA": "/views/other_modal.html",
      "ABOUTME_SUMMARY": "/views/aboutme_summary_modal.html",
      "WORK_SUMMARY": "/views/summary_professional_modal.html",
      "ROLES_PLAYED": "/views/role_modal.html",
      "ENDORSEMENTS_CHICKLET": "/views/endorsement_modal.html",
      "ACTIVITIES": "/views/activity_modal.html",
      "HOBBIES": "/views/hobby_modal.html",
      "PUBLICATIONS": "/views/publication_modal.html",
      "CONFERENCE_AND_PARTICIPATION": "/views/conference_modal.html",
      "SPECIAL_ACHIEVEMENTS": "/views/specialachievement_modal.html",
      "PROJECT": "/views/project_modal.html",
      "EDUCATION_SUMMARY": "/views/education_summary_modal.html",
      "QUALIFICATION": "/views/qualification_modal.html",
      "INSTITUTION": "/views/institution_modal.html",
      "CURRENT": "/views/current_location_modal.html",
      "PAST": "/views/past_location_modal.html",
      "FOLLOWED": "/views/followed_modal.html",
      "FOLLOWING": "/views/following_modal.html",
      "SKILL": "/views/skill_modal.html"
    };

    $scope.createChicklet = function(ev, chicklet) {
      $mdDialog.show({
        templateUrl: templateMapper[chicklet.chickletid],
        targetEvent: ev,
        locals: {
          chicklet: chicklet
        },
        controller: "CreateController",
        fullscreen: true
      });
    }

  });
