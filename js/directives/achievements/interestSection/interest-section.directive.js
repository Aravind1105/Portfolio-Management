angular.module('portfolio')
  .directive('interestSection', function() {
    return {
      templateUrl: '../js/directives/achievements/interestSection/interest.tmpl.html',
        scope: {
      sectionName: '@',
      displayName:'@'
        //  chickletPath: '=chickletPath'
      },
      transclude: {
        'placeholder-a': '?placeholderA',
        'placeholder-b': '?placeholderB',
        'placeholder-c': '?placeholderC',
        'placeholder-d': '?placeholderD',
        'placeholder-e': '?placeholderE'
      }
      // controller: function($scope) {
      //   $scope.chickletData = $scope.chickletPath['chicklet_data'];
      //   $scope.chickletName = $scope.chickletPath['chickletid'];
      //  // console.log($scope.chickletPath['chicklet-data']);
      // }
    }
  });
