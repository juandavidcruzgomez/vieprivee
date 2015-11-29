/**
 * Created by juancrug on 6/2/15.
 */

//From http://www.grobmeier.de/bootstrap-tabs-with-angular-js-25112012.html

'use strict';

angular
    .module('viePrivee.main')
    .directive( 'showtab',function(){
          return {
              link: function (scope, element, attrs) {
                  element.click(function(e) {
                      e.preventDefault();
                      $(element).tab('show');
                  });
              }
          };
        });
