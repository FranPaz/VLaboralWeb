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
    //#endregion

    
});
