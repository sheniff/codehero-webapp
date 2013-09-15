'use strict';

window.angular.module('ngch.controllers.challenges', [])
  .controller('ChallengesCtrl', ['$scope', '$routeParams', 'GlobalService', 'ChallengeService',
    function ($scope, $routeParams, Global, Challenge) {

      var createOK = function(data) {
        $scope.challenges.push(data);
      },
      editOK = function(data) {
      },
      KO = function(xhr) {
        console.log('Error', xhr);
      };

      angular.extend($scope, {

        global: Global,

        filter: {
          created: function(elem) {
            return elem.user_id === Global.currentUser().id;
          },
          joined: function(elem) {
            return elem.user_id !== Global.currentUser().id;
          }
        },

        create: function() {
          var challenge = new Challenge({
            name: $scope.challenge.name
          });

          challenge.$save(createOK, KO);
          $scope.challenge.name = '';
        },

        find: function(query) {
          Challenge.query(query, function(challenges) {
            $scope.challenges = challenges;
          });
        },

        findOne: function() {
          Challenge.get({id: $routeParams.challengeId}, function(challenge) {
            $scope.challenge = challenge;
          });
        },

        update: function() {
          var challenge = $scope.challenge;
          challenge.$update(editOK, KO);
        },

        destroy: function(challenge) {
          challenge.$remove();
          for (var i in $scope.challenges) {
            if ($scope.challenges[i] == challenge) {
              $scope.challenges.splice(i, 1)
            }
          }
        }
      });

    }]);
