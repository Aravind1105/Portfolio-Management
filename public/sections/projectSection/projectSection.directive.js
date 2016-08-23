angular.module('portfolio')
.directive('projectSection', function() {
  return {
      templateUrl: 'sections/projectSection/projectSection.tmpl.html',
      scope: {
        sectionName: '@',
        displayName:'@'
      },
      transclude: {
        'project-a': '?projectA'
      }
  }
});
