'use strict';

angular.module('flickrService', [])
	.factory('FlickrService', ['$http', function($http) {
		return {
	       getPhotos: function( p_gallery_id, callback) {
	       	  
	          var _url = 'http://api.flickr.com/services/rest/';
	          $http({
	          	  method: "JSONP"
	          	, url : _url
	          	, params : {
	          		  method : 'flickr.photosets.getPhotos'
	          		, api_key : 'a6e0d690f58e8ef6c104f10e497faa84'
	          		, photoset_id : p_gallery_id
	          		, format : 'json'
	          		, jsoncallback : 'JSON_CALLBACK'
	          	  }
	          }).success(function(data) {
	          	callback(data);          
	          });
	       }
	   }
   	}]);