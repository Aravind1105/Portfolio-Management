angular.module('portfolio', ['ngMaterial' , 'ngRoute'])
.config(function($mdThemingProvider) {
   $mdThemingProvider.theme('grey')
     .primaryPalette('orange')
     .backgroundPalette('grey').dark();

 });
