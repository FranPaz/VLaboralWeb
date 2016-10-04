vLaboralApp.factory('postulantesDF', function ($http, $q, configSvc, authSvc) {
    
    var urlApi = configSvc.urlApi;
    var postulantesDF = {};



    var _postPostulacion = function (prmIdPuesto) { //fpaz: postulacion de un profesional en un puesto en particular
        var deferred = $q.defer();

        var NuevaPostulacion = {};
        NuevaPostulacion.ProfesionalId = authSvc.authentication.profesionalId;
        NuevaPostulacion.PuestoId = prmIdPuesto;

        $http.post(urlApi + 'api/Postulaciones', NuevaPostulacion).then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };

    var _putPostulacion = function (postulaciones, puestoEtapaOfertaId) {
        var deferred = $q.defer();

        var resultadoPostulacion = {};
        resultadoPostulacion.Postulaciones = postulaciones;
        resultadoPostulacion.puestoEtapaOfertaId = puestoEtapaOfertaId;

        $http.put(urlApi + 'api/Postulaciones', resultadoPostulacion).then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };

    //#region iafar: area de asignacion de funciones a objeto    
    postulantesDF.postPostulacion = _postPostulacion;
    postulantesDF.putPostulacion = _putPostulacion;
    //#endregion

    return postulantesDF;
});