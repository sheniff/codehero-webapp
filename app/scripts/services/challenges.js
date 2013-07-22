'use strict';

angular.module('ChallengeService', ['ngResource'])
.factory('ChallengeService', ['$resource', function(resource){
  return resource('/api/v1/challenges/:id/:nested', {
    id: '@id'
  },{

    getProblem: {
      method: 'GET',
      params: { nested: 'problem' }
    },

    submitSolution: {
      method: 'POST',
      params: { nested: 'solution' }
    }

  });
}]);
