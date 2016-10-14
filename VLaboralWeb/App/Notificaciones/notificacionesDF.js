vLaboralApp.factory('notificacionesDF', function ($http, $q, configSvc) {

    var urlApi = configSvc.urlApi; // fpaz: toma el url del api de configSvc
    var notificacionesDF = {};

    var _getNotificacionesRecibidas = function (prmPage, prmRows) {
        var deferred = $q.defer();
        $http.get(urlApi + 'api/Notificaciones', {
            params: {
                page: prmPage,
                rows: prmRows
            }
        }).then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    }

 

    //#region iafar: area de asignacion de funciones a objeto
    notificacionesDF.getNotificacionesRecibidas = _getNotificacionesRecibidas;
    //#endregion

    return notificacionesDF;
});