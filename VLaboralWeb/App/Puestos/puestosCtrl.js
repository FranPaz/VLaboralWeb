vLaboralApp.controller('puestosCtrl', function ($scope, $mdDialog, $mdMedia//fpaz: definicion de inyectores de dependencias
    , ofertasDF, rubrosDF, habilidadesDF //fpaz: definicion de data factorys
    , listadoTiposDiponibilidad, listadoTiposContratos, listadoRubros, listadoTiposRequisitos, puesto //fpaz: definicion de parametros de entrada 
    ) {

    //#region fpaz: Inicializacion de variables de Scope
    $scope.tiposDisponibilidad = listadoTiposDiponibilidad;
    $scope.tiposContrato = listadoTiposContratos;

    $scope.Rubros = listadoRubros;
    $scope.rubroSelected = {};

    $scope.subRubros = {};
    $scope.subRubroSelected = {};

    $scope.subRubroDisabled = true;

    $scope.puesto = puesto;
    $scope.puesto.Subrubros = [];
    $scope.puesto.Requisitos = [];

    $scope.habilidades = habilidadesDF.getHabilidades();
    $scope.puesto.Habilidades = [];

    $scope.tiposRequisito = listadoTiposRequisitos;

    $scope.tipoRequisito = [];
    $scope.ValoresTipoRequisito = [];
    
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
        prmPuesto.Habilidades = prmPuesto.Habilidades.toString();
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
    $scope.tipoRequisitoChanged = function () {

        $scope.tipoRequisito = $scope.tipoRequisitoSelected;

        $scope.valorTipoRequisito = $scope.tipoRequisito[0];
        // $scope.subRubroDisabled = $scope.Rubro.Subrubros.length === 0;//Si no tiene SubRubros, oculta el Select de SubRubros

    };

    $scope.valorTipoRequisitoChanged = function () {
    };

    $scope.valorTipoRequisitoAddClick = function () {
        var valoresSeleccionados = [];
        if ($scope.ValoresTipoRequisitoSelected != undefined) {
            if ($scope.ValoresTipoRequisitoSelected.length != undefined) {
                if ($scope.ValoresTipoRequisitoSelected.length !== 0) {
                    valoresSeleccionados = $scope.ValoresTipoRequisitoSelected;
                } else {
                    return;//sluna: no hay nada seleccionado
                }
            } else {
                valoresSeleccionados.push($scope.ValoresTipoRequisitoSelected);
            }
      
            if (valoresSeleccionados!= null) {
                for (var i = 0; i < $scope.puesto.Requisitos.length; i++) {
                    if ($scope.puesto.Requisitos[i].TipoRequisitoId === $scope.tipoRequisito.Id) {
                        //for (var j = 0; j < valoresSeleccionados.length; j++) {
                        //    $scope.puesto.Requisitos[i].ValoresRequisito.push({
                        //        Valor: valoresSeleccionados[j].Valor,
                        //        Desde: valoresSeleccionados[j].Desde,
                        //        Hasta: valoresSeleccionados[j].Hasta});
                        //}
                        return;//Sluna: no puedo agregar un tipoRequisito ya cargado
                    }
                }

                var requisito = {
                    TipoRequisitoId: $scope.tipoRequisito.Id,
                    TipoRequisito: $scope.tipoRequisito,
                    Excluyente: false,
                    AutoVerificar: false,
                    ValoresRequisito: []
                };
                for (var k = 0; k < valoresSeleccionados.length; k++) {
                    requisito.ValoresRequisito.push({
                        Valor: valoresSeleccionados[k].Valor,
                        Desde: valoresSeleccionados[k].Desde,
                        Hasta: valoresSeleccionados[k].Hasta
                    });
                }
                $scope.puesto.Requisitos.push(requisito);
                $scope.ValoresTipoRequisitoSelected = null;//sluna: limpio lo que esté seleccionado
                valoresSeleccionados = null;//sluna: limpio lo que esté seleccionado
            }
        }
    };

    $scope.QuitarRequisito = function (TipoRequisitoId) {
        for (var i = 0; i < $scope.puesto.Requisitos.length; i++) {
            if ($scope.puesto.Requisitos[i].TipoRequisitoId === TipoRequisitoId) {
                $scope.puesto.Requisitos.splice(i, 1);
                return;
            }
        }
    };

    //$scope.agregarRequisito = function (prmReq) {
    //    $scope.puesto.Requisitos.push(prmReq);
    //    $scope.requisito = {};
    //}

    //$scope.cancelarRequisito = function () {
    //    $scope.requisito = {};
    //}
    //#endregion

});








