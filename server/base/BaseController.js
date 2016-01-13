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
 * Created by juancrug on 29/11/15.
 */

'use strict';

var _ = require('lodash'),
    q = require('q'),
    fs = require('fs');
    
    
var fileStats = {
      created: "",
      isNew: true,
      modified: false    
    };
    
function _checkFile() {
  var deferred = q.defer();
  fs.stat( 'data/dataFile.json', function(err, data){
    if(err){
      deferred.resolve(false);
    }else{
      deferred.resolve(data);
    }
  });
  return deferred.promise;
}

module.exports = {
    hello: function( req, res ){
    _checkFile()
      .then(function(exists){
        res.send("Hello, this is the base management service:" + exists);
      });
    },
    
    processJson: function( req, res ) {
      var dataFile = req.body,
          deferred = q.defer();
      if(dataFile){
        var result = "";
        _checkFile()
          .then(function(exists){
            if(exists){
              fileStats.isNew = false;
              if(exists.ctime !== fileStats.created) {
                fileStats.modified =  true;
              }
              res.send(fileStats);
            }else{
              fileStats.created = Date.now();
              fs.writeFile('data/dataFile.json', JSON.stringify(dataFile), function(err){
                if(err) res.status(400);
                _checkFile()
                  .then(function(exists){
                    fileStats.created = exists.ctime || Date.now();
                    res.send(fileStats);
                  });
              });
            }
            
          });
      }else{
        res.status(400);
      }
    },
    
    retrieveJson: function( req, res ) {
      _checkFile()
          .then(function(exists){
            if(exists){
              //Take the info
              fs.readFile('data/dataFile.json', function(err, data){
                if(err) res.status(400);
                console.log(data);
                res.send(JSON.parse(data));
                //Modify the filename
                /*fs.rename('data/dataFile.json', 'data/dataFile_'+(Date.now())+'.json', function(err, data){
                  if(err) console.error(err);
                  console.log(data);
                });*/
              });  
            }
          });
    }
};
