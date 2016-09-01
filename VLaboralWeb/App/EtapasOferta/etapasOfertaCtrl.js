vLaboralApp.controller('etapasOfertaCtrl', function ($scope, $mdDialog, $mdMedia, $filter //fpaz: definicion de inyectores de dependencias
    , listadoTiposEtapas, etapasCargadas //fpaz: definicion de parametros de entrada 
    ) {

    //#region fpaz: Inicializacion de variables de scope
    $scope.etapasCargadas = etapasCargadas;
    $scope.etapaOferta = {};
    $scope.tiposEtapas = listadoTiposEtapas;
    //#endregion

    //#region reordenamiento de etapas al agregar una nueva etapa

    $scope.setearEtapaSiguiente = function () {
        
        for (var i in $scope.etapasCargadas) {

            if ($scope.etapasCargadas[i].Orden == $scope.etapaAnterior.Orden + 1) {
                $scope.etapaSiguiente = angular.copy($scope.etapasCargadas[i]);
                break;
            }
        }

    }
    //#endregion

    //#region fpaz: carga de etapas desde el modal
    $scope.addEtapa = function (prmEtapa) {

        for (var i = 0; i < $scope.etapasCargadas.length; i++) {
            if ($scope.etapasCargadas[i].Orden == $scope.etapaSiguiente.Orden) {
                prmEtapa.Orden = $scope.etapaSiguiente.Orden;                
                for (var j = i; j < $scope.etapasCargadas.length; j++) {
                    $scope.etapasCargadas[j].Orden++;
                }
                break;
            }
        }

        $scope.etapasCargadas.push(prmEtapa);

        var etapas = $filter('orderBy')($scope.etapasCargadas, 'Orden'); //array de etapas cargadas incluyendo la nueva que se devuelven ordenadas a la oferta
        
        $mdDialog.hide(etapas);
    }

    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    //#endregion
    
});








