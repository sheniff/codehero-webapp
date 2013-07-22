'use strict';

describe('Controller: ChallengesCtrl', function () {

  beforeEach(function(){
    this.addMatchers(Mocks.matchers);
  });

  // load the controller's module
  beforeEach(module('codehero'));

  var ChallengesCtrl, scope, $httpBackend,
  serverUrl = 'http://localhost',
  challengesUrl = challengesUrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {
    $httpBackend = _$httpBackend_;

    $httpBackend.when('GET', challengesUrl)
      .respond(Mocks.challenges);
    $httpBackend.when('POST', challengesUrl, Mocks.challenge)
      .respond(201, Mocks.challenge);

    scope = $rootScope.$new();
    ChallengesCtrl = $controller('ChallengesCtrl', {
      $scope: scope
    });
  }));

  it("should fetch all the created challenges", function() {
    expect(scope.challenges.length).toEqual(0);
    $httpBackend.flush();
    expect(scope.challenges).toEqualData(Mocks.challenges);
  });

  describe("creating a new challenge", function() {
    beforeEach(function() {
      scope.newChallenge.name = Mocks.challenge.name;
      $httpBackend.flush();   // Cleaning previous calls
    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it("should clean the form when saved properly", function() {
      $httpBackend.expectPOST(challengesUrl, Mocks.challenge);
      scope.create();
      $httpBackend.flush();
      expect(scope.newChallenge.name).toBeUndefined();
    });

    it("should keep creation data if an error happens in saving", function() {
      $httpBackend.expectPOST(challengesUrl, {name: null}).respond(406);
      scope.newChallenge.name = null;
      scope.create();
      $httpBackend.flush();
      expect(scope.newChallenge.name).toBeDefined();
    });

  });

});
