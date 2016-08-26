angular.module('portfolio')
  .directive('network', function() {
    return {
      templateUrl: 'sections/networkSection/network.tmpl.html',
      scope: {
        sectionName: '@',
        displayName:'@'
      },
      transclude: {
        'placeholder-neta': '?placeholderNeta',
        'placeholder-netb': '?placeholderNetb',
      },
      controller: function($rootScope,$scope) {
        // console.log($rootScope["placeholder-a"]);
      //  console.log($rootScope.sections['NETWORK_OF_PEOPLE']);
      }
    }
  });
