vLaboralApp.controller('changePasswordCtrl', function ($scope, $location, $timeout, authSvc, $state, notificacionesSvc) {

    //#region cambiar contraseña
    $scope.ChangePasswordModel = {
        OldPassword: '',
        NewPassword: '',
        ConfirmPassword: ''
    }

    $scope.ChangePassword = function () {
        authSvc.changePassword($scope.ChangePasswordModel).then(
            function (response) {
                alert("Su contraseña se cambio correctamente");
                authSvc.logOut();
            },
            function () {
                alert("ops! algo ocurrio");
            }
            )
    }
    //#end region
});