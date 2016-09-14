vLaboralApp.factory('idiomasDF', function ($http, $q, configSvc) {
    var urlApi = configSvc.urlApi; // fpaz: toma el url del api de configSvc
    var IdiomasDF = {};

    var _getIdiomas = function () {
        var deferred = $q.defer();
        $http.get(urlApi + 'api/Idiomas').then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    }


    //#region iafar: area de asignacion de funciones a objeto
    IdiomasDF.getIdiomas = _getIdiomas;
    //#endregion

    return IdiomasDF;
});