var app = angular.module('myApp',
//		[]
	['angularModalService','ui.sortable']
);
app.controller('myCtrl', function($scope, $window, $location, $http,ModalService) {

	// INSECURE! Just for testing purpose!
	var auth = window.btoa("admin@coffee:admin")
	$scope.newOrder={};

	var config = {
		headers : {
			'Content-Type': 'application/json',
			"Authorization": "Basic " + auth
		},
		withCredentials: true
	}


	$scope.loadorders = function(){
		$http.get("http://localhost:8080/orders/all", config)
			.then(function(response) {
				$scope.orders = response.data;
			});
	}


	$scope.loadorders();
	var empid = 1;
	$scope.saveRecord = function(newOrder){
		if(newOrder.id == null){
			newOrder.id = empid++;
			$scope.orders.push(newOrder);
		}

		$http.post('http://localhost:8080/orders',newOrder, config)
			.success(function (data, status, headers, config) {
				$scope.log = data;
				$scope.loadorders();
			})
			.error(function (data, status, header, config) {
				$scope.log = "Data: " + data +
					"<hr />status: " + status +
					"<hr />headers: " + header +
					"<hr />config: " + config;
			});

		$scope.newOrder={};

	}
	$scope.delete = function(id){
		for(i in $scope.orders){
			if($scope.orders[i].id == id){
				$http.delete('http://localhost:8080/orders/'+id, config)
					.success(function (data, status, headers, config) {
						$scope.orders.splice(i,1);
						$scope.log = data;
					})
					.error(function (data, status, header, config) {
						$scope.log = "Data: " + data +
							"<hr />status: " + status +
							"<hr />headers: " + header +
							"<hr />config: " + config;
					});
				$scope.newOrder={};
			}
		}
	}
	$scope.edit = function(id){
		for(i in $scope.orders){
			if($scope.orders[i].id == id){
				$scope.newOrder = angular.copy($scope.orders[i]);
			}
		}
	}



});

