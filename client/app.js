/**
 * Created by juancrug on 28/11/15.
 */

'use strict';

angular
    .module( 'viePrivee', [
        'ngRoute',
        'ngResource',
        'ngCookies',
        'ui.router',

        'viePrivee.main'
    ])
    .config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('!');
    }])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise("/");
    }])
    .run(['$state', function($state){
        $state.transitionTo('index');
    }])
