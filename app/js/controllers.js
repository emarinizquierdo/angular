'use strict';

/* Controllers */

function MenuController($scope, $rootScope, $http, $location){

	$http.get('data/menu.json').success(function(data) {
	    $scope.items = data;
	    $scope.items.forEach(function(e){
	    	if(e.submenu.length > 0){
				e.liClass = "dropdown";
			}else{
				e.liClass = "";
			}
	    });
	});

	$scope.path = $location.$$path;

	$scope.$on("navigate", function() {
		$scope.path = $location.$$path;
		$scope.isActive();

	});

	$scope.isDropdown  = function ( p_submenu ){

		if( p_submenu.length > 0 ){
			return 'dropdown';
		}else{
			return '';
		}
	}
	$scope.isActive  = function ( p_path ){

		if( p_path && $scope.path.indexOf(p_path.substr(1)) >= 0 ){
			return 'active';
		}else{
			return '';
		}
	}

}

function OnNavigate($scope, $rootScope, $location){
	
	$rootScope.$broadcast("navigate");
	prettyPrint();
}

function ToDoList($scope, $http){

    $scope.textInput = "";
    $scope.textInfo = "Yeah! Nothing to do!";
    $scope.textWarning = "";
    $scope.warning = false;
    $scope.items = [];

    window.WebSocket = window.WebSocket || window.MozWebSocket;

    if (!window.WebSocket) {
        $scope.$apply(function(){
        	$scope.textWarning =      "I'm sorry, your browser not support"
        							+ "websocket technology yet";
        });
        $scope.warning = true;
        return;
    }
 
    // open connection
    var connection = new WebSocket('ws://eduardomarin-7304.onmodulus.net');
 
    connection.onopen = function () {
        // first we want users to enter their names
        //input.removeAttr('disabled');
    };
 
    connection.onerror = function (error) {
        // just in there were some problems with conenction...
        $scope.$apply(function(){
        	$scope.textWarning =   "I'm sorry, there is a proble with your "
                            	 + "conection, or server is down.";
        });
        $scope.warning = true;
    };
 
    // most important part - incoming messages
    connection.onmessage = function (message) {
        // try to parse JSON message. Because we know that the server always returns
        // JSON this should work without any problem but we should make sure that
        // the massage is not chunked or otherwise damaged.
        try {
            var json = JSON.parse(message.data);
        } catch (e) {
            console.log('No parece un JSON válido: ', message.data);
            return;
        }
 
        // NOTE: if you're not sure about the JSON structure
        // check the server source code above
        if (json.type === 'history') { // entire message history
            $scope.$apply(function(){
            	$scope.items = json.data;
        	});

        } else if (json.type === 'message') { // it's a single message
            //input.removeAttr('disabled'); // let the user write another message
            $scope.$apply(function(){
            	$scope.items.push(json.data);
            });            
        } else if (json.type === 'reset') { // it's a single message
            $scope.$apply(function(){
            	$scope.items = [];
            });
        } else {
            console.log('Hmm..., Nunca he visto un JSON como este: ', json);
        }
    };
 
    /**
     * Send mesage when user presses Enter key
     */
    $scope.sendItem = function() {
    	
        var msg = {
        	  type : "message"
        	, text : $scope.textInput
        }

        if (!msg) {
            return;
        }

        var json = JSON.stringify(msg);
        // send the message as an ordinary text
        connection.send(json);
        $scope.textInput = "";
        
    }
 
    /**
     * This method is optional. If the server wasn't able to respond to the
     * in 3 seconds then show some error message to notify the user that
     * something is wrong.
     */
    setInterval(function() {
        if (connection.readyState !== 1) {
        	$scope.$apply(function(){
            	$scope.textWarning =   "I'm sorry. We can't connect "
                                	 + "to Websocket server.";
            });
            $scope.warning = true;
        } else {
        	$scope.warning = false;
        }
    }, 3000);


	$scope.removeItem  = function ( p_item ){

		connection.send(JSON.stringify({type : "remove", text : p_item }));
	}
}