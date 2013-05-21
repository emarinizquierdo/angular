
//AMAP Module Creation
var amap = angular.module("amap",[]);

//Directive
amap.directive("angularMap", function(){
	
	var directiveDefinitionObject = {

	    priority: 0,
	    scope: true,
	    template: 	'<div style="margin:20px"><div class="well" id="mapWrapper" style="margin-bottom:10px">' +
	    			'<div id="map-canvas" style="height:100%;"></div></div><label>Archivo de Ruta:</label>' +
	    			'<div class="input-append"><input class="input-large" id="appendedInputButton" type="text" ng-model="route" />' +
  					'<button class="btn" type="button" ng-click="reloadRoute()">Mostrar</button>' +
					'</div>',
	    replace: true,
	    controller: function($scope, $element, $attrs, $transclude) {

	    	$scope.route = "";

			$scope.MapOptions = {
			    zoom: 8,
			    center: new google.maps.LatLng(40.479, -3.589),
			    mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			
			$scope.map = new google.maps.Map($element.find("#map-canvas")[0], $scope.MapOptions);

			var elementWrapper = $element.find("#mapWrapper");
			elementWrapper.height( $element.height() - 100 );

			$scope.reloadRoute = function(){

				var routeKML = new google.maps.KmlLayer({ url : $scope.route });
				routeKML.setMap($scope.map);
			}

		}
	};
	
	return directiveDefinitionObject;
});
