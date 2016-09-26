vLaboralApp.factory('tiposNivEstudioDF', function ($http, $q, configSvc) {
    var urlApi = configSvc.urlApi; // fpaz: toma el url del api de configSvc
    var tiposNivEstudioDF = {};

    var _getTiposNivelEstudio = function () { //fpaz: devuelve el listado de todos los tipos de contratos guardados en el abd
        var deferred = $q.defer();
        $http.get(urlApi + 'api/TipoNivelEstudios').then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    }

    tiposNivEstudioDF.getTiposNivelEstudio = _getTiposNivelEstudio;

    return tiposNivEstudioDF;
});