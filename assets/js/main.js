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

	$scope.light1, $scope.ground, $scope.skybox, $scope.cube;

	$scope.tick = function() {
		// $scope.cube.rotation.y += .01;
		// $scope.cube.rotation.x += .01;
		$scope.controls.update();
		$scope.renderer.render($scope.scene, $scope.camera);
		$scope.stats.update();
		requestAnimationFrame( $scope.tick );

	}

	$scope.resizeHandler = function() {
		$scope.camera.aspect = window.innerWidth / window.innerHeight;
		$scope.camera.updateProjectionMatrix();
		$scope.renderer.setSize( window.innerWidth, window.innerHeight );
	}

	$scope.setupScene = function() {
		$scope.scene.fog = new THREE.Fog( 0xffffff, 1, 5000 );
		$scope.scene.fog.color.setHSL( 0.6, 0, 1 );

		//create lighting
		$scope.light1 = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
		$scope.light1.color.setHSL( 0.6, 1, 0.6 );
		$scope.light1.groundColor.setHSL( 0.095, 1, 0.75 );
		$scope.light1.position.set( 0, 500, 0 );
		$scope.scene.add( $scope.light1 );


		//create ground plane
		var groundGeo = new THREE.PlaneGeometry( 10000, 10000 );
		var groundMat = new THREE.MeshPhongMaterial( { ambient: 0xffffff, color: 0xffffff, specular: 0x050505 } );
		groundMat.color.setHSL( 0.095, 1, 0.75 );
		$scope.ground = new THREE.Mesh( groundGeo, groundMat );
		$scope.ground.rotation.x = -Math.PI/2;
		$scope.ground.position.y = -100;
		$scope.ground.receiveShadow = true;
		$scope.scene.add( $scope.ground );

		//create skybox
		var skyGeo = new THREE.SphereGeometry( 1000, 32, 15 );
		var skyMat = new THREE.MeshBasicMaterial( { color: 0xcccccc } );
		$scope.skybox = new THREE.Mesh( skyGeo, skyMat );
		$scope.scene.add( $scope.skybox );		

		
		//create cube
		var geometry = new THREE.CubeGeometry(200,200,200);
		var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
		$scope.cube = new THREE.Mesh( geometry, material );
		$scope.scene.add( $scope.cube );

		$scope.camera.position.z = 250;

	}

	$scope.init = function() {

		$scope.scene = new THREE.Scene();
		$scope.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
		$scope.renderer = new THREE.WebGLRenderer();

		$scope.renderer.setSize( window.innerWidth, window.innerHeight );

		$scope.controls = new THREE.TrackballControls($scope.camera);
		$scope.controls.rotateSpeed = 1.0;
		$scope.controls.zoomSpeed = 1.2;
		$scope.controls.panSpeed = 0.8;

		$scope.controls.noZoom = false;
		$scope.controls.noPan = false;

		$scope.controls.staticMoving = true;
		$scope.controls.dynamicDampingFactor = 0.15;

		$scope.stats = new Stats();
		$scope.stats.domElement.style.position = 'absolute';
		$scope.stats.domElement.style.top = '0px';

		$scope.setupScene();
		$scope.tick();
	}
	$scope.init();

})

app.directive("viewport", function($window) {
	return {
		restrict: "E",
		replace: true,
		scope: {
			resizeFn: "&",
			tickFn: "=",
			renderer: "=",
			stats: "&"
		},
		template: "<div id='viewport''></div>",
		link: function (scope, element, attrs) {
			element.append( scope.renderer.domElement );
			element.append( scope.stats.domElement );

			angular.element($window).bind('resize', scope.resizeFn)
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