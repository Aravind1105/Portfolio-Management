angular.module('portfolio')
  .directive('masterRenderer', function($compile,$rootScope) {
    return {
      scope: {
        section: '=section',
        chicklets: '<chicklets'
      },
      link: function(scope,element,attr) {
        var template = '<'+scope.section.section_directive_name +' section-name='+scope.section.section_id+' display-name='+scope.section.heading.displayName+' ng-show='+scope.section.showSection+'>';
        if($rootScope.sections == undefined)
          $rootScope.sections = {};
          var placeholders = {};
        scope.section.placeholders.forEach(function(placeholder) {
          var flexValue;
          if(placeholder.chickletCount > 1) {
            placeholders[placeholder.placeholderId] = placeholder.chickletWidth;
          }
          else {
            placeholders[placeholder.placeholderId] = 100;
          }
          if($rootScope.sections[scope.section.section_id] == undefined)
              $rootScope.sections[scope.section.section_id] = {};
            if($rootScope.sections[scope.section.section_id][placeholder.placeholderId] == undefined)
              $rootScope.sections[scope.section.section_id][placeholder.placeholderId] = {};
           $rootScope.sections[scope.section.section_id][placeholder.placeholderId].rowspan = Math.ceil(placeholder.chickletCount/(placeholder.width/placeholder.chickletWidth))*(placeholder.chickletRowSize);
        });
        scope.section.chicklets.forEach(function(chicklet,index) {
          template+='<'+chicklet.placeholderId+ ' flex="'+placeholders[chicklet.placeholderId]+'">'+'<'+chicklet["chicklet-directive-name"]+' section-name='+scope.section.section_id+' chicklet-path="section.chicklets['+index+']"'+'>'+'</'+chicklet["chicklet-directive-name"]+'>'+'</'+chicklet.placeholderId+ '>'
        });
        template+= '</'+scope.section.section_directive_name +'>';
        // console.log($compile(template)(scope));
        return element.append($compile(template)(scope));
      }
    }
  });
