'use strict';

// ToDo: Modify this file to use angular-socketio :P
function ChallengeCtrl($scope, $rootScope, $window, $timeout, Challenge, SocketIO){

  var submitSolutionSuccess, submitSolutionError,
      log, setUpListeners, update,
      /**
       * Socket IO object
       */
      socket,
      pending;

  $.extend($scope, {

    /**
     * Challenge
     */
    challenge: Challenge.get(
      {id: $scope.challengeID},
      function() {
        log('Welcome to CodeHero - Challenge #' + $scope.challengeID + '!', 'info');
        log('Press Start when you\'re ready to begin!');

        socket = new SocketIO('http://localhost:7777');
        setUpListeners(socket, $scope.userID);
      }
    ),

    /**
     * Challenge's problem
     */
    problem: new Challenge({id: $scope.challengeID}),

    /*
     * Player's Code
     */
    solution: new Challenge({id: $scope.challengeID}),

    /**
     * Other players
     */
    rivals: {},

    /**
     * Player's board main options
     */
    boardOptions: {
      tabSize: 2,
      lineNumbers: true,
      theme: 'ambiance',
      onChange: function(instance, changeObj) {
        if(!socket) return;

        // socket.emit('board_change', changeObj);

        // Temporary way: We send the whole code to the other guy every 1 second
        $timeout.cancel(pending);
        pending = $timeout(function() {
          socket.emit('board_change', $scope.solution.code);
        }, 1000);
      }
    },

    /**
     * Rival's boards main options
     */
    rivalBoardOptions: {
      tabSize: 2,
      theme: 'ambiance',
      readOnly: 'nocursor'
    },

    /* ___________________________________

      Methods
     ___________________________________ */

    submitSolution: function() {
      log('Submitting your code...');

      this.solution.$submitSolution(
        submitSolutionSuccess,
        submitSolutionError
      );
    }

  });

  /* ___________________________________

    Private Methods
   ___________________________________ */

  submitSolutionSuccess = function() {
    log('Submission correct... Still doing nothing :P', 'success');
  };

  submitSolutionError = function(xhr) {
    if(parseInt(xhr.status, 10) >= 500)
      log('Submission failed... Server error... Our baaaad!!! (Try again!)', 'error');
    else
      log('[ERROR #' + xhr.status + '] ' + xhr.data.error, 'warning');
  };

  log = function(message, type) {
    $rootScope.$emit('log:challenge', {
      message: message,
      type: type || ''
    });
  };

  setUpListeners = function(s, user) {
    s.on('connect', function(data){
      console.log('SocketIO connected!', user);
      s.emit('join', user);
    });

    s.on('joined', function(data){
      console.log('Joined: ', data);
    });

    s.on('new_connection', function(user){
      console.log("New guy has connected:", user);
      // Sending that guy this user's info
      s.emit('reveal_to', user.id);

      $scope.rivals[user.id] = user;
      $scope.$apply();
    });

    s.on('user_disconnected', function(user){
      console.log(user.name + " has gone...");

      delete $scope.rivals[user.id];
      $scope.$apply();
    });

    s.on('board_update', function(data){
      // console.log("Changes", data);
      $scope.rivals[data.sender.id].code = data.changeObj;
      $scope.$apply();
      // update(data);
      // CodeHeroWhiteBoard.update(foes['screen_'+data.sender.id+'_'+data.sender.name], data.changeObj);
    });

    s.on('server_messages', function(data){
      console.log('Server: ' + data.message);
    });

    s.on('revealed_user', function(user){
      console.log("Revealed user:", user);

      $scope.rivals[user.id] = user;
      $scope.$apply();
    });

    $($window).on("beforeunload", function(e){
      socket.emit('disconnect');
    });
  };

  // update = function(data) {
  //   var editor = $scope.rivals[data.sender.id].code || '',
  //       status = data.changeObj;

  //   switch(status.origin){
  //     case 'input':
  //     case 'paste':
  //     case 'undo':
  //     case 'redo':
  //       if(status.text.length == 1)
  //         editor.replaceRange(status.text[0], status.from, status.to);
  //       else {
  //         var str = '', i;
  //         for(i = 0; i < status.text.length; i++){
  //           if(i > 0) str += '\n';
  //           str += status.text[i];
  //         }
  //         editor.replaceRange(str, status.from, status.to);
  //       }
  //     break;

  //     case 'delete':
  //       editor.replaceRange('', status.from, status.to);
  //     break;
  //   };

  //   if(status.next)
  //     this.update(editor, status.next);
  // };

}

ChallengeCtrl.$inject = ['$scope', '$rootScope', '$window', '$timeout', 'ChallengeService', 'SocketIOService'];
