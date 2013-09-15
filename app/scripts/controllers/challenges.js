'use strict';

function ChallengesCtrl($scope, Challenge) {

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

}

ChallengesCtrl.$inject = ['$scope', 'ChallengeService'];
