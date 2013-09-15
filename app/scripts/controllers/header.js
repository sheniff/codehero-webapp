'use strict';

window.angular.module('ngch.controllers.header', [])
  .controller('HeaderCtrl', ['$scope', '$routeParams', 'GlobalService',
    function ($scope, $routeParams, Global) {

      angular.extend($scope, {

        global: Global

      });

    }]);
