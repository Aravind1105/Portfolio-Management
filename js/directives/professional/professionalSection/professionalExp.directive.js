angular.module('portfolio')
  .directive('professionalExp', function() {
    return {
      templateUrl: '../js/directives/professional/professionalSection/professionalExp.tmpl.html',
      scope: {
        sectionName: '@'
      },
      transclude: {
        'placeholder-r': '?placeholderR',
        'placeholder-s': '?placeholderS',
      },
      controller: function($rootScope,$scope) {
        // console.log($rootScope["placeholder-a"]);
        console.log($scope.sectionName);
      }
    }
  });
