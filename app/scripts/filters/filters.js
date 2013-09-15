window.angular.module('ngch.filters', [])
  .filter('nothing', function(){
    return function(obj, attr){
      return obj;
    }
  });
