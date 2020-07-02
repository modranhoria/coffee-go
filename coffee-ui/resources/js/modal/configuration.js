var app = angular.module('myApp');

app.controller('configurationController', ['$scope', 'close','$http', function($scope, close, $http) {
	
	$http.get("/getConfiguration")
	.then(function(response) {
		$scope.configuration  = response.data;
	});
  

  $scope.save = function() {
 	  close($scope.configuration, 500); // close, but give 500ms for bootstrap to animate
  };

}]);