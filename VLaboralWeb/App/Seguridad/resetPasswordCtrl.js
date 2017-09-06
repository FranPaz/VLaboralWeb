vLaboralApp.controller('resetPassCtrl', function ($scope, $location, $timeout, authSvc, $state,$stateParams, notificacionesSvc) {
    //#region reseteo de contraseñas
    $scope.ResetPassword = {
        Email: "",
        Password: "",
        ConfirmPassword: "",
        Code: ""
    };
    // aqui parsea la url que viene desde la api para extraer el codigo
    var parserLocation = function (location) {
        var pairs = location.code.substring(1).split("&");
        var obj = {};
        var pair;
        var i;
        for (i in pairs) {
            if (pairs[i] === "") continue;

            pair = pairs[i].split("=");
            obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }
        return obj;
    }

    //esta funcion decodifica el codigo reemplazando los %20 que vienen de la url
    function urldecode(str) {
        return decodeURIComponent((str + '').replace(/\+/g, '%20'));
    }
    
    //funcion para cambiar el password despues del reseteo
    $scope.changePassword = function () {
        var obj = $location.search();
        $scope.ResetPassword.Code = decodeURIComponent(obj.code.replace(/ /g, "+"));
        if ($scope.ResetPassword.Password != $scope.ResetPassword.ConfirmPassword) {
            $scope.mensaje = "Las contraseñas no coinciden";
        }
        else {
            authSvc.resetPassword($scope.ResetPassword).then(function (response) {
                alert("Su contraseña se cambio correctamente");
                $state.go('home');
            },
        function () {
            alert("ops! algo ocurrio");
        });
        }
        
    }

});