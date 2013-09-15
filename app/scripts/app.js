'use strict';

// App entry point
var codehero = window.angular.module('codehero', [
  'ui',
  'ngch.routes',
  'ngch.filters',
  'ngch.services',
  'ngch.controllers'
]);

window.angular.module('ngch.controllers', [
  'ngch.controllers.header',
  'ngch.controllers.challenges'
]);

window.angular.module('ngch.services', [
  'ngch.services.SocketIO',
  'ngch.services.Global',
  'ngch.services.Challenge'
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
