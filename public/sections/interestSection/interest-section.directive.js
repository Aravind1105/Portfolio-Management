angular.module('portfolio')
  .directive('interestSection', function() {
    return {
      templateUrl: 'sections/interestSection/interest.tmpl.html',
      scope: {
        sectionName: '@',
        displayName: '@'
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
