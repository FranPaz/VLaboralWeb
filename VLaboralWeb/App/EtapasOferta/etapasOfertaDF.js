vLaboralApp.factory('etapasOfertaDF', function ($http, $q, configSvc) {
    var urlApi = configSvc.urlApi; // fpaz: toma el url del api de configSvc
    var etapasOfertaDF = {};

    var _getEtapasObligatorias = function () { //fpaz: devuelve el listado de todas las etapas obligatorias que debe tener una oferta
        var deferred = $q.defer();
        $http.get(urlApi + 'api/EtapaOfertas').then(
            function (response) {                
                deferred.resolve(response.data);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    }

    var _getEtapaOferta = function (prmIdEtapa) {
        var deferred = $q.defer();
        $http.get(urlApi + 'api/EtapaOfertas/', {
            params: { id: prmIdEtapa }
        }).then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    }

    etapasOfertaDF.getEtapasObligatorias = _getEtapasObligatorias;
    etapasOfertaDF.getEtapaOferta = _getEtapaOferta;

    return etapasOfertaDF;
});