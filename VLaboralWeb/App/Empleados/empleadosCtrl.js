vLaboralApp.controller('empleadosCtrl', function ($scope, $mdMedia, $mdDialog, $ocLazyLoad    
    , authSvc, empleadosDF //fpaz: definicion de data factorys
    , empleados, listOpcionesFiltrosEmpleados//fpaz: definicion de parametros de entrada    
    ) {

    //#region fpaz: Inicializacion de variables de Scope
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

});