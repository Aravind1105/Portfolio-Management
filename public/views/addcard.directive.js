angular.module('portfolio')
  .directive('addCard', function() {
    return {
      templateUrl: './views/addcard.tmpl.html',
      scope: {
        sectionName: '@',
        chickletPath: '=chickletPath'
      },
      controller: function($scope) {
        $scope.chickletName = $scope.chickletPath['chickletid'];
      }
    }
  });
