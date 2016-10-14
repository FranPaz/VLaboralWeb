vLaboralApp.controller('loginCtrl', function ($scope, $location, $timeout, authSvc, $state, notificacionesSvc) {
    $scope.loginData = {
        userName: "",
        password: ""
    };

    $scope.message = "";

    $scope.login = function () {
        authSvc.login($scope.loginData).then(function (response) {
            
            if (authSvc.authentication.tipoUser == "empresa") {
                notificacionesSvc.agregarHistorialNotificaciones();                
                $state.go('empresa.ofertas');                
            } else {
                notificacionesSvc.agregarHistorialNotificaciones();
                $state.go('profesional.perfil', { idPro: authSvc.authentication.profesionalId });
            }
        },
         function (err) {
             if (err) {
                 $scope.message = err.error_description;
             }
         });
    };
});