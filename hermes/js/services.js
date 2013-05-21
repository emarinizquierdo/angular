'use strict';

/* Services */
angular.module("services",[])
.factory("FBase", ['$http', function($http) {

	var myDataRef = new Firebase('https://hermes.firebaseIO.com/');

	var authClient = new FirebaseAuthClient(myDataRef, function(error, user) {
	  if (error) {
	    // an error occurred while attempting login
	    console.log(error);
	  } else if (user) {
	    // user authenticated with Firebase
	    console.log('User ID: ' + user.id + ', Email: ' + user.email + ', Provider: ' + user.provider);
	  } else {
	    // user is logged out
	    console.log("user is logged out");
	  }
	});

	return { 

		

		hermes : function(){

			return myDataRef;

		},

		createAccount : function( p_email, p_password, p_callback ){

			var Users = new Firebase('https://hermes.firebaseIO.com/users');

			Users.on('value', function(snapshot) {
				var users = snapshot.val();
				Users.off('value');
				var existUser = false;

				if(users){
					$.each(users, function(index, user){
						if(user.email == p_email){
							existUser = true;
						}
					});

				}
				
				if(!existUser){
					var UserObject = new Firebase('https://hermes.firebaseIO.com/users/'+guid());
					var user = { "email" : p_email, "password" : Sha1.hash(p_password,true) };
					UserObject.set( user );
					authClient.createUser(p_email, p_password, function(error, user) {
					  if (!error) {
					   	console.log('User ID: ' + user.id + ', Email: ' + user.email + ', Provider: ' + user.provider);
					    p_callback(true);
					  }
					});
										
				}else{
					p_callback(false);
				}
			});		

		},

		getDevices : function( p_user, p_callback){


		}
	}

}])
.factory("Service", ['$http', function($http) {

	var myDataRef = new Firebase('https://hermes.firebaseIO.com/');

	var authClient = new FirebaseAuthClient(myDataRef, function(error, user) {
	  if (error) {
	    // an error occurred while attempting login
	    console.log(error);
	  } else if (user) {
	    // user authenticated with Firebase
	    console.log('User ID: ' + user.id + ', Email: ' + user.email + ', Provider: ' + user.provider);
	  } else {
	    // user is logged out
	    console.log("user is logged out");
	  }
	});

	return {

		login : function( p_email, p_password, p_rememberme, p_callback ){


			
debugger;
			var url = "http://127.0.0.1:8000";
			var parameters = "login=true&email=" + p_email + "&password=" + Sha1.hash(p_password);
			var config = { headers : { "Content-Type" : "application/x-www-form-urlencoded" } };

			$http.post( url, parameters, config).success(function(data){

				authClient.login('password', {
				  email: p_email,
				  password: p_password
				});
				p_callback(data);

			});

		},

		logout : function( p_callback ){

			var url = "http://127.0.0.1:8000";
			var parameters = "logout=true";
			var config = { headers : { "Content-Type" : "application/x-www-form-urlencoded" } };

			$http.post( url, parameters, config).success(function(data){

				authClient.logout();
				p_callback(data);
				
			});

		}
	}

}]);