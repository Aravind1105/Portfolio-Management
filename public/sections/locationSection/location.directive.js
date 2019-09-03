angular.module('portfolio')
  .directive('locationSection', function() {
    return {
      templateUrl: 'sections/locationSection/location.section.html',
      scope: {
        sectionName: '@',
        displayName: '@'
      },
      transclude: {
        'placeholder-h': '?placeholderH',
        'placeholder-i': '?placeholderI'
      },
      controller: function($rootScope, $scope) {}
    }
  });
