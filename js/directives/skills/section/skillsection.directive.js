angular.module('portfolio')
  .directive('skillSection', function() {
    return {
      templateUrl: '../js/directives/skills/section/skillsection.tmpl.html',
      scope: {
        sectionName: '@'
      },
      transclude: {
        'placeholder-skilla': '?placeholderSkilla',
      //  'placeholder-skillb': '?placeholderSkillb',
        // 'placeholder-networkc': '?placeholdernetworkC',
        // 'placeholder-networkd': '?placeholdernetworkD'
      },
      controller: function($rootScope,$scope) {
        // console.log($rootScope["placeholder-a"]);
        // console.log($scope.sectionName);
      }
    }
  });
