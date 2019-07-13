function authInterceptor($window) {
  return {
    // automatically attach Authorization header
    request: function(config) {
      var token = $window.localStorage["authToken"];
      if (config.url.indexOf('localhost:8080') === 0 && token) {
        config.headers.add("x-access-token", token);
      } else if (!token) {
        $window.location.href = "/login.html";
        return;
      }
      return config;
    },

    // If a token was sent back, save it
    response: function(res) {
      console.log("in interceptor " + res);
      if (res.config.url.indexOf('localhost:8080') === 0 && res.data.token) {
        //auth.saveToken(res.data.token);
        $window.localStorage["authToken"] = res.data.token;
      }
      return res;
    }
  }
}


angular.module('portfolio', ['ngMaterial', 'ngRoute'])
  .factory('authInterceptor', authInterceptor)
  .config(function($httpProvider, $windowProvider) {
    var $window = $windowProvider.$get();
    $httpProvider.interceptors.push('authInterceptor');
  })
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('grey')
      .primaryPalette('orange')
      .backgroundPalette('grey').dark();

  });
