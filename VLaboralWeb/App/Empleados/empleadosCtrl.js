vLaboralApp.controller('empleadosCtrl', function ($scope, $mdMedia, $mdDialog, $ocLazyLoad,
    empleadosDF, profesionalesDF,
    empleados, authSvc) {

    $scope.empleados = empleados;

    //#region empleados
    $scope.nuevoEmpleado = function () {
        //var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
        $mdDialog.show({
            controller: 'empleadosCtrl',
            templateUrl: '/App/Empleados/Partials/empleadoAdd.html',
            parent: angular.element(document.body),
            //targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true,
            resolve: {
                empleados: function () {
                    return { value: [] };
                },
                loadOfertasCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['App/Empleados/empleadosCtrl.js']);
                }]
            }


        })
        .then(function () {

        });
    }
    //#endregion

    //#region Buscar empleado: esta funcion busca en la tabla empleados 
    // y si no encuentra los datos ahí, los busca en la tabla profesionales
    // luego si no encuentra los datos en profesionales habilita campos para completar
    $scope.buscarEmpleado = function () {
        empleadosDF.getEmpleado($scope.empleado.IdTipo, $scope.empleado.Valor).then(function (response) {
            if (response != null) {
                $scope.err = "Ya hay un empleado cargado";
                return response;
            }            
        }).then(function (response) {
            profesionalesDF.getProfesional(response.Id).then(function (response) {                
                $scope.empleado = response;
                
            })
            .then(function (response) {
                if (response == null) {
                    $scope.habilitado = true;
                }
            })
        })
    }
    //#endRegion
    $scope.cancel = function () {
        $mdDialog.cancel();
    }
});