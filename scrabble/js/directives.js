'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
  .directive('baseChip', function(){
    return {
      replace: true,
      transclude: true,
      templateUrl: 'partials/baseChip.html',
      // The linking function will add behavior to the template
      link: function(scope, element, attrs) {
            var stage = new Kinetic.Stage({
	        container: 'baseChip',
	        width: 60,
	        height: 60
	      });

	      var layer = new Kinetic.Layer();

	      var suplayer = new Kinetic.Rect({
	        x: 6,
	        y: 6,
	        width: 50,
	        height: 50,
	        fillLinearGradientStartPoint: [-25, 25],
          	fillLinearGradientEndPoint: [25, -25],
          	fillLinearGradientColorStops: [0, '#FAD5A8', 1, '#FDEFC2'],
	        cornerRadius: 4,
	      });


	      var inflayer = new Kinetic.Rect({
	        x: 0,
	        y: 0,
	        width: 59,
	        height: 59,
	        fillLinearGradientStartPoint: [25, 25],
          	fillLinearGradientEndPoint: [-25, -25],
          	fillLinearGradientColorStops: [0, '#DDBD94', 0.5, '#EDE0B4'],
          	lineJoin: 'round',
	        stroke: '#836F56',
	        cornerRadius: 4,
	        strokeWidth: 4
	      });
	      
	      var letter = new Kinetic.Text({
	        x: 12,
	        y: 6,
	        text: 'L',
	        fontSize: 30,
	        fontFamily: 'Calibri',
	        fill: '#000000',
	        width: 50,
	        height: 50,
	        padding: 8,
	      });
	      // add the shape to the layer
	      layer.add(inflayer);
	      layer.add(suplayer);
	      layer.add(letter);

	      // add the layer to the stage
	      stage.add(layer);

	      $("baseChip").draggable();
      }
    }
  });
 