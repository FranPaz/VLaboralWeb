/**
 * Created by ifarhat on 23/06/2016.
 */
vLaboralApp.factory('requisitosDF', function ($http, $q, configSvc) {

    var urlApi = configSvc.urlApi; // fpaz: toma el url del api de configSvc
    var requisitosDF = {};

    var _getTiposRequisito = function () {
        var deferred = $q.defer();
        $http.get(urlApi + 'api/TipoRequisitoes').then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    }


//#region iafar: area de asignacion de funciones a objeto
    requisitosDF.getTiposRequisito = _getTiposRequisito;
//#endregion

    return requisitosDF;
});