vLaboralApp.controller('postulantesCtrl', function ($scope,$state, $mdMedia, $mdDialog, //iafar: definicion de inyectores de dependencias
     authSvc, postulantesDF,notificacionesSvc,//iafar: definicion de data factorys
     listadoPostulantes, infoPuesto//iafar: definicion de parametros de entrada 
    ) {

    //#region  fpaz: Inicializacion de Variables de Scope
    $scope.postulantes = listadoPostulantes; //variable con el listado de postulantes
    $scope.puesto = infoPuesto; //variable con info del puesto al que el profesional se quiere postular    
    //#endregion

    //#region fpaz: alta de postulacion
    $scope.confirmarPostulacion = function () {        
        postulantesDF.postPostulacion($scope.puesto.Id).then(function (response) {
            console.log('entra a confirmar postulacion');
            notificacionesSvc.enviarNotificacion(response.data);
            alert("Postulacion Exitosa");
            $mdDialog.hide();
        },
    function (err) {
        if (err) {
            $scope.error = err;
            alert("Error al Guardar la Postulacion: " + $scope.error.Message);
        }
    });
    };


    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    //#endregion

});