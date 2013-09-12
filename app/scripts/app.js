'use strict';

// App entry point
var codehero = angular.module('codehero', [
  'ui',
  'codehero.Routes',
  'ChallengeService',
  'SocketIOService',
  'ngch.controllers'
]);

window.angular.module('ngch.controllers', [
  'ngch.controllers.user'
]);

codehero.value('ui.config', {
  select2: {},
  date: {
    dayNamesMin: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
    minDate: 0,
    nextText: '',
    prevText: ''
  },
  calendar: {
    defaultView: 'agendaWeek',
    editable: true,
    selectable: true,
    selectHelper: true
  }
});

codehero.config(['$httpProvider', function($httpProvider){
  $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
  $httpProvider.defaults.withCredentials = true;
}]);
