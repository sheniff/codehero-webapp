'use strict';

describe('Controller: ChallengesCtrl', function () {

  // load the controller's module
  beforeEach(module('codehero'));

  var ChallengesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChallengesCtrl = $controller('ChallengesCtrl', {
      $scope: scope
    });
  }));

  // it('should attach a list of awesomeThings to the scope', function () {
  //   expect(scope.awesomeThings.length).toBe(3);
  // });
});
