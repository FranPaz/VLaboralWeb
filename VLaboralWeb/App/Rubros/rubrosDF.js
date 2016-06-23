vLaboralApp.factory('rubrosDF', function ($http, $q, configSvc) {

    var urlApi = configSvc.urlApi; // fpaz: toma el url del api de configSvc
    var rubrosDF = {};

    var _getRubros = function () {
        var deferred = $q.defer();
        $http.get(urlApi + 'api/Rubros').then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    }

    var _getRubro = function (prmIdRubro) {
        var deferred = $q.defer();
        $http.get(urlApi + 'api/Rubros/' + prmIdRubro).then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    }

    rubrosDF.getRubros = _getRubros;
    rubrosDF.getRubro = _getRubro;

    return rubrosDF;
});