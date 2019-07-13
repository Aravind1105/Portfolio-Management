angular.module('portfolio')
  .directive('register', function() {
    return {
      templateUrl: 'auth/register/register.tmpl.html',
      controller:'registerCtrl'
    }
  })
