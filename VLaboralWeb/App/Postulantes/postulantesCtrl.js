vLaboralApp.controller('postulantesCtrl', function ($scope,$state, $mdMedia, $mdDialog, //iafar: definicion de inyectores de dependencias
     authSvc, postulantesDF,notificacionesSvc,profesionalesDF,//iafar: definicion de data factorys
     listadoPostulantes, infoPuesto,infoPostulacion//iafar: definicion de parametros de entrada 
    ) {

    //#region  fpaz: Inicializacion de Variables de Scope
    $scope.postulantes = listadoPostulantes; //variable con el listado de postulantes
    $scope.puesto = infoPuesto; //variable con info del puesto al que el profesional se quiere postular    
    $scope.postulacion = infoPostulacion; //fpaz: variable con la info de cada postulacion en particular, se usa en el detalle de notificacion de nueva postulacion en el centro de notificaciones de la empresa
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

    //#region kikepx: modal con el detalle del perfil del postulante
    $scope.postulanteDetalle = function (profesionalId) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
        $mdDialog.show({
            controller: 'profesionalesCtrl',
            templateUrl: 'App/Postulantes/Partials/postulanteDetalle.html',
            parent: angular.element(document.body),
            //targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true,
            resolve: {
                listadoOfertas: function () {
                    return { value: [] };
                },
                rubrosDF: 'rubrosDF',
                habilidadesDF: 'habilidadesDF',
                tiposIdentificacionDF: 'tiposIdentificacionDF',
                listadoRubros: function () {
                    return { value: [] };
                },
                listadoHabilidades: function () {
                    return { value: [] };
                },
                listadoIdentificacionPro: function () {
                    return { value: [] };
                },
                profesionalesDF: 'profesionalesDF',
                infoProfesional: function (profesionalesDF) {

                    return profesionalesDF.getProfesional(profesionalId);
                },
                listadoOfertas: function () {
                    return { value: [] };
                },
                selectedPro: function () {
                    return [];
                },
                profesionalesList: function () {
                    return { value: [] };
                },
                listOpcionesFiltrosOfertas: function () {
                    return { value: [] };
                },
                listOpcionesFiltrosProfesionales: function () {
                    return { value: [] };
                },
                loadProfesionalesCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['App/Profesionales/profesionalesCtrl.js']);
                }]
            }
        })
        .then(function (nuevasEtapas) {
            $scope.oferta.EtapasOferta = nuevasEtapas;
        });
    }
    //#endregion

});