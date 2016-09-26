vLaboralApp.controller('idiomasCtrl', function ($scope, $mdMedia, $mdDialog, $ocLazyLoad, $filter, $stateParams //fpaz: definicion de inyectores de dependencias
    , idiomasDF, authSvc //fpaz: definicion de data factorys
    , listIdiomas, listCompetenciasIdioma//fpaz: definicion de parametros de entrada    
    ) {

    //#region fpaz: Inicializacion de variables
    $scope.idiomas = listIdiomas;
    $scope.competenciasIdioma = listCompetenciasIdioma;
    $scope.idiomaConocido;
    //#endregion



    //#region fpaz: Alta de Nueva Experiencia
    $scope.saveIdiomaConocido = function (prmIdioma) {
        prmIdioma.ProfesionalId = $stateParams.idPro; //obtengo el id del profesional directamente desde el parametro de la url, ya que puede ser que una empresa sea la que este cargando la exp, con lo cual authSvc no sirve        
        idiomasDF.postIdiomaConocido(prmIdioma).then(function (response) {
            alert("Idioma Guardado");
            $mdDialog.hide(response.data);
        },
    function (err) {
        if (err) {
            $scope.error = err;
            alert("Error al Guardar el Idioma: " + $scope.error.Message);
        }
    });
    };
    //#endregion

    $scope.cancel = function () {
        $mdDialog.cancel();
    };


});