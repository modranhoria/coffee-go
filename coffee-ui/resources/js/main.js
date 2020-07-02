var app = angular.module('myApp', 
//		[]
		['angularModalService','ui.sortable']
		);
app.controller('myCtrl', function($scope, $window, $location, $http,ModalService) {


	$scope.students = [];
	var empid = 1;
	$scope.saveRecord = function(){
		if($scope.newStudent.id == null){
			$scope.newStudent.id = empid++;
			$scope.students.push($scope.newStudent);
		}else{
			for(i in $scope.students){
				if($scope.students[i].id == $scope.newStudent.id){
					$scope.students[i] = $scope.newStudent;
				}
			}
		}
		$scope.newStudent={};
	}
	$scope.delete = function(id){
		for(i in $scope.students){
			if($scope.students[i].id == id){
				$scope.students.splice(i,1);
				$scope.newStudent={};
			}
		}
	}
	$scope.edit = function(id){
		for(i in $scope.students){
			if($scope.students[i].id == id){
				$scope.newStudent = angular.copy($scope.students[i]);
			}
		}
	}


	$scope.loadProducts = function(){
		$http.get("http://localhost:8080/products/all")
			.then(function(response) {
				$scope.products = response.data;
			});
	}


	$scope.loadProducts();

	$scope.load = function (profile){
		var config = {
				headers : {
					'Content-Type': 'application/json'
				}
		}
		$http.post('/load',profile, config)
		.success(function (data, status, headers, config) {
			$scope.list = data;
		})
		.error(function (data, status, header, config) {
		});
	}
	
	$scope.saveProfile = function() {

 	    ModalService.showModal({
 	      templateUrl: "/js/modal/saveProfile.html",
 	      controller: "saveProfileController"
 	    }).then(function(modal) {
 	      modal.element.modal();
 	      modal.close.then(function(result) {
 	    	  $scope.save(result);
 	      });
 	    });

 	  }
	
	$scope.loadProfile = function() {

 	    ModalService.showModal({
 	      templateUrl: "/js/modal/loadProfile.html",
 	      controller: "loadProfileController"
 	    }).then(function(modal) {
 	      modal.element.modal();
 	      modal.close.then(function(result) {
 	    	  $scope.load(result);
 	      });
 	    });

 	  }

	$scope.order = function() {

		ModalService.showModal({
			templateUrl: "/js/modal/configuration.html",
			controller: "configurationController"
		}).then(function(modal) {
			modal.element.modal();
			modal.close.then(function(result) {
				$scope.updateConfiguration(result);
			});
		});

	}

	 $scope.configuration = function() {

 	    ModalService.showModal({
 	      templateUrl: "/js/modal/configuration.html",
 	      controller: "configurationController"
 	    }).then(function(modal) {
 	      modal.element.modal();
 	      modal.close.then(function(result) {
 	    	  $scope.updateConfiguration(result);
 	      });
 	    });

 	  }

	$scope.updateConfiguration = function(configuration){
		var config = {
			headers : {
				'Content-Type': 'application/json'
			}
		}
		$http.post('/updateConfiguration', configuration, config)
		.success(function (data, status, headers, config) {
			$scope.log = data;
		})
		.error(function (data, status, header, config) {
			$scope.log = "Data: " + data +
			"<hr />status: " + status +
			"<hr />headers: " + header +
			"<hr />config: " + config;
		});
	}

	$scope.build = function(){
		var config = {
				headers : {
					'Content-Type': 'application/json'
				}
		}
		$http.post('/buildLog', $scope.list, config)
		.success(function (data, status, headers, config) {
			$scope.log = data;
		})
		.error(function (data, status, header, config) {
			$scope.log = "Data: " + data +
			"<hr />status: " + status +
			"<hr />headers: " + header +
			"<hr />config: " + config;
		});
	}
	
	$scope.save = function(profileName){
		
		var request= {profileName : profileName,
					tasks: $scope.list	}
						
		var config = {
				headers : {
					'Content-Type': 'application/json'
				}
		}
		$http.post('/save',request, config)
		.success(function (data, status, headers, config) {
			$scope.log = data;
		})
		.error(function (data, status, header, config) {
			$scope.log = "Data: " + data +
			"<hr />status: " + status +
			"<hr />headers: " + header +
			"<hr />config: " + config;
		});
	}

});

