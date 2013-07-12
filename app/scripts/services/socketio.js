angular.module('SocketIOService', ['ngResource'])
.factory('SocketIOService', [function(){

  return function(url) {
    return io.connect(url);
  };

}]);
