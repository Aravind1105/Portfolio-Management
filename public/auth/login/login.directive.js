angular.module('portfolio')
  .directive('login', function() {
    return {
      templateUrl: 'auth/login/login.tmpl.html',
      controller:'loginCtrl'
    }
  })
