vLaboralApp.factory('notificacionesDF', function ($http, $q, configSvc) {

    var urlApi = configSvc.urlApi; // fpaz: toma el url del api de configSvc
    var notificacionesDF = {};

    //var _postExperiencia = function (data) { //iafar: alta de una Experiencia Academica en particular
    //    var deferred = $q.defer();
    //    $http.post(urlApi + 'api/ExperienciaLaborals', data).then(
    //        function (response) {
    //            deferred.resolve(response);
    //        },
    //        function (response) {
    //            deferred.reject(response.data);
    //        });
    //    return deferred.promise;
    //};

 

    //#region iafar: area de asignacion de funciones a objeto
    //experienciasLaboralesDF.postExperiencia = _postExperiencia;
    //experienciasLaboralesDF.putExperiencia = _putExperiencia;
    //#endregion

    return notificacionesDF;
});