var app = angular.module("App", []);

app.factory('animate', function($window, $rootScope) {
  var requestAnimationFrame = $window.requestAnimationFrame ||
       $window.mozRequestAnimationFrame ||
       $window.msRequestAnimationFrame ||
       $window.webkitRequestAnimationFrame;
     
   return function(tick) {
       requestAnimationFrame(function() {
           $rootScope.$apply(tick);
       });
   };
});

app.controller("AppController", function($scope, $window) {
	$scope.scene, $scope.camera, $scope.renderer, $scope.controls, $scope.stats;

	$scope.tick = function() {
		requestAnimationFrame( $scope.tick );

	}

	$scope.resizeHandler = function() {
		console.log("resize");
		$scope.camera.aspect = window.innerWidth / window.innerHeight;
		$scope.camera.updateProjectionMatrix();
		$scope.renderer.setSize( window.innerWidth, window.innerHeight );
	}

	$scope.init = function() {

		$scope.scene = new THREE.Scene();
		$scope.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
		$scope.renderer = new THREE.WebGLRenderer();

		$scope.renderer.setSize( window.innerWidth, window.innerHeight );

		// $scope.controls = new THREE.TrackballControls($scope.camera);

		$scope.stats = new Stats();
		$scope.stats.domElement.style.position = 'absolute';
		$scope.stats.domElement.style.top = '0px';
		$scope.stats.domElement.style.right = '0px';


		// var w = angular.element($window);
		// w.bind('resize', function() {
		// 	$scope.camera.aspect = window.innerWidth / window.innerHeight;
		// 	$scope.camera.updateProjectionMatrix();
		// 	$scope.renderer.setSize( window.innerWidth, window.innerHeight );
		// });

		// var geometry = new THREE.CubeGeometry(20,20,20);
		// var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
		// var cube = new THREE.Mesh( geometry, material );
		// $scope.scene.add( cube );

		// $scope.camera.position.z = 250;

		$scope.tick();
	}
	$scope.init();

})

app.directive("viewport", function($window) {
	return {
		restrict: "E",
		replace: true,
		scope: {
			resizeFn: "=",
			tickFn: "=",
			renderer: "=",
			stats: "&"
		},
		template: "<div id='viewport''></div>",
		link: function (scope, element, attrs) {
			element.append( scope.renderer.domElement );
			element.append( scope.stats.domElement );

			console.log(scope.resizeFn);
			// angular.element($window).bind('resize', scope.resizeFn)
		}
	}
})

/*
app.controller("ControlbarController", 
    function ($scope) {
        $scope.test = "ControlbarController";
})

app.directive("controlbar", function() {
	return {
		restrict: "E",
		replace: true,
		transclude: true,
		// controller: "ControlbarController",
		template: "<div id='controlbar' class='panel' ng-transclude></div>"
	}
})
*/