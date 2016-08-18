angular.module('portfolio')
  .directive('educationSection', function() {
    return {
      templateUrl: '../js/directives/education/education_section/education.section.html',
      scope: {
        sectionName: '@',
        displayName:'@'
      },
      transclude: {
        'placeholder-p': '?placeholderP',
         'placeholder-q': '?placeholderQ',
         'placeholder-r': '?placeholderR'
        },
      controller: function($rootScope,$scope) {
      }
    }
  });
