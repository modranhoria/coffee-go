var app = angular.module('myApp');

app.controller('loadProfileController', ['$scope', 'close','$http', function($scope, close, $http) {
	
	$scope.loadProfiles = function(){
		$http.get("/loadProfiles")
		.then(function(response) {
			$scope.profiles  = response.data;
		});
		
	}
	$scope.loadProfiles()
	
	$scope.delete = function(item){
		var config = {
				headers : {
					'Content-Type': 'application/json'
				}
		}
		$http.post('/delete',item, config)
		.success(function (data, status, headers, config) {
			$scope.loadProfiles();
		})
		.error(function (data, status, header, config) {
		});
	}
  

  $scope.close = function(item) {
 	  close(item, 500); // close, but give 500ms for bootstrap to animate
  };

}]);