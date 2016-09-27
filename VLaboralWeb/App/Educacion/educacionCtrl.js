vLaboralApp.controller('educacionCtrl', function ($scope, $mdDialog, $ocLazyLoad, $filter, $stateParams //fpaz: definicion de inyectores de dependencias
    , educacionDF, authSvc //fpaz: definicion de data factorys
    , listTiposNivelesEstudio//fpaz: definicion de parametros de entrada    
    ) {

    //#region fpaz: Inicializacion de variables 
    $scope.tiposNivelesEstudio = listTiposNivelesEstudio;
    $scope.educacion;
    //#endregion

    //#region fpaz: Alta de Nuevo Curso o certificacion
    $scope.saveEducacion = function (prmEduc) {

        prmEduc.ProfesionalId = $stateParams.idPro; //obtengo el id del profesional directamente desde el parametro de la url, ya que puede ser que una empresa sea la que este cargando la exp, con lo cual authSvc no sirve

        educacionDF.postEducacion(prmEduc).then(function (response) {
            alert("Educacion Guardada");
            $mdDialog.hide(response.data);
        },
    function (err) {
        if (err) {
            $scope.error = err;
            alert("Error al Guardar la Educacion: " + $scope.error.Message);
        }
    });
    };
    //#endregion

    $scope.cancel = function () {
        $mdDialog.cancel();
    };


});