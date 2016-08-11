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
          locals: { data: chickletData,
                    sname:sectionName,
                    cname:chickletName},
          controller:DialogController,
          fullscreen: true
    });
    function DialogController($scope,data,sname,cname,$http) {
      $scope.chickletData=data;
      // $scope.chickletData1=data1;
      $scope.sectionName=sname;
      $scope.chickletName=cname;
      $scope.cancel = function(chickletData) {
        $mdDialog.cancel();
      };
    }
};
$scope.otherModal=function(chickletData,sectionName,chickletName){
$mdDialog.show({
      templateUrl:'../views/other_modal.html',
      locals: { data: chickletData,
                sname:sectionName,
                cname:chickletName},
      controller:DialogController
});
function DialogController($scope,data,sname,cname,$http) {
  $scope.chickletData=data;
  $scope.sectionName=sname;
  $scope.chickletName=cname;
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
}
};
$scope.personalModal=function(chickletData,sectionName,chickletName){
$mdDialog.show({
      templateUrl:'../views/personal_modal.html',
      locals: { data: chickletData,
                sname:sectionName,
                cname:chickletName},
      controller:DialogController
});
function DialogController($scope,data,sname,cname,$http) {
  $scope.chickletData=data;
  $scope.sectionName=sname;
  $scope.chickletName=cname;
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
}
};
$scope.aboutme_summaryModal=function(chickletData1,sectionName,chickletName){
$mdDialog.show({
      templateUrl:'../views/aboutme_summary_modal.html',
      locals: { data: chickletData1,
                sname:sectionName,
                cname:chickletName},
      controller:DialogController
});
function DialogController($scope,data,sname,cname,$http) {
  $scope.chickletData1=data;
  $scope.sectionName=sname;
  $scope.chickletName=cname;
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
}
};

    $scope.activityModal=function(chickletData,sectionName,chickletName){
  $mdDialog.show({
          templateUrl:'../views/activity_modal.html',
          locals: { data: chickletData,
                    sname:sectionName,
                    cname:chickletName},
          controller:DialogController
    });
    function DialogController($scope,data,sname,cname,$http) {
      $scope.chickletData=data;
      $scope.sectionName=sname;
      $scope.chickletName=cname;
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
    }
};
$scope.conferenceModal=function(chickletData,sectionName,chickletName){
  $mdDialog.show({
          templateUrl:'../views/conference_modal.html',
          locals: { data: chickletData,
                    sname:sectionName,
                    cname:chickletName},
          controller:DialogController
    });
    function DialogController($scope,data,sname,cname,$http) {
      $scope.chickletData=data;
      $scope.sectionName=sname;
      $scope.chickletName=cname;
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
    }
};
$scope.endorsementModal=function(chickletData,sectionName,chickletName){
  $mdDialog.show({
          templateUrl:'../views/endorsement_modal.html',
          locals: { data: chickletData,
                    sname:sectionName,
                    cname:chickletName},
          controller:DialogController
    });
    function DialogController($scope,data,sname,cname,$http) {
      $scope.chickletData=data;
      $scope.sectionName=sname;
      $scope.chickletName=cname;
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
    }
};
$scope.hobbyModal=function(chickletData,sectionName,chickletName){
  $mdDialog.show({
          templateUrl:'../views/hobby_modal.html',
          locals: { data: chickletData,
                    sname:sectionName,
                    cname:chickletName},
          controller:DialogController
    });
    function DialogController($scope,data,sname,cname,$http) {
      $scope.chickletData=data;
      $scope.sectionName=sname;
      $scope.chickletName=cname;
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
    }
};
$scope.publicationModal=function(chickletData,sectionName,chickletName){
  $mdDialog.show({
          templateUrl:'../views/publication_modal.html',
          locals: { data: chickletData,
                    sname:sectionName,
                    cname:chickletName},
          controller:DialogController
    });
    function DialogController($scope,data,sname,cname,$http) {
      $scope.chickletData=data;
      $scope.sectionName=sname;
      $scope.chickletName=cname;
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
    }
};
$scope.specialModal=function(chickletData,sectionName,chickletName){
  $mdDialog.show({
          templateUrl:'../views/specialachievement_modal.html',
          locals: { data: chickletData,
                    sname:sectionName,
                    cname:chickletName},
          controller:DialogController
    });
    function DialogController($scope,data,sname,cname,$http) {
      $scope.chickletData=data;
      $scope.sectionName=sname;
      $scope.chickletName=cname;
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
    }
};
$scope.education_summaryModal=function(chickletData,sectionName,chickletName){
$mdDialog.show({
      templateUrl:'../views/education_summary_modal.html',
      locals: { data: chickletData,
                sname:sectionName,
                cname:chickletName},
      controller:DialogController
});
function DialogController($scope,data,sname,cname,$http) {
  $scope.chickletData=data;
  $scope.sectionName=sname;
  $scope.chickletName=cname;
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
}
};
$scope.institutionModal=function(chickletData,sectionName,chickletName){
$mdDialog.show({
      templateUrl:'../views/institution_modal.html',
      locals: { data: chickletData,
                sname:sectionName,
                cname:chickletName},
      controller:DialogController
});
function DialogController($scope,data,sname,cname,$http) {
  $scope.chickletData=data;
  $scope.sectionName=sname;
  $scope.chickletName=cname;
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
}
};
$scope.qualificationModal=function(chickletData,sectionName,chickletName){
$mdDialog.show({
      templateUrl:'../views/qualification_modal.html',
      locals: { data: chickletData,
                sname:sectionName,
                cname:chickletName},
      controller:DialogController,
      fullscreen: true


});
function DialogController($scope,data,sname,cname,$http) {
  $scope.chickletData=data;
  $scope.sectionName=sname;
  $scope.chickletName=cname;
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
}
};
$scope.current_locationModal=function(chickletData,sectionName,chickletName){
$mdDialog.show({
      templateUrl:'../views/current_location_modal.html',
      locals: { data: chickletData,
                sname:sectionName,
                cname:chickletName},
      controller:DialogController
});
function DialogController($scope,data,sname,cname,$http) {
  $scope.chickletData=data;
  $scope.sectionName=sname;
  $scope.chickletName=cname;
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
}
};
$scope.past_locationModal=function(chickletData,sectionName,chickletName){
$mdDialog.show({
      templateUrl:'../views/past_location_modal.html',
      locals: { data: chickletData,
                sname:sectionName,
                cname:chickletName},
      controller:DialogController
});
function DialogController($scope,data,sname,cname,$http) {
  $scope.chickletData=data;
  $scope.sectionName=sname;
  $scope.chickletName=cname;
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
}
};
$scope.followedModal=function(chickletData,sectionName,chickletName){
$mdDialog.show({
      templateUrl:'../views/followed_modal.html',
      locals: { data: chickletData,
                sname:sectionName,
                cname:chickletName},
      controller:DialogController
});
function DialogController($scope,data,sname,cname,$http) {
  $scope.chickletData=data;
  $scope.sectionName=sname;
  $scope.chickletName=cname;
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
}
};
$scope.followingModal=function(chickletData,sectionName,chickletName){
$mdDialog.show({
      templateUrl:'../views/following_modal.html',
      locals: { data: chickletData,
                sname:sectionName,
                cname:chickletName},
      controller:DialogController
});
function DialogController($scope,data,sname,cname,$http) {
  $scope.chickletData=data;
  $scope.sectionName=sname;
  $scope.chickletName=cname;
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
}
};
$scope.roleModal=function(chickletData,sectionName,chickletName){
$mdDialog.show({
      templateUrl:'../views/role_modal.html',
      locals: { data: chickletData,
                sname:sectionName,
                cname:chickletName},
      controller:DialogController
});
function DialogController($scope,data,sname,cname,$http) {
  $scope.chickletData=data;
  $scope.sectionName=sname;
  $scope.chickletName=cname;
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
}
};
$scope.professional_summaryModal=function(chickletData,sectionName,chickletName){
$mdDialog.show({
      templateUrl:'../views/summary_professional_modal.html',
      locals: { data: chickletData,
                sname:sectionName,
                cname:chickletName},
      controller:DialogController
});
function DialogController($scope,data,sname,cname,$http) {
  $scope.chickletData=data;
  $scope.sectionName=sname;
  $scope.chickletName=cname;
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
}
};
$scope.projectModal=function(chickletData,sectionName,chickletName){
$mdDialog.show({
      templateUrl:'../views/project_modal.html',
      locals: { data: chickletData,
                sname:sectionName,
                cname:chickletName},
      controller:DialogController
});
function DialogController($scope,data,sname,cname,$http) {
  $scope.chickletData=data;
  $scope.sectionName=sname;
  $scope.chickletName=cname;
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
}
};
$scope.skillModal=function(chickletData,sectionName,chickletName){
$mdDialog.show({
      templateUrl:'../views/skill_modal.html',
      locals: { data: chickletData,
                sname:sectionName,
                cname:chickletName},
      controller:DialogController
});
function DialogController($scope,data,sname,cname,$http) {
  $scope.chickletData=data;
  $scope.sectionName=sname;
  $scope.chickletName=cname;
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
}
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
  });
