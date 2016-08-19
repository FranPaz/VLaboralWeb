vLaboralApp.controller('etapasOfertaCtrl', function ($scope, $mdDialog, $mdMedia //fpaz: definicion de inyectores de dependencias
    , listadoTiposEtapas, etapasCargadas //fpaz: definicion de parametros de entrada 
    ) {

    //#region fpaz: Inicializacion de variables de scope
    $scope.etapasCargadas = etapasCargadas;
    $scope.etapaOferta = {};
    $scope.tiposEtapas = listadoTiposEtapas;
    //#endregion

    //#region fpaz: carga de etapas desde el modal
    $scope.addEtapa = function (prmEtapa) {
        $mdDialog.hide(prmEtapa);
    }

    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    //#endregion
    
});








