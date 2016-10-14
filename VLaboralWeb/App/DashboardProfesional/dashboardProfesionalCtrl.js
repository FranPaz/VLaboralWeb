vLaboralApp.controller('dashboardProfesionalCtrl', function ($scope, $location, authSvc, notificacionesSvc) {
    $scope.logOut = function () {
        authSvc.logOut();
        //alert("Deslogueado")
        $scope.authentication.userName = "usuario deslogueado";
        $location.path('/');
    }

    $scope.authentication = authSvc.authentication;
    $scope.notificaciones = notificacionesSvc.obtenerNotificaciones;
});