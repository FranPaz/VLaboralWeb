vLaboralApp.controller('notificacionesCtrl', function ($scope, $mdMedia, $mdDialog, $ocLazyLoad, $filter, $stateParams,$state //fpaz: definicion de inyectores de dependencias
    , notificacionesDF, authSvc, notificacionesSvc //fpaz: definicion de data factorys
    , listadoNotificaciones, listExperienciasPendientes //fpaz: definicion de parametros de entrada    
    ) {

    //#region fpaz: Inicializacion de variables
    $scope.experienciasPendientesList = listExperienciasPendientes;
    //#endregion


    //#region fpaz: funciones para ver el detalle de cada notificacion
    $scope.verDetalleNotif = function (prmIdNotificacion, prmTipoNotificacion) {
        debugger;
        switch (prmTipoNotificacion)
        {
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