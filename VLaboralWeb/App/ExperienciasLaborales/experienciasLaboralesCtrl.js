vLaboralApp.controller('experienciasLaboralesCtrl', function ($scope, $mdMedia, $mdDialog, $ocLazyLoad, $filter, $stateParams //fpaz: definicion de inyectores de dependencias
    ,experienciasLaboralesDF, authSvc //fpaz: definicion de data factorys
    ,listEmpresas//fpaz: definicion de parametros de entrada    
    ) {

    //#region fpaz: Inicializacion de variables
    $scope.empresas = listEmpresas;
    $scope.exp;
    //#endregion

    

    //#region fpaz: Alta de Nueva Experiencia
    $scope.saveExp = function (prmExp) {

        prmExp.ProfesionalId = $stateParams.idPro; //obtengo el id del profesional directamente desde el parametro de la url, ya que puede ser que una empresa sea la que este cargando la exp, con lo cual authSvc no sirve
        prmExp.idUsuarioCreacion = authSvc.authentication.idUsuarioLogueado; // obtengo el id de identity del usuario logueado, es independiente de si es un profesional o una empresa
        prmExp.FechaCreacion = new Date();
                
        if (angular.isObject($scope.selectedItem)) {
            prmExp.EmpresaId = $scope.selectedItem.Id;
        } else {
            prmExp.EmpresaExterna = $scope.searchText;
        }


        experienciasLaboralesDF.postExperiencia(prmExp).then(function (response) {
            alert("Experiencia Guardada");
            $mdDialog.hide(response.data);
        },
    function (err) {
        if (err) {
            $scope.error = err;
            alert("Error al Guardar la Experiencia: " + $scope.error.Message);
        }
    });
    };
    //#endregion

    $scope.cancel = function () {
        $mdDialog.cancel();
    };


});