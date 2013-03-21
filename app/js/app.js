'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'flickrCarousel']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: OnNavigate });
    $routeProvider.when('/demos/01/demo/01', {templateUrl: 'partials/demo01.html', controller: OnNavigate });
    $routeProvider.when('/demos/01/demo/02', {templateUrl: 'partials/demo02.html', controller: OnNavigate });
    $routeProvider.when('/demos/01/demo/04', {templateUrl: 'partials/demo04.html', controller: OnNavigate });
    $routeProvider.otherwise({redirectTo: '/home'});
  }]);
