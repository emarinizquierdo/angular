"use strict";
 
// Service port 
var webSocketsServerPort = process.env.PORT;
 
// websocket and http servers
var webSocketServer = require('websocket').server;
var http = require('http');
 
/**
 * Global variables
 */
// latest 100 to do items
var todoList = [ ];
// list of currently connected clients (users)
var clients = [ ];
 
/**
 * Helper function for escaping input strings
 */
function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;')
                      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
 
/**
 * HTTP server
 */
var server = http.createServer(function(request, response) {
    // It is not important for us, we will write on websockets
});

//Bind websocket port
server.listen(webSocketsServerPort, function() {
    console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
});
 
/**
 * WebSocket server
 */
var wsServer = new webSocketServer({
    httpServer: server
});

//Start when there is a request from a client
wsServer.on('request', function(request) {
    console.log((new Date()) + ' Connection from origin ' + request.origin + '.');

    var connection = request.accept(null, request.origin); 
    // we need to know client index to remove them on 'close' event
    var index = clients.push(connection) - 1;
 
    console.log((new Date()) + ' Connection accepted.');
 
    // send back todoList
    if (todoList.length > 0) {
        connection.sendUTF(JSON.stringify( { type: 'history', data: todoList } ));
    }
 
    // user sent some message
    connection.on('message', function(message) {

        if (message.type === 'utf8') { // accept only text

            //get data object from message
            var data = JSON.parse(message.utf8Data);

            //if it is a message, a item, we add to todoList
            if(data.type == "message"){
              //but if it is a "reset" word, we delete all items
              if(data.text == "reset"){
                todoList = [];
                 // broadcast message to all connected clients
                var json = JSON.stringify({ type:'reset', data: {} });
                for (var i=0; i < clients.length; i++) {
                    clients[i].sendUTF(json);
                }
              }else{
                // we check if this item is already in todoList
                var _i = 0;
                for(_i = 0; _i < todoList.length; _i++ ){
                  if ( todoList[_i].text == data.text ){
                    return false;
                  }
                }
                // we want to keep todoList of all sent messages
                var item = {
                    text: htmlEntities(data.text)
                };

                todoList.push(item);
                todoList = todoList.slice(-100);

                // broadcast message to all connected clients
                var json = JSON.stringify({ type:'message', data: item });
                for (var i=0; i < clients.length; i++) {
                    clients[i].sendUTF(json);
                }
              }
            //if data.type is "remove", we have to remove only this item
            }else if (data.type == "remove"){
              var _i = 0;
              for(_i = 0; _i < todoList.length; _i++ ){
                if ( todoList[_i].text == data.text ){
                  todoList.splice(_i,1);
                  for (_i=0; _i < clients.length; _i++) {
                    clients[_i].sendUTF(JSON.stringify({ 
                          type: 'history'
                        , data: todoList 
                      })
                    );
                  }
                  return false;
                }
              }

            }
            
        }
    });
 
    // user disconnected
    connection.on('close', function(connection) {
      clients.splice(index, 1);
    });
 
});