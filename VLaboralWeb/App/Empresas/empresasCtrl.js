﻿vLaboralApp.controller('empresasCtrl', function ($scope
    , authSvc, ofertasDF//fpaz: definicion de data factorys
    , listadoOfertas, infoEmpresa, listOpcionesFiltrosOfertas//fpaz: definicion de parametros de entrada    
    ) {

    //#region Inicializacion de Variables de Scope
    $scope.empresa = infoEmpresa;
    $scope.ofertas = listadoOfertas;
    $scope.totalOfertas = listadoOfertas.TotalRows;
    $scope.usuarioLogueado = authSvc.authentication;//fpaz: obtiene la informacion del usuario logueado
    $scope.opcionesFiltrosOfertas = listOpcionesFiltrosOfertas;
    
    //#region variables iniciales para paginacion
    $scope.queryFiltros = { // tiene los parametros que voy a pasar para filtrar el listado. 
        Rows: 5, //valor inicial de cantidad de filas mostradas
        Page: 1 //valor inicial de la pagina mostrada
    };

    $scope.limitOptions = [1, 2, 5, 10, 15];// sirve para seleccionar la cantidad de filas que se van a mostrar en la tabla

    $scope.TotalRows;
    //#endregion

    //#endregion
    
    //#region fpaz: funciones para el manejo de filtros y ordenamiento en el listado de ofertas

    $scope.setSelectedOfertas = function (filterType, filterValue) { //funcion para armar el objeto con los filtros para las ofertas
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

        //llamo al webapi para obtener los valores filtrados
        $scope.obtenerListadoFiltradoOfertas();

    }

    $scope.obtenerListadoFiltradoOfertas = function () {
        console.log('entra a $scope.obtenerListadoFiltradoOfertas');

        var query = angular.copy($scope.queryFiltros);

        ofertasDF.obtenerOfertasFiltradas(query).then(function (response) {
            console.log('entra a obtener ofertas filtradas');
            $scope.ofertas = response.results;
            $scope.TotalRows = response.totalPages;
        },
    function (err) {
        if (err) {
            $scope.error = err;
            alert("Error al Filtrar las Ofertas: " + $scope.error.Message);
        }
    });
    }

    $scope.logPaginationOfertas = function (page, limit) {
        console.log('page: ', page);
        console.log('limit: ', limit);
        //llamo al webapi para obtener los valores filtrados
        $scope.obtenerListadoFiltradoOfertas();
    }

    $scope.ordenOfertasChanged = function () {
        console.log('Ordenamiento: ', $scope.queryFiltros.orderBy);
        //llamo al webapi para obtener los valores filtrados        
        $scope.obtenerListadoFiltradoOfertas();
    }

    $scope.busquedaNombreOferta = function (prmNombre) {
        console.log('Busqueda por nombre: ', $scope.queryFiltros.searchText);
        $scope.queryFiltros.searchText = prmNombre;
        //llamo al webapi para obtener los valores filtrados        
        $scope.obtenerListadoFiltradoOfertas();
    }
    //#endregion
});