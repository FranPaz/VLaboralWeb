vLaboralApp.controller('empresasCtrl', function ($scope
    , authSvc, ofertasDF//fpaz: definicion de data factorys
    , listadoOfertas, infoEmpresa, listOpcionesFiltrosOfertas//fpaz: definicion de parametros de entrada    
    ) {

    //#region Inicializacion de Variables de Scope
    $scope.empresa = infoEmpresa;
    $scope.ofertas = listadoOfertas;
    $scope.totalOfertas = listadoOfertas.TotalRows;
    $scope.usuarioLogueado = authSvc.authentication;//fpaz: obtiene la informacion del usuario logueado
    $scope.opcionesFiltrosOfertas = listOpcionesFiltrosOfertas;
    $scope.queryFiltros = {};
    //#endregion
    
    //#region fpaz: funciones para el manejo de filtros y ordenamiento en el listado de ofertas

    $scope.setSelectedOfertas = function (filterType, filterValue) { //funcion para armar el objeto con los filtros para las ofertas
        //si el valor pasado como parametro existe lo elimino, sino lo agrego

        //convierto el id en string
        var id = filterValue.id.toString();

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
            $scope.ofertas = response;
        },
    function (err) {
        if (err) {
            $scope.error = err;
            alert("Error al Filtrar las Ofertas: " + $scope.error.Message);
        }
    });
    }

    //#endregion
});