vLaboralApp.controller('empleadosCtrl', function ($http, $scope, $mdMedia, $mdDialog, $ocLazyLoad,
    empleadosDF, profesionalesDF,
    empleados, authSvc) {

    $http.get('Countries and States/countries.js').success(function (data) {
        return $scope.paises = data;
    })

    

    
    
    $scope.buscarProvincias = function () {
        var url = 'Countries and States/countries/' + $scope.pais + '.js';
        $http.get(url).success(function (data) {
            return $scope.provincias = data;
        })
    }

    

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
    $scope.buscarEmpleado = function (IdTipo, Valor) {

        empleadosDF.getEmpleado(IdTipo, Valor).then(function (response) {
            if (response == null) {
                profesionalesDF.getProfesionalId(IdTipo, Valor).then(function (response) {
                    if (response != null) {
                        $scope.empleado = response;
                        $scope.empleado.FechaNac = new Date(response.FechaNac);
                        $scope.habilitado = true;
                        angular.forEach(response.IdentificacionesProfesional, function (i) {
                            if (parseInt(IdTipo) == i.TipoIdentificacionProfesionalId && Valor == i.Valor) {
                                $scope.IdTipo = IdTipo;
                                $scope.Valor = Valor;
                            }
                        })
                    }
                    else {
                        $scope.IdTipo = IdTipo;
                        $scope.Valor = Valor;
                        $scope.habilitado = false;
                    }
                });
            }
            else {
                alert("ya hay un empleado cargado");
                $scope.habilitado = true;
            }

        });

        //empleadosDF.getEmpleado($scope.empleado.IdTipo, $scope.empleado.Valor).then(function (response) {
        //    if (response != null) {
        //        $scope.err = "Ya hay un empleado cargado";
        //        return response;
        //    }            
        //}).then(function () {
        //    profesionalesDF.getProfesionalId($scope.empleado.IdTipo, $scope.empleado.Valor).then(function (response) {                
        //        $scope.empleado = response;
                
        //    })
        //    .then(function (response) {
        //        if (response == null) {
        //            $scope.habilitado = true;
        //        }
        //    })
        //})
    }

    $scope.guardarEmpleado = function (empleado) {
        empleado.IdentificacionesEmpleado = [
            {
                TipoIdentificacionEmpleadoId: $scope.IdTipo,
                Valor: $scope.Valor
            }
        ];
        empleado.Domicilio = null;

        empleadosDF.postEmpleado(empleado).then(function (response) {
            if (response != null) {
                alert("Empleado guardado");
            }
            else {
                alert("Error");
            }
            
        })
    }
    //#endRegion
    $scope.cancel = function () {
        $mdDialog.cancel();
    }
});