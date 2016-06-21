vLaboralApp.factory('tiposDisponibilidadDF', function ($http, $q, configSvc) {
    var urlApi = configSvc.urlApi; // fpaz: toma el url del api de configSvc
    var tiposDisponibilidadDF = {};

    var _getTiposDisp = function () { //fpaz: devuelve el listado de todos los tipos de disponibilidad guardados en el abd
        var deferred = $q.defer();
        $http.get(urlApi + 'api/TipoDisponibilidads').then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    }

    tiposDisponibilidadDF.getTiposDisp = _getTiposDisp;

    return tiposDisponibilidadDF;
});