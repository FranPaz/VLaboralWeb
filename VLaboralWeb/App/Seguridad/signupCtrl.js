vLaboralApp.controller('signupCtrl', function ($scope, $location, $timeout, authSvc) {

    //#region fpaz: Inicializacion de Variables de Scope
    $scope.nuevoUser = {};
    $scope.savedSuccessfully = false;
    $scope.message = "";
    //#endregion

    //#region fpaz: Registro de Empresa
    $scope.registrarEmpresa = function (prmNuevaEmpresa) { // funcion para registrar un nuevo usuario del tipo empresa
        
        prmNuevaEmpresa.TipoIdentificacionEmpresa = { //fpaz agrego el tipo de identificacion (CUIT)
            Id:1
        };

        authSvc.saveRegistrationEmpresa(prmNuevaEmpresa).then(function (response) { //llamo al servicio para registrar un nuevo usuario Empresa
            $scope.savedSuccessfully = true;
            $scope.message = "Nuevo Usuario Registrado. \\n Le hemos enviado un e-mail al correo que indico en el formulario de registro, haga click en el enlace para confirmar su cuenta y poder comensar a utilizar UnMundo.";
            startTimer();
            limpiarScope();

        },
         function (response) {// si sale error devuelvo el mensaje devuelto en el response
             var errors = [];
             for (var key in response.data.modelState) {
                 for (var i = 0; i < response.data.modelState[key].length; i++) {
                     errors.push(response.data.modelState[key][i]);
                 }
             }
             $scope.message = "Fallo la Registracion del Nuevo Usuario:" + errors.join(' ');
         });
    };
    //#endregion

    //#region fpaz: Registro de Profesional
    $scope.registrarProfesional = function (prmNuevoProfesional) { // funcion para registrar un nuevo usuario del tipo Profesional

        prmNuevoProfesional.TipoIdentificacionProfesional = { //fpaz agrego el tipo de identificacion (DNI)
            Id: 1
        };

        authSvc.saveRegistrationProfesional(prmNuevoProfesional).then(function (response) { //llamo al servicio para registrar un nuevo usuario Empresa
            $scope.savedSuccessfully = true;
            $scope.message = "Nuevo Usuario Registrado. \n Le hemos enviado un e-mail al correo que indico en el formulario de registro, haga click en el enlace para confirmar su cuenta y poder comensar a utilizar UnMundo.";
            startTimer();
            limpiarScope();

        },
         function (response) {// si sale error devuelvo el mensaje devuelto en el response
             var errors = [];
             for (var key in response.data.modelState) {
                 for (var i = 0; i < response.data.modelState[key].length; i++) {
                     errors.push(response.data.modelState[key][i]);
                 }
             }
             $scope.message = "Fallo la Registracion del Nuevo Usuario:" + errors.join(' ');
         });
    };
    //#endregion

    var startTimer = function () {
        var timer = $timeout(function () {
            $timeout.cancel(timer);
            $location.path('/home');
        }, 10000);
    };

    var limpiarScope = function () {
        $scope.nuevoUser = {};
    }

});