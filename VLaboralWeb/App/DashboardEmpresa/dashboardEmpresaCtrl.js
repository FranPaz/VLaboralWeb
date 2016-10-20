vLaboralApp.controller('dashboardEmpresaCtrl', function ($scope, $location,$state, authSvc, notificacionesSvc) {
    $scope.logOut = function () {        
        authSvc.logOut();
        //alert("Deslogueado")
        $scope.authentication.userName = "usuario deslogueado";
        $location.path('/');
    }
    //#region fpaz: Inicializacion de variables
    $scope.authentication = authSvc.authentication;
    $scope.notificaciones = notificacionesSvc.obtenerNotificaciones;

    $scope.countNotifNoLeidas = function () {//fpaz: funcion para obtener la cantidad de notificaciones si leer
        var count = 0;
        angular.forEach($scope.notificaciones.all, function (n) {
            count += n.FechaLectura == null ? 1 : 0;
        });
        return count;
    }
    //#endregion

    //#region fpaz: funciones para ver el detalle de cada notificacion
    $scope.verDetalleNotif = function (prmIdNotificacion, prmTipoNotificacion) {

        switch (prmTipoNotificacion) {
            case "EXP":
                $state.go('empresa.centroNotificaciones.experiencia');
                break;
            case "EXPVER":
                '';
                break;
            case "POS":
                $state.go('empresa.centroNotificaciones.postulacion', { prmIdNotificacion: prmIdNotificacion, prmTipoNotificacion: prmTipoNotificacion });
                break;
            case "ETAP":
                ''
                break;
            default:
                alert('No Existe el Tipo de Notificacion');
                break;
        }
    }
    //#endregion
});