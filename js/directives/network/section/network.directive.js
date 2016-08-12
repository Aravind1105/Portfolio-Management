angular.module('portfolio')
  .directive('network', function() {
    return {
      templateUrl: '../js/directives/network/section/network.tmpl.html',
      scope: {
        sectionName: '@'
      },
      transclude: {
        'placeholder-neta': '?placeholderNeta',
        'placeholder-netb': '?placeholderNetb',
        // 'placeholder-networkc': '?placeholdernetworkC',
        // 'placeholder-networkd': '?placeholdernetworkD'
      },
      controller: function($rootScope,$scope) {
        // console.log($rootScope["placeholder-a"]);
      //  console.log($rootScope.sections['NETWORK_OF_PEOPLE']);
      }
    }
  });
