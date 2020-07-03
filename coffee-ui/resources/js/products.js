var app = angular.module('myApp',
//		[]
	['angularModalService','ui.sortable']
);
app.controller('myCtrl', function($scope, $window, $location, $http,ModalService) {

	// INSECURE! Just for testing purpose!
	var auth = window.btoa("admin@coffee:admin")

	var config = {
		headers : {
			'Content-Type': 'application/json',
			"Authorization": "Basic " + auth
		},
		withCredentials: true
	}

	$scope.newProduct={};

	$scope.loadProducts = function(){
		$http.get("http://localhost:8080/products/all", config)
			.then(function(response) {
				$scope.products = response.data;
			});
	}


	$scope.loadProducts();
	var empid = 1;
	$scope.saveRecord = function(newProduct){
		if(newProduct.id == null){
			newProduct.id = empid++;
			$scope.products.push(newProduct);
		}else{
			for(i in $scope.products){
				if($scope.products[i].id == newProduct.id){
					$scope.products[i] = newProduct;
				}
			}
		}


		var request= {product : newProduct}


		$http.post('http://localhost:8080/products/product',request, config)
			.success(function (data, status, headers, config) {
				$scope.log = data;
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
				var config = {
					headers : {
						'Content-Type': 'application/json'
					}
				}
				$http.delete('http://localhost:8080/products/'+id, config)
					.success(function (data, status, headers, config) {
						$scope.products.splice(i,1);
						$scope.log = data;
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

