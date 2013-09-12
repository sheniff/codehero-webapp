'use strict';

angular.module('UserService', ['ngResource'])
.factory('UserService', ['$resource', function(resource){
  return resource('/api/v1/user', {},{});
}]);
