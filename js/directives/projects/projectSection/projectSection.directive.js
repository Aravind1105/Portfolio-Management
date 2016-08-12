angular.module('portfolio')
.directive('projectSection', function() {
  return {
      templateUrl: '../js/directives/projects/projectSection/projectSection.tmpl.html',
      scope: {
      sectionName: '@'
      },
      transclude: {
        'project-a': '?projectA'
      }
  }
});
