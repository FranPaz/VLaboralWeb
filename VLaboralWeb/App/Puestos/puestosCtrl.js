vLaboralApp.controller('puestosCtrl', function ($scope, $mdDialog, $mdMedia //fpaz: definicion de inyectores de dependencias
    , ofertasDF, rubrosDF, habilidadesDF //fpaz: definicion de data factorys
    , listadoTiposDiponibilidad, listadoTiposContratos, listadoRubros, listadoTiposRequisitos //fpaz: definicion de parametros de entrada 
    ) {

    //#region fpaz: Inicializacion de variables de Scope
    $scope.tiposDisponibilidad = listadoTiposDiponibilidad;
    $scope.tiposContrato = listadoTiposContratos;

    $scope.Rubros = listadoRubros;
    $scope.rubroSelected = {};

    $scope.subRubros = {};
    $scope.subRubroSelected = {};

    $scope.subRubroDisabled = true;

    $scope.puesto = {};
    $scope.puesto.Subrubros = [];
    $scope.puesto.Requisitos = [];

    $scope.habilidades = habilidadesDF.getHabilidades();
    $scope.puesto.Habilidades = [];

    $scope.tiposRequisito = listadoTiposRequisitos;

    $scope.requisito = {};
    //#endregion

    //#region SLuna: eventos relacionados con Rubros
    $scope.rubroChanged = function () {
        rubrosDF.getRubro($scope.rubroSelected)
            .then(function (data) {
                $scope.Rubro = data;
                $scope.subRubroDisabled = $scope.Rubro.Subrubros.length === 0;//Si no tiene SubRubros, oculta el Select de SubRubros
            });
    };

    $scope.subRubroChanged = function () {
    };

    $scope.subRubroAddClick = function () {
        for (var i = 0; i < $scope.puesto.Subrubros.length; i++) {
            if ($scope.puesto.Subrubros[i].Id === $scope.subRubroSelected.Id) {
                alert("Advertencia: El SubRubro ya está seleccionado.");
                return;
            }
        }
        $scope.puesto.Subrubros.push($scope.subRubroSelected);
    };

    $scope.QuitarSubRubro = function (IdSubRubro) {
        for (var i = 0; i < $scope.puesto.Subrubros.length; i++) {
            if ($scope.puesto.Subrubros[i].Id === IdSubRubro) {
                $scope.puesto.Subrubros.splice(i, 1);
                return;
            }
        }
    };

    //#endregion


    //#region fpaz: carga de puestos
    $scope.addPuesto = function (prmPuesto) {
        $mdDialog.hide(prmPuesto);
    }

    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    //#endregion

    //#region iafar: transformar habilidades de chips en strings
    $scope.transformChip = function (chip) {

        // iafar: Si es un objeto, es una habilidad desde la BD
        if (angular.isObject(chip)) {
            return chip.Nombre.toUpperCase();
        }
        // iafar: Sino, no existe en BD
        return chip.toUpperCase();
    }
    //#endregion

    //#region fpaz: funciones para agregar requisitos al puesto
    $scope.agregarRequisito = function (prmReq) {
        $scope.puesto.Requisitos.push(prmReq);
        $scope.requisito = {};
    }

    $scope.cancelarRequisito = function () {
        $scope.requisito = {};
    }
    //#endregion

});








