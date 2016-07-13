vLaboralApp.controller('loginCtrl', function ($scope, $location, $timeout, authSvc, $state) {
    $scope.loginData = {
        userName: "",
        password: ""
    };

    $scope.message = "";

    $scope.login = function () {
        authSvc.login($scope.loginData).then(function (response) {
            alert("Login Exitoso");
            
            if (authSvc.authentication.tipoUser == "empresa") {
                $state.go('empresa.ofertas');                
            } else {
                $state.go('profesional.perfil', { idPro: authSvc.authentication.profesionalId });
            }
            

        },
         function (err) {
             if (err) {
                 $scope.message = err.error_description;
             }
         });
    };
});