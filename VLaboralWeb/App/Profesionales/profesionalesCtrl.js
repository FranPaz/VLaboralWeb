vLaboralApp.controller('profesionalesCtrl', function ($scope //fpaz: definicion de inyectores de dependencias
    , rubrosDF,  habilidadesDF, tiposIdentificacionDF, profesionalesDF, ofertasDF //fpaz: definicion de data factorys
    , listadoRubros, listadoHabilidades, listadoIdentificacionPro, listadoOfertas//fpaz: definicion de parametros de entrada
    ,infoProfesional
    ) {

    //#region fpaz: Inicializacion de variables de Scope
    $scope.rubros = listadoRubros;
    $scope.habilidades= listadoHabilidades;
    $scope.identificacionesPro = listadoIdentificacionPro;
    $scope.profesional = infoProfesional; //iafar: ya vienen definidos todos los atributos desde la API
    $scope.chipsHabilidad = [];

    $scope.ofertas = listadoOfertas.Results;
    $scope.totalOfertas = listadoOfertas.TotalRows;
    
    $scope.ofertasPerPage = 10;
    $scope.pagination = {
        current: 1
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

    //#region SLuna: Traer Listado de Ofertas
    $scope.pageChanged = function (newPage) {
        ofertasDF.getOfertas(newPage, $scope.ofertasPerPage)
          .then(function (data) {
              $scope.totalOfertas = data.TotalRows;
              $scope.ofertas = data.Results;
          });
    };
    //#endregion
    
});
