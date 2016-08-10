angular.module('portfolio')
  .directive('interestSection', function() {
    return {
      templateUrl: '../js/directives/achievements/interestSection/interest.tmpl.html',
        scope: {
      sectionName: '@'
      },
      transclude: {
        'placeholder-a': '?placeholderA',
        'placeholder-b': '?placeholderB',
        'placeholder-c': '?placeholderC',
        'placeholder-d': '?placeholderD',
        'placeholder-e': '?placeholderE'
      }
    }
  });
