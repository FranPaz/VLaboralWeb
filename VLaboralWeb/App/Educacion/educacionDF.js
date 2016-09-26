vLaboralApp.factory('educacionDF', function ($http, $q, configSvc) {
    //iafar: Este datafactory contiene las funciones para el manejo de 
    //todo lo relacionado con formacion academica
    
    var urlApi = configSvc.urlApi; // fpaz: toma el url del api de configSvc
    var educacionDF = {};
    //#region iafar: Funciones para educacion
    var _postEducacion = function (data) { //iafar: alta de una formacion Academica en particular
        var deferred = $q.defer();
        $http.post(urlApi + 'api/Educacions', data).then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };

    var _putEducacion = function (prmId, data) { // iafar: Modifica una Formacion Academica segun Id
        var deferred = $q.defer();

        $http.put(urlApi + 'api/Educacions/' + prmId, data).then(
            function (response) {
                deferred.resolve(response.data);
            },

            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };
    //#endregion


    //#region iafar: area de asignacion de funciones a objeto
    educacionDF.postEducacion = _postEducacion;
    educacionDF.putEducacion = _putEducacion;
    //#endregion

    return educacionDF;
});