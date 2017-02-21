vLaboralApp.factory('empleadosDF', function ($http, $q, configSvc) {
    var urlApi = configSvc.urlApi;
    empleadosDF = {};


    var _getEmpleado = function (tipoIdentificacion, valor) {
        var deferred = $q.defer();

        $http.get(urlApi + 'api/Empleadoes/', {
            pararms: {
                TipoIdentificacionEmpleadoId: tipoIdentificacion,
                valor: valor
            }
        }).then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (response) {
                deferred.reject(response.data);
            });

        return deferred.promise;
    }
    
    empleadosDF.getEmpleado = _getEmpleado;

    return empleadosDF;

});