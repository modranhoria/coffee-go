var app = angular.module('myApp');

app.controller('saveProfileController', ['$scope', 'close','$http', function($scope, close,$http) {
	$scope.profileName = null;	
	
	$http.get("/loadProfiles")
	.then(function(response) {
		$scope.profiles  = response.data;
	});

  $scope.save = function(profileName) {
	  
	  if(profileName){
		  close(profileName, 500); 
	  }else{
		  close($scope.profileName, 500); 
	  }
  };

}]);