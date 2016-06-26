vLaboralApp.controller('ofertasCtrl', function ($scope //fpaz: definicion de inyectores de dependencias
    , ofertasDF, rubrosDF //fpaz: definicion de data factorys
    , listadoTiposDiponibilidad, listadoTiposContratos, listadoRubros //fpaz: definicion de parametros de entrada 
    ) {

    //#region fpaz: Inicializacion de variables de Scope
    $scope.tiposDisponibilidad = listadoTiposDiponibilidad;
    $scope.tiposContrato = listadoTiposContratos;

    $scope.Rubros = listadoRubros;
    $scope.rubroSelected = {};

    $scope.subRubros = {};
    $scope.subRubroSelected = {};

    $scope.subRubroHide = true;
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
});








