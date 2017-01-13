vLaboralApp.factory('tiposNotificacionesDF', function ($http, $q, configSvc, authSvc) {

    var urlApi = configSvc.urlApi; // fpaz: toma el url del api de configSvc
    var tiposNotificacionesDF = {};

    var _getTiposNotificaciones = function () { //fpaz: devuelve los tipos notificaciones segun el tipo de usuario logueado
        var deferred = $q.defer();

        $http.get(urlApi + 'api/TiposNotificaciones', {
            params: {
                prmTipoReceptor: authSvc.authentication.tipoUser
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
    tiposNotificacionesDF.getTiposNotificaciones = _getTiposNotificaciones;
    //#endregion

    return tiposNotificacionesDF;
});