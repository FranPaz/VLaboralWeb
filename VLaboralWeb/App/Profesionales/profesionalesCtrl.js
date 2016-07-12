﻿vLaboralApp.controller('profesionalesCtrl', function ($scope //fpaz: definicion de inyectores de dependencias
    , rubrosDF,  habilidadesDF, tiposIdentificacionDF, profesionalesDF //fpaz: definicion de data factorys
    , listadoRubros, listadoHabilidades, listadoIdentificacionPro//fpaz: definicion de parametros de entrada
    , rubrosDF,  habilidadesDF, tiposIdentificacionDF, profesionalesDF, ofertasDF //fpaz: definicion de data factorys
    , listadoRubros, listadoHabilidades, listadoIdentificacionPro, listadoOfertas//fpaz: definicion de parametros de entrada
    ,infoProfesional
    ) {

    //#region fpaz: Inicializacion de variables de Scope    
    $scope.habilidades= listadoHabilidades;
    $scope.identificacionesPro = listadoIdentificacionPro;
    $scope.profesional = infoProfesional; //iafar: ya vienen definidos todos los atributos desde la API
    $scope.chipsHabilidad = [];

    $scope.Rubros = listadoRubros;
    $scope.rubroSelected = {};

    $scope.subRubros = {};
    $scope.subRubroSelected = {};

    $scope.subRubroDisabled = true;
    $scope.ofertas = listadoOfertas.Results;
    $scope.totalOfertas = listadoOfertas.TotalRows;
    
    $scope.ofertasPerPage = 10;
    $scope.pagination = {
        current: 1
    };

    $scope.editValue = false; // variable que voy a usar para activar y desactivar los modos de edicion para hacer el update de la info
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

    //#region SLuna: Traer Listado de Ofertas
    $scope.pageChanged = function (newPage) {
        ofertasDF.getOfertas(newPage, $scope.ofertasPerPage)
          .then(function (data) {
              $scope.totalOfertas = data.TotalRows;
              $scope.ofertas = data.Results;
          });
    //#region SLuna: eventos relacionados con Rubros
    $scope.rubroChanged = function () {
        rubrosDF.getRubro($scope.rubroSelected)
            .then(function (data) {
                $scope.Rubro = data;
                $scope.subRubroDisabled = $scope.Rubro.Subrubros.length === 0;//Si no tiene SubRubros, oculta el Select de SubRubros
            });
    };
    //#endregion
    $scope.subRubroChanged = function () {
    };

    $scope.subRubroAddClick = function () {
        for (var i = 0; i < $scope.profesional.Subrubros.length; i++) {
            if ($scope.profesional.Subrubros[i].Id === $scope.subRubroSelected.Id) {
                alert("Advertencia: El SubRubro ya está seleccionado.");
                return;
            }
        }
        $scope.profesional.Subrubros.push($scope.subRubroSelected);
    };

    $scope.QuitarSubRubro = function (IdSubRubro) {
        for (var i = 0; i < $scope.profesional.Subrubros.length; i++) {
            if ($scope.profesional.Subrubros[i].Id === IdSubRubro) {
                $scope.profesional.Subrubros.splice(i, 1);
                return;
            }
        }
    };

    //#endregion

    //#region fpaz: actualizacion de perfil del profesional
    $scope.edit = function () {//fpaz: activa el modo de edicion de los campos                
        $scope.editValue = true;
    };

    $scope.profesionalPerfilUpdate = function (prmProfesional) {
        profesionalesDF.putProfesional(prmProfesional.Id, prmProfesional).then(function (response) {
            alert("Perfil del Profesional Actualizado");
            $scope.profesional = response; //si se actualizo bien el perfil del profesional, cargo el scope con los datos guardados
        },
        function (err) {
            if (err) {
                $scope.error = err;
                alert("Error al Guardar los Cambios en el Perfil: " + $scope.error.Message);
                $scope.profesional = infoProfesional; //Si hubo un error en la actualizacion, cargo los datos originales
            }
        });
    };
    //#endregion
});
