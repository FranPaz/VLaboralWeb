vLaboralApp.factory('tiposContratoDF', function ($http, $q, configSvc) {
    var urlApi = configSvc.urlApi; // fpaz: toma el url del api de configSvc
    var tiposContratoDF = {};

    var _getTiposContratos = function () { //fpaz: devuelve el listado de todos los tipos de contratos guardados en el abd
        var deferred = $q.defer();
        $http.get(urlApi + 'api/TipoContratos').then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    }

    tiposContratoDF.getTiposContratos = _getTiposContratos;

    return tiposContratoDF;
});