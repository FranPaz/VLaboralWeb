vLaboralApp.controller('empleadosCtrl', function ($scope, $mdMedia, $mdDialog, $ocLazyLoad, $http
    , authSvc, empleadosDF, profesionalesDF //fpaz: definicion de data factorys
    , empleados, listOpcionesFiltrosEmpleados//fpaz: definicion de parametros de entrada    
    ) {

    //#region fpaz: Inicializacion de variables de Scope
    $http.get('Countries and States/countries.js').success(function (data) {
        return $scope.paises = data;
    });
    
    $scope.buscarProvincias = function () {
        var url = 'Countries and States/countries/' + $scope.pais + '.js';
        $http.get(url).success(function (data) {
            return $scope.provincias = data;
        })
    };

    

    $scope.empleados = empleados;
    $scope.opcionesFiltrosEmpleados = listOpcionesFiltrosEmpleados;

    //#region variables iniciales para paginacion
    $scope.queryFiltros = { // tiene los parametros que voy a pasar para filtrar el listado. 
        Rows: 5, //valor inicial de cantidad de filas mostradas
        Page: 1 //valor inicial de la pagina mostrada
    };

    $scope.limitOptions = [1, 2, 5, 10, 15];// sirve para seleccionar la cantidad de filas que se van a mostrar en la tabla

    $scope.TotalRows;
    //#endregion

    //#endregion

    //#region alta empleados
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
                listOpcionesFiltrosEmpleados: function () {
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

    //#region fpaz: funciones para el manejo de filtros y ordenamiento en el listado de empleados
    $scope.setSelectedEmpleados = function (filterType, filterValue) { //funcion para armar el objeto con los filtros para los empleados
        //si el valor pasado como parametro existe lo elimino, sino lo agrego

        //convierto el id en string
        var id = filterValue.Id.toString();

        if ($scope.queryFiltros[filterType] && $scope.queryFiltros[filterType].indexOf(id) >= 0) {
            if (Array.isArray($scope.queryFiltros[filterType])) {
                $scope.queryFiltros[filterType].splice($scope.queryFiltros[filterType].indexOf(id), 1);
            } else {
                $scope.queryFiltros[filterType] = [];
            }
        } else {
            if (!$scope.queryFiltros[filterType]) {
                $scope.queryFiltros[filterType] = [];
            }

            $scope.queryFiltros[filterType].push(id);
        }

        $scope.obtenerListadoFiltradoEmpleados();

    }

    $scope.obtenerListadoFiltradoEmpleados = function () {
        console.log('entra a $scope.obtenerListadoFiltradoEmpleados');

        var query = angular.copy($scope.queryFiltros);

        empleadosDF.obtenerEmpleadosFiltrados(query).then(function (response) {
            console.log('entra a obtener empleados filtrados');
            $scope.empleados = response.results;
            $scope.TotalRows = response.totalPages;
        },
    function (err) {
        if (err) {
            $scope.error = err;
            alert("Error al Filtrar los empleados: " + $scope.error.Message);
        }
    });
    }

    $scope.logPaginationEmpleados = function (page, limit) {
        console.log('page: ', page);
        console.log('limit: ', limit);
        //llamo al webapi para obtener los valores filtrados        
        $scope.obtenerListadoFiltradoempleados();
    }

    $scope.ordenEmpleadosChanged = function () {
        console.log('Ordenamiento: ', $scope.queryFiltros.orderBy);
        //llamo al webapi para obtener los valores filtrados        
        $scope.obtenerListadoFiltradoEmpleados();
    }

    $scope.busquedaNombreEmpleado = function (prmNombre) {
        console.log('Busqueda por nombre: ', $scope.queryFiltros.searchText);
        $scope.queryFiltros.searchText = prmNombre;
        //llamo al webapi para obtener los valores filtrados        
        $scope.obtenerListadoFiltradoEmpleados();
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