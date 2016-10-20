vLaboralApp.controller('experienciasLaboralesCtrl', function ($scope, $mdMedia, $mdDialog, $ocLazyLoad, $filter, $stateParams //fpaz: definicion de inyectores de dependencias
    , experienciasLaboralesDF, authSvc, notificacionesSvc //fpaz: definicion de data factorys
    ,listEmpresas, listExperienciasPendientes//fpaz: definicion de parametros de entrada    
    ) {

    //#region fpaz: Inicializacion de variables
    $scope.empresas = listEmpresas;
    $scope.exp;

    options = { //fpaz: opciones de configuracion para el autocomplete de ciudades
        types: '(cities)'     
    }

    //#region iafar: datos de prueba
    $scope.profesional = {
        Nombre: "Ivan",
        Apellido: "Farhat",
        FechaNac: "06/09/1986",
        Cuil: "20-32476303-2"
    };
    $scope.puestos = [
        {
            Nombre: "Puesto 1",
            Lugar: "Santiago del Estero",
            FechaDesde: "10/10/2010",
            FechaHasta: "05/12/2015",
            Descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
            "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip " +
            "ex ea commodo consequat. Duis aute irure dolor in reprehenderit in " +
            "voluptate velit esse cillum dolore eu fugiat nulla pariatur. " +
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui " +
            "officia deserunt mollit anim id est laborum."
        },
        {
            Nombre: "Puesto 2",
            Lugar: "Cordoba",
            FechaDesde: "10/10/2010",
            FechaHasta: "05/12/2015",
            Descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
            "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip " +
            "ex ea commodo consequat. Duis aute irure dolor in reprehenderit in " +
            "voluptate velit esse cillum dolore eu fugiat nulla pariatur. " +
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui " +
            "officia deserunt mollit anim id est laborum."
        },
        {
            Nombre: "Puesto 3",
            Lugar: "Cordoba",
            FechaDesde: "10/10/2010",
            FechaHasta: "05/12/2015",
            Descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
            "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip " +
            "ex ea commodo consequat. Duis aute irure dolor in reprehenderit in " +
            "voluptate velit esse cillum dolore eu fugiat nulla pariatur. " +
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui " +
            "officia deserunt mollit anim id est laborum."
        }
    ];
    $scope.valoracion = 1;


    //#endregion


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

            if (angular.isUndefined(prmExp.EmpresaExterna)) { // si la nueva exp esta relacionada con una empresa cargada en el sistema envio la notificacion
                console.log("Envia Notificacion");
                notificacionesSvc.enviarNotificacionExperiencia(response.data);
            } else {
                console.log("No Envia Notificacion");
            }            
            
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

    //#region iafar: dialog verificacion de experiencia

    $scope.verificarExperiencia = function (experienciaSelect) {
        $mdDialog.show({
            //scope: $scope,
            controller: DialogExperienciaController,
            templateUrl: '/App/ExperienciasLaborales/Partials/EvaluarExperienciaDialog.html',
            //onComplete: afterShowAnimation,
            locals: {
                experienciaShow: experienciaSelect
            } //iafar:paso de scope
        }).then(function (response) {
            if (response == "ok") { //iafar: se guardo nuevo experiencia?

                alert('La Valoracion se guardo correctamente')
            }
            else {
                alert('Le dio a cancelar ' + response)
            }
        })
    };


   
    //#endregion

});

function DialogExperienciaController($scope, $mdDialog,
    experienciaShow) {
    //iafar: aqui se deberia pasar el profesional y el id y el comentario del puesto en el que estuvo de la experiencia

    //#region inicializacion de scope

    $scope.experienciaShow = experienciaShow; //iafar: es la experiencia que se va a mostrar
   
    //#endregion


    $scope.closeDialog = function (response) {
        

        $mdDialog.hide(response);

    };

    $scope.guardarEvaluacion = function () {
        experienciasLaborales.postExperiencia($scope.experienciaShow).then(function (response) {
            //iafar: se guarda el comentario y la valoracion de la experiencia


        },
    function (err) {
        if (err) {
            $scope.error = err;
            alert("Error al Guardar Valoracion: " + $scope.error.Message);
        }
    });
        $scope.closeDialog("ok");
    }

    



}
