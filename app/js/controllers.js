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

	});

}

function OnNavigate($scope, $rootScope, $location){
	
	$rootScope.$broadcast("navigate");
	
}

