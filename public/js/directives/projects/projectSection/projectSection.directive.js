angular.module('portfolio')
.directive('projectSection', function() {
  return {
      templateUrl: '../js/directives/projects/projectSection/projectSection.boot.tmpl.html',
      scope: {
        sectionName: '@',
        displayName:'@'
      },
      transclude: {
        'project-a': '?projectA'
      }
  }
});
