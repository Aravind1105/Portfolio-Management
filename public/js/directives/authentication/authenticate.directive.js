angular.module('portfolio')
  .directive('contactInfo', function() {
    return {
      templateUrl: '../js/directives/authentication/authenticate.tmpl.html',
      controller: function registerCtrl($location, authentication) {
        var vm = this;

        vm.credentials = {
          name: "",
          email: "",
          password: ""
        };

        vm.onSubmit = function() {
          authentication
            .register(vm.credentials)
            .error(function(err) {
              alert(err);
            })
            .then(function() {
              $location.path('profile');
            });
        };
      }
    }
  });
