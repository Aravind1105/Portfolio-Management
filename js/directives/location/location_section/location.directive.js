angular.module('portfolio')
  .directive('locationSection', function() {
    return {
      templateUrl: '../js/directives/location/location_section/location.section.html',
      scope: {
          sectionName:'@',
        sectionName: '@'
      },
      transclude: {
        'placeholder-h': '?placeholderH',
         'placeholder-i': '?placeholderI'
         },
      controller: function($rootScope,$scope) {
      }
    }
  });
