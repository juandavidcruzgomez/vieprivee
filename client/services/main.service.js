/**
 * Created by juancrug on 4/8/15.
 */

'use strict';

angular
    .module('viePrivee.main')
    .service('ConnData', ['$resource', function ConnData($resource){
        return $resource('/api/Base/:method', {dataID: '@id'}, {
            'retrieve'    :   {method: 'GET', params:{method: 'retrieve'}},
            'check'    :   {method: 'GET', params:{method: 'check'}}
        });
    }]);
