/**
 * Created by juancrug on 28/11/15.
 */

'use strict';

var BaseC = require('./BaseController');

module.exports = function( router ){
    router.get( '/Base/hello', BaseC.hello );
    
    router.get( '/Base/retrieve', BaseC.retrieveJson );
    
    router.post( '/Base/process', BaseC.processJson );
};
