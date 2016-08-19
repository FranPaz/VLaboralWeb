vLaboralApp.factory('postulantesDF', function ($http, $q, configSvc, authSvc) {
    //iafar: url del web api de cuentas de usuario, cambiar por el de produccion una vez implementado
    var urlApi = configSvc.urlApi; //desarrollo
    //var urlApi = ""; //iafar: url azure a definir
    var postulantesDF = {};

    var _postPostulantes = function (data) { //iafar: alta de un postulante
        var deferred = $q.defer();
        $http.post(urlApi + '/api/Postulantes/', data).then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };



    //#region iafar: area de asignacion de funciones a objeto
    postulantesDF.postPostulantes = _postPostulantes;
    
    //#endregion




});