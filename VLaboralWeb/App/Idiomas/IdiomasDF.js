vLaboralApp.factory('idiomasDF', function ($http, $q, configSvc) {
    var urlApi = configSvc.urlApi; // fpaz: toma el url del api de configSvc
    var idiomasDF = {};

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

    var _getCompetencias = function () {
        var deferred = $q.defer();
        $http.get(urlApi + 'api/CompetenciaIdiomas').then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    }

    var _postIdiomaConocido = function (data) { //fpaz: alta de un idioma que el profesional cargue dentro de sus idiomas conocidos
        var deferred = $q.defer();
        $http.post(urlApi + 'api/IdiomaConocidoes', data).then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };


    //#region iafar: area de asignacion de funciones a objeto
    idiomasDF.getIdiomas = _getIdiomas;
    idiomasDF.getCompetencias = _getCompetencias;
    idiomasDF.postIdiomaConocido = _postIdiomaConocido;
    //#endregion

    return idiomasDF;
});