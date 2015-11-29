/**
 * Created by juancrug on 28/11/15.
 */

'use strict';

angular
    .module('viePrivee.main')
    .controller( 'MainController', ['$scope','$state', 'ConnData', function( $scope, $state, ConnData){ 
      $scope.urls = {};
      
      
      $scope.extractBaseUrl = function(url) {
      
        var finalUrl = "";
        //"http://"
        if( url.indexOf("https") !== -1 ){
          var sindex = url.substring(8).indexOf('/');
          if( sindex === -1 ){
            finalUrl = url;
          }else{
            finalUrl = url.substring(0,sindex+8);
          }
        }else{
          sindex = url.substring(7).indexOf('/');
          if( sindex === -1 ){
            finalUrl = url;
          }else{
            finalUrl = url.substring(0,sindex+7);
          }
        }
        
        return finalUrl;
      }
      
      ConnData.retrieve().$promise.then(function(result){
        if( result && result instanceof Object){
          var keys = Object.keys(result);
          keys.forEach(function(origin){
            if( origin !== "$promise" && origin !== "$resolved"){
              if(!$scope.urls[origin]) {
                $scope.urls[origin] = result[origin];
              }else{
                result[origin].content.forEach(function(url){
                  $scope.urls[origin].content.unshift(url);
                });
              }
            }
          });
        }
      });
    }]);
    
