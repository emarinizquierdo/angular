'use strict';

/* Controllers */

angular.module("Controllers", [])
.controller("creationForm", function($scope, $rootScope, FBase){

	$scope.emailInput = "";
	$scope.passwordInput = "";
	$scope.repasswordInput = "";
	$scope.rememberme = false;
	$scope.existUser = false;
	$scope.userCreated = false;

	$scope.FBase = FBase;

	$scope.$watch("emailInput", function(n,o){

		$scope.existUser = false;

    	var pattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/

        if(pattern.test(n) && n != ""){
			$scope.emailInputOk = true;
        	$scope.emailInputBan = false;
        	
        }else if( n != "") {
        	$scope.emailInputOk = false;
        	$scope.emailInputBan = true;
        }else{
        	$scope.emailInputOk = false;
        	$scope.emailInputBan = false;	
        }
    
    });

    $scope.OnSubmit = function(){

    	$scope.FBase.createAccount( $scope.emailInput, $scope.passwordInput, function( p_status ){ 
    		$scope.$apply(function(){ $scope.existUser = !p_status; $scope.userCreated = p_status; });

    		
    	}) ;

    }
})
.controller("loginForm", function($scope, $location, $rootScope, Service){
	
	$scope.emailInput = "";
	$scope.passwordInput = "";
	$scope.accessError = false;

	$scope.Service = Service;

	$scope.OnSubmit = function(){

    	$scope.Service.login( $scope.emailInput, $scope.passwordInput, $scope.rememberme , function( p_status ){ 
    		if(p_status.state == "ok"){
    			document.location = "dashboard.html";
    		}else if (p_status.state == "ko"){
    			$scope.accessError = true;
    		}
    	});
    		
    } ;

})
.controller("navBar", function($scope, $location, $rootScope, Service){

	$scope.User = getCookie("UserEmail");
	$scope.Service = Service;

	$scope.logout = function(){		
		$scope.Service.logout(function( p_status ){ 
    		if(p_status.state == "ok"){
    			document.location = "index.html";
    		}else if (p_status.state == "ko"){
    			$scope.accessError = true;
    		}
    	});
	}
})
.controller("menuController", function($scope, $location, $rootScope){

	$scope.path = $location.$$path;

	$scope.$on("navigate", function() {
		$scope.path = $location.$$path;
		$scope.isActive();

	});

	$scope.isActive  = function ( p_path ){

		if( p_path && $scope.path.indexOf(p_path.substr(1)) >= 0 ){
			return 'active';
		}else{
			return '';
		}
	}

});

function OnNavigate($scope, $rootScope, $location){

	$rootScope.$broadcast("navigate");
	if(!getCookie("UserID") || !getCookie("UserEmail")){
		document.location="index.html";
	}
    
}
