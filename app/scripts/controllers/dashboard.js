'use strict';

window.angular.module('ngch.controllers.dashboard', [])
  .controller('DashboardCtrl', ['$scope', 'ChallengeService',
    function ($scope, Challenge) {

      var successCallback = function(data) {
        $scope.challenges.push(data);
        $scope.newChallenge = new Challenge();
      },
      errorCallback = function(xhr) {
        console.log('Error', xhr);
      };

      angular.extend($scope, {

        challenges: Challenge.query(),
        newChallenge: new Challenge(),

        create: function() {
          $scope.newChallenge.$save(successCallback, errorCallback);
        }

      });

    }]);
