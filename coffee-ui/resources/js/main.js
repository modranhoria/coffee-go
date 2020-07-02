var app = angular.module('myApp', 
//		[]
		['angularModalService','ui.sortable']
		);
app.controller('myCtrl', function($scope, $window, $location, $http,ModalService) {

	
	$scope.refresh = function(){
		$http.get("http://localhost:8080/users")
		.then(function(response) {
			$scope.list = response.data;
		});
	}
	
	$scope.refresh();
	
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

	$scope.select = function (){
		for(var index in $scope.list){
			$scope.list[index].build = !$scope.list[index].build; 
		}
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

