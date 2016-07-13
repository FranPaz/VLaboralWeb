vLaboralApp.factory('profesionalesDF', function ($http, $q, configSvc, authSvc) {
    //iafar: url del web api de cuentas de usuario, cambiar por el de produccion una vez implementado
    var urlApi = configSvc.urlApi; //desarrollo    
    var profesionalesDF = {};

    var _getProfesional = function (prmIdPro) { //iafar: funcion para recuperar un profesional en particular segun Id

        var prmIdProfesional = authSvc.authentication.profesionalId; // fpaz: variable que va a tener el id del profesional logueado

        var deferred = $q.defer();
        $http.get(urlApi + 'api/Profesionals/' + prmIdProfesional).then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    }

    var _putProfesional = function (prmId, data) { // iafar: Modifica un Profesional segun Id
        var deferred = $q.defer();

        $http.put(urlApi + 'api/Profesionals/' + prmId, data).then(
            function (response) {
                deferred.resolve(response.data);
            },

            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };


    //#region iafar: area de asignacion de funciones a objeto
    profesionalesDF.getProfesional = _getProfesional;
    profesionalesDF.putProfesional = _putProfesional;
    //#endregion


    return profesionalesDF;
});