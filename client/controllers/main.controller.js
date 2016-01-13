/**
 * ViePrivee
 * Copyright (C) 2015  Juan David CRUZ-GOMEZ
 * juandavidcruz@gmail.com
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
 
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
    
