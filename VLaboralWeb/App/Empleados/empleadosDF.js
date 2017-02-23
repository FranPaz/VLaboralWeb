vLaboralApp.factory('empleadosDF', function ($http, $q, configSvc) {
    var urlApi = configSvc.urlApi;
    empleadosDF = {};


    var _getEmpleadoId = function (tipoIdentificacionId, valor) { //iafar: funcion para recuperar un profesional en particular segun Id
        var deferred = $q.defer();
        $http.get(urlApi + 'api/Empleadoes/', {
            params: {
                tipoIdentificacion: tipoIdentificacionId,
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

    var _postEmpleado = function (data) {
        var deferred = $q.defer();

        $http.post(urlApi + 'api/Empleadoes', data).then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    }
    
    empleadosDF.getEmpleado = _getEmpleadoId;
    empleadosDF.postEmpleado = _postEmpleado;
    return empleadosDF;

});