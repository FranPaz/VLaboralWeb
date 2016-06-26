/**
 * Created by ifarhat on 23/06/2016.
 */
vLaboralApp.factory('habilidadesDF', function ($http, $q, configSvc) {

    var urlApi = configSvc.urlApi; // fpaz: toma el url del api de configSvc
    var habilidadesDF = {};

    var _getHabilidades = function () {
        var deferred = $q.defer();
        $http.get(urlApi + 'api/Habilidads').then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    }


//#region iafar: area de asignacion de funciones a objeto
    habilidadesDF.getHabilidades = _getHabilidades;
//#endregion

    return habilidadesDF;
});