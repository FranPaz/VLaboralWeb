vLaboralApp.controller('dashboardProfesionalCtrl', function ($scope, $location, authSvc) {
    $scope.logOut = function () {
        authSvc.logOut();
        alert("Deslogueado")
        $scope.authentication.userName = "usuario deslogueado";
        $location.path('/');
    }

    $scope.authentication = authSvc.authentication;
});