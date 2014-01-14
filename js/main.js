var app = angular.module("App", []);

app.controller("ViewportController", 
    function ($scope) {
        $scope.test = "ViewportController";
})

app.controller("ControlbarController", 
    function ($scope) {

        $scope.test = "ControlbarController";

})