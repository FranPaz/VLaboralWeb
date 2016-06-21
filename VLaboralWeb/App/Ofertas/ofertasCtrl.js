vLaboralApp.controller('ofertasCtrl', function ($scope //fpaz: definicion de inyectores de dependencias
    , ofertasDF //fpaz: definicion de data factorys
    , listadoTiposDiponibilidad, listadoTiposContratos //fpaz: definicion de parametros de entrada 
    ) {

    //#region fpaz: Inicializacion de variables de Scope
    $scope.tiposDisponibilidad = listadoTiposDiponibilidad;
    $scope.tiposContrato = listadoTiposContratos;
    //#endregion

});








