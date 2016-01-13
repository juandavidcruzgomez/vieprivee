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

angular
    .module('viePrivee.main')
    .directive( 'graph',function(){
            return {
                restrict: 'E',
                templateUrl: 'views/canvas.view.html',
                scope: {
                    graphdata: '='
                },
                link: function (scope, elem, attrs) {
                
                  var width = 720,
                  height = 500;

                  var color = function(type) {
                    if(type === "person"){
                      return "#FF0000";
                    }else{
                      return "#00FF00";
                    }
                  }

                  var force = d3.layout.force()
                      .charge(-120)
                      .linkDistance(30)
                      .size([width, height]);

                  var svg = d3.select("#gcontainer").append("svg")
                      .attr("width", width)
                      .attr("height", height);
                    
                    var graph = {
                      nodes: [],
                      links: []
                    };
                    
                    var extractUrl = function(url) {
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
                    
                    var nodeIdx = [];
                    
                    var data = scope.graphdata;
                    
                    function draw(data) {
                      var keys = Object.keys(data);
                      
                      keys.forEach(function(key){
                        var srcIdx = nodeIdx.indexOf(key);
                        if(srcIdx === -1 ){
                          nodeIdx.push(key);
                          graph.nodes.push({
                            name: key,
                            type: "person"
                          });
                          srcIdx = graph.nodes.length - 1;
                        }
                        
                        var urls = scope.graphdata[key].content;
                        urls.forEach(function(url){
                          var justUrl = extractUrl(url);
                          var tgtIdx = nodeIdx.indexOf(justUrl);
                          if(tgtIdx === -1 ) {
                            nodeIdx.push(justUrl);
                            graph.nodes.push({
                              name: justUrl,
                              type: "site"
                            });
                            tgtIdx = graph.nodes.length - 1;
                          }
                          graph.links.push({
                            "source": srcIdx,
                            "target": tgtIdx,
                            "value": 1 
                          });
                        });
                      });
                      
                      force
                          .nodes(graph.nodes)
                          .links(graph.links)
                          .start();

                      var link = svg.selectAll(".link")
                          .data(graph.links)
                        .enter().append("line")
                          .attr("class", "link")
                          .style("stroke-width", function(d) { return Math.sqrt(d.value); });

                      var node = svg.selectAll(".node")
                          .data(graph.nodes)
                        .enter().append("circle")
                          .attr("class", "node")
                          .attr("r", 5)
                          .style("fill", function(d) { return color(d.type); })
                          .call(force.drag);

                      node.append("title")
                          .text(function(d) { return d.name; });

                      force.on("tick", function() {
                        link.attr("x1", function(d) { return d.source.x; })
                            .attr("y1", function(d) { return d.source.y; })
                            .attr("x2", function(d) { return d.target.x; })
                            .attr("y2", function(d) { return d.target.y; });

                        node.attr("cx", function(d) { return d.x; })
                            .attr("cy", function(d) { return d.y; });
                      });
                    }
                    
                    if(scope.graphdata && scope.graphdata instanceof Object){
                      draw(scope.graphdata);
                    }
                    
                   
                    scope.$watch('graphdata', function (newVal, oldVal) {
                      if(newVal && newVal !== oldVal){
                        draw(newVal);
                      }
                        //console.log(newVal);
                        //console.log(oldVal);
                        //console.log(scope.graphdata);
                    }, true);
                }
            };
        });
