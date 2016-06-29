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

    $scope.subRubroDisabled = true;

    $scope.Puestos = [];
    $scope.Puestos.Subrubros = [];
    //#endregion

    //#region SLuna: eventos relacionados con Rubros
        $scope.rubroChanged = function () {
            rubrosDF.getRubro($scope.rubroSelected)
                .then(function(data) {
                    $scope.Rubro = data;
                    $scope.subRubroDisabled = $scope.Rubro.Subrubros.length === 0;//Si no tiene SubRubros, oculta el Select de SubRubros
                });
        };

        $scope.subRubroChanged = function () {
        };

        $scope.subRubroAddClick = function () {
            for (var i = 0; i < $scope.Puestos.Subrubros.length; i++) {
                if ($scope.Puestos.Subrubros[i].Id === $scope.subRubroSelected.Id) {
                    alert("Advertencia: El SubRubro ya está seleccionado.");
                    return;
                }
            }
            $scope.Puestos.Subrubros.push($scope.subRubroSelected);
        };

        $scope.QuitarSubRubro = function (IdSubRubro) {
            for (var i = 0; i < $scope.Puestos.Subrubros.length; i++) {
                if ($scope.Puestos.Subrubros[i].Id === IdSubRubro) {
                    $scope.Puestos.Subrubros.splice(i, 1);
                    return;
                }
            }
        };
        
    //#endregion
});








