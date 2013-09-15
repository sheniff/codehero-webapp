'use strict';

window.angular.module('ngch.services.Global', [])
  .factory('GlobalService', ['$http', function ($http) {

    var current_user = {};

    $http.get('/api/v1/users/current')
      .success(function(data) {
        current_user = data;
      })
      .error(function(xhr) {
        current_user = null;
      });

    return {
      currentUser: function() {
        return current_user;
      },
      isSignedIn: function() {
        return !!current_user;
      }
    };
  }]);
