vLaboralApp.controller('profesionalesCtrl', function ($scope //fpaz: definicion de inyectores de dependencias
    , rubrosDF,  habilidadesDF, tiposIdentificacionDF, profesionalesDF //fpaz: definicion de data factorys
    , listadoRubros, listadoHabilidades, listadoIdentificacionPro//fpaz: definicion de parametros de entrada
    ,infoProfesional
    ) {

    //#region fpaz: Inicializacion de variables de Scope
    $scope.rubros = listadoRubros;
    $scope.habilidades= listadoHabilidades;
    $scope.identificacionesPro = listadoIdentificacionPro;
    $scope.profesional = infoProfesional; //iafar: ya vienen definidos todos los atributos desde la API
    $scope.chipsHabilidad = [];
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

    
});
