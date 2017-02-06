vLaboralApp.controller('empleadosCtrl', function ($scope, $mdMedia, $mdDialog, $ocLazyLoad,
    empleados, authSvc) {

    $scope.empleados = empleados;

    //#region empleados
    $scope.nuevoEmpleado = function () {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
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

});