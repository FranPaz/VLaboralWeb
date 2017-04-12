vLaboralApp.factory('empleadosDF', function ($http, $q, configSvc) {

    //iafar: url del web api de cuentas de usuario, cambiar por el de produccion una vez implementado
    var urlApi = configSvc.urlApi; //desarrollo    
    var empleadosDF = {};

    var _getEmpleados = function (page, rows) { 
        var deferred = $q.defer();
        $http.get(urlApi + 'api/Empleados/', {
            params: {
                page: page,
                rows: rows
            }
        }).then(
           function (response) {
               deferred.resolve(response.data.Results);
           },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    }

    var _getEmpleado = function (prmId) {
        var deferred = $q.defer();
        $http.get(urlApi + 'api/Empleados/' + prmId).then(
            function (response) {                
                deferred.resolve(response.data);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    }
    
    //#region fpaz: obtiene el listado de filtros disponibles y posibles valores de esos filtros
    var _obtenerOpcionesFiltrosEmpleados = function () {
        var deferred = $q.defer();
        var options = {
            Filters: [
                "Rubros",
                "Valoraciones"
            ]
        };

        $http.post(urlApi + 'api/Empleados/QueryOptions', options).then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };
    //#endregion

    //#region fpaz: devuelve el listado de empleados filtrados
    var _obtenerEmpleadosFiltrados = function (prmQueryBusquedaFiltrada) {
        var deferred = $q.defer();

        $http.post(urlApi + 'api/Empleados/Search', prmQueryBusquedaFiltrada).then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };
    //#endregion

    //#region iafar: area de asignacion de funciones a objeto
    empleadosDF.getEmpleados = _getEmpleados;
    empleadosDF.getEmpleado = _getEmpleado;
    empleadosDF.obtenerOpcionesFiltrosEmpleados = _obtenerOpcionesFiltrosEmpleados;
    empleadosDF.obtenerEmpleadosFiltrados = _obtenerEmpleadosFiltrados;
    //#endregion


    return empleadosDF;

})