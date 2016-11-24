vLaboralApp.controller('postulacionesCtrl', function ($scope, $mdMedia, $mdDialog, $ocLazyLoad, $filter, $stateParams, $state //fpaz: definicion de inyectores de dependencias
     //fpaz: definicion de data factorys
    //fpaz: definicion de parametros de entrada    
    ) {

    //#region fpaz: Inicializacion de variables
   
    //#endregion

    //#region fpaz: Postulacion desde Seccion Mis Postulaciones

    //#region postulacion del profesional
    $scope.postularProfesional = function (prmPuesto) { //funcion que habre un modal con la info detallada del puesto al que quiere postularse el profesional
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
        $mdDialog.show({
            controller: 'postulantesCtrl',
            templateUrl: 'App/Puestos/Partials/puestoDetalle.html',
            parent: angular.element(document.body),
            //targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: useFullScreen,
            resolve: {
                listadoPostulantes: function () {
                    return { value: [] };
                },
                infoPuesto: function () {
                    return prmPuesto;
                },
                infoPostulacion: function () {
                    return prmPuesto;
                },
                loadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['App/Postulantes/postulantesCtrl.js']);
                }]
            }
        })
        .then(function () {
            $state.go("profesional.ofertas");
        });
    }
    //#endregion

    //#endregion


   

});