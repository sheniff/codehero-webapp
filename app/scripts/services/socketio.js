'use strict';

window.angular.module('ngch.services.SocketIO', ['ngResource'])
  .factory('SocketIOService', [function(){

    return function(url) {
      return io.connect(url);
    };

  }]);
