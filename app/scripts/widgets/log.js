codehero.directive('log', ['$rootScope',
function factory($rootScope){
  return {
    restrict: 'E',
    templateUrl: '/views/widgets/log.html',
    scope: true,
    link: function($scope, iElm, iAttrs) {

      angular.extend($scope, {

        lines: []

      });

      // Private
      var prepare_line = function(args) {
        return {
          message: args.message || '',
          type: args.type || '',
          time: new Date()
        };
      };

      // Listen to new messages
      iAttrs.tag && $rootScope.$on('log:'+iAttrs.tag, function(event, args) {
        $scope.lines.push(prepare_line(args));
      });

      $rootScope.$on('log:all', function(event, args) {
        $scope.lines.push(prepare_line(args));
      });

    }
  }
}]);
