vLaboralApp.controller('cursosCtrl', function ($scope, $mdDialog, $ocLazyLoad, $filter, $stateParams //fpaz: definicion de inyectores de dependencias
    , cursosDF, authSvc //fpaz: definicion de data factorys
    //fpaz: definicion de parametros de entrada    
    ) {

    //#region fpaz: Inicializacion de variables    
    $scope.curso;
    //#endregion

    //#region fpaz: Alta de Nuevo Curso o certificacion
    $scope.saveCurso = function (prmCurso) {

        prmCurso.ProfesionalId = $stateParams.idPro; //obtengo el id del profesional directamente desde el parametro de la url, ya que puede ser que una empresa sea la que este cargando la exp, con lo cual authSvc no sirve
                
        cursosDF.postCursos(prmCurso).then(function (response) {
            alert("Curso Guardado");
            $mdDialog.hide(response.data);
        },
    function (err) {
        if (err) {
            $scope.error = err;
            alert("Error al Guardar el Curso: " + $scope.error.Message);
        }
    });
    };
    //#endregion

    $scope.cancel = function () {
        $mdDialog.cancel();
    };

});