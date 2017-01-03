vLaboralApp.controller('notificacionesCtrl', function ($scope, $mdMedia, $mdDialog, $ocLazyLoad, $filter, $stateParams,$state //fpaz: definicion de inyectores de dependencias
    , notificacionesDF, authSvc, notificacionesSvc //fpaz: definicion de data factorys
    , listadoNotificaciones, listExperienciasPendientes //fpaz: definicion de parametros de entrada    
    ) {

    //#region fpaz: Inicializacion de variables
    $scope.notificaciones = listadoNotificaciones.Results;
    $scope.experienciasPendientesList = listExperienciasPendientes;
    $scope.mostrarDetalle = false;
    //#endregion


    //#region fpaz: funciones para ver el detalle de cada notificacion
    $scope.verDetalleNotif = function (prmIdNotificacion, prmTipoNotificacion) {
        
        switch (prmTipoNotificacion)
        {
            case "EXP":   
                $state.go('empresa.centroNotificaciones.experiencia', { idExperienciaPendiente: prmIdNotificacion });
                break;
            case "EXPVER":                
                $state.go('profesional.centroNotificaciones.experienciaVerificada', { prmIdNotificacion: prmIdNotificacion, prmTipoNotificacion: prmTipoNotificacion });
                break;
            case "POS":
                $state.go('empresa.centroNotificaciones.postulacion', { prmIdNotificacion: prmIdNotificacion, prmTipoNotificacion: prmTipoNotificacion });
                break;
            case "ETAP":
                $state.go('profesional.centroNotificaciones.etapaAprobada', { prmIdNotificacion: prmIdNotificacion, prmTipoNotificacion: prmTipoNotificacion });
                break;
            case "INV_OFER_PRIV":
                $state.go('profesional.centroNotificaciones.invitacionOfertaPrivada', { prmIdNotificacion: prmIdNotificacion, prmTipoNotificacion: prmTipoNotificacion });
                break;
            default:
                alert('No Existe el Tipo de Notificacion');
                break;
        }
    }
    //#endregion
    
    $scope.ocultarDetalle = function () {
        $scope.mostrarDetalle = false;
    }

});