'use strict';

window.angular.module('ngch.controllers.user', [])
  .controller('UserCtrl', function ($scope, User) {

    var successCallback = function(data) {
      console.log('success', data);
    },
    errorCallback = function(xhr) {
      console.log('Error', xhr);
    };

    $scope.user = new User();

    $scope.login = function() {
      $scope.user.$save(successCallback, errorCallback);
    };

  });
