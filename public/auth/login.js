angular.module('portfolio',['ngMaterial'])
.config(function($mdThemingProvider) {
   $mdThemingProvider.theme('grey')
     .primaryPalette('orange')
     .backgroundPalette('grey').dark();

 });
