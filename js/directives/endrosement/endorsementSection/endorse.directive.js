angular.module('portfolio')
 .directive('endorsementsSection',function() {
   return {
     templateUrl: '../js/directives/endrosement/endorsementSection/endorse.tmpl.html',
       scope: {
     sectionName: '@'
     },
     transclude: {
         'placeholder-f': '?placeholderF'
     }
   }
});
