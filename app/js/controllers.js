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
	
}

