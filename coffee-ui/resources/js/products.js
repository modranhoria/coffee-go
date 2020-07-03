var app = angular.module('myApp',
//		[]
	['angularModalService','ui.sortable']
);
app.controller('myCtrl', function($scope, $window, $location, $http,ModalService) {

	// INSECURE! Just for testing purpose!
	var auth = window.btoa("admin@coffee:admin")
	$scope.newProduct={};

	var config = {
		headers : {
			'Content-Type': 'application/json',
			"Authorization": "Basic " + auth
		},
		withCredentials: true
	}


	$scope.loadProducts = function(){
		$http.get("http://localhost:8080/products/all", config)
			.then(function(response) {
				$scope.products = response.data;
			});
	}

	$scope.importProducts = function(){
		$http.get("http://localhost:8080/products/import", config)
			.then(function(response) {
				$scope.products = response.data;
				$scope.loadProducts();
			});
	}


	$scope.loadProducts();
	var empid = 1;
	$scope.saveRecord = function(newProduct){
		if(newProduct.id == null){
			newProduct.id = empid++;
			$scope.products.push(newProduct);
		}

		$http.post('http://localhost:8080/products',newProduct, config)
			.success(function (data, status, headers, config) {
				$scope.log = data;
				$scope.loadProducts();
			})
			.error(function (data, status, header, config) {
				$scope.log = "Data: " + data +
					"<hr />status: " + status +
					"<hr />headers: " + header +
					"<hr />config: " + config;
			});

		$scope.newProduct={};

	}
	$scope.delete = function(id){
		for(i in $scope.products){
			if($scope.products[i].id == id){
				$http.delete('http://localhost:8080/products/'+id, config)
					.success(function (data, status, headers, config) {
						$scope.products.splice(i,1);
						$scope.log = data;
						$scope.loadProducts();
					})
					.error(function (data, status, header, config) {
						$scope.log = "Data: " + data +
							"<hr />status: " + status +
							"<hr />headers: " + header +
							"<hr />config: " + config;
					});
				$scope.newProduct={};
			}
		}
	}
	$scope.edit = function(id){
		for(i in $scope.products){
			if($scope.products[i].id == id){
				$scope.newProduct = angular.copy($scope.products[i]);
			}
		}
	}



});

