vLaboralApp.factory('tiposEtapasDF', function ($http, $q, configSvc) {
    var urlApi = configSvc.urlApi; // fpaz: toma el url del api de configSvc
    var tiposEtapasDF = {};

    var _getTiposEtapas = function () { //fpaz: devuelve el listado de todos los tipos de etapas que pueden tener las ofertas
        var deferred = $q.defer();
        $http.get(urlApi + 'api/TipoEtapas').then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    }

    tiposEtapasDF.getTiposEtapas = _getTiposEtapas;

    return tiposEtapasDF;
});