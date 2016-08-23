angular.module('portfolio')
 .directive('endorsementsSection',function() {
   return {
     templateUrl: 'sections/endorsementSection/endorse.tmpl.html',
       scope: {
         sectionName: '@',
         displayName:'@'
     },
     transclude: {
         'placeholder-f': '?placeholderF'
     }
   }
});
