/**
 * Created by juancrug on 3/15/15.
 */

'use strict';

angular
    .module('viePrivee.main')
    .config( ['$stateProvider', function($stateProvider){
        var index = {
            name: 'index',
            url: "/",
            templateUrl: "/views/main.view.html",
            controller: 'MainController'
        };





        $stateProvider.state(index);
    }]);
