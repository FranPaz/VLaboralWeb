vLaboralApp.controller('ofertasCtrl', function ($scope, $mdDialog, $mdMedia //fpaz: definicion de inyectores de dependencias
    , ofertasDF, rubrosDF, tiposContratoDF //fpaz: definicion de data factorys
    , listadoTiposDiponibilidad, listadoRubros //fpaz: definicion de parametros de entrada 
    ) {

    //#region fpaz: Inicializacion de variables de Scope
    $scope.tiposDisponibilidad = listadoTiposDiponibilidad;
    //$scope.tiposContrato = listadoTiposContratos;

    $scope.Rubros = listadoRubros;
    $scope.rubroSelected = {};

    $scope.subRubros = {};
    $scope.subRubroSelected = {};

    $scope.subRubroHide = true;

    $scope.oferta = {};
    $scope.oferta.Puestos = [
        { Nombre: "Puesto1" },
        { Nombre: "Puesto2" }            
    ];
    //#endregion




    //#region SLuna: eventos relacionados con Rubros
        $scope.rubroChanged = function () {
            rubrosDF.getRubro($scope.rubroSelected)
                .then(function(data) {
                    $scope.Rubro = data;
                    $scope.subRubroHide = $scope.Rubro.Subrubros.length === 0;//Si no tiene SubRubros, oculta el Select de SubRubros
                });
        };

        $scope.subRubroChanged = function () {
        };
    //#endregion

    //#region fpaz: llamado al modal de carga de puestos

    //funcion que abre el modal para la carga de puestos en la oferta
        $scope.openPuestoAdd = function (ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
            $mdDialog.show({
                controller: 'puestosCtrl',
                templateUrl: 'App/Puestos/Partials/puestosAdd.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                //fullscreen: true,
                fullscreen: useFullScreen,
                resolve: {                    
                    listadoTiposDiponibilidad: function () {
                        return $scope.tiposDisponibilidad;
                    },
                    listadoTiposContratos: function (tiposContratoDF) {
                        return tiposContratoDF.getTiposContratos();
                    },
                    listadoRubros: function () {
                        return $scope.Rubros;
                    }
                }
            })
            .then(function (nuevoPuesto) {
                $scope.oferta.Puestos.push(nuevoPuesto);
            });
        }

    //#endregion
});








