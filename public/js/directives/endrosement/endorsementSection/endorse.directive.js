angular.module('portfolio')
 .directive('endorsementsSection',function() {
   return {
     templateUrl: '../js/directives/endrosement/endorsementSection/endorse.boot.tmpl.html',
       scope: {
         sectionName: '@',
         displayName:'@'
     },
     transclude: {
         'placeholder-f': '?placeholderF'
     }
   }
});
