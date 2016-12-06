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

    var _putPostulacion = function (postulacion) {
        var deferred = $q.defer();

        $http.put(urlApi + 'api/Postulaciones', postulacion).then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };

   

    //iafar: devuelve listado de postulaciones del profesional
    var _getPostulacionesProfesional = function (page, rows
        //prmIdProfesional,
        //prmFechaDesde, prmFechaHasta, prmEstadoOferta, prmNombreOferta
        ) {
        
        var deferred = $q.defer();
        $http.get(urlApi + 'api/Postulaciones', {
            params: {
                //idProfesional: prmIdProfesional,
                //fechaDesde: prmFechaDesde,
                //fechaHasta: prmFechaHasta,
                //estadoOferta: prmEstadoOferta,
                //nombreOferta: prmNombreOferta           
                page: page,
                rows:rows
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
    postulantesDF.postPostulacion = _postPostulacion;
    postulantesDF.putPostulacion = _putPostulacion;
    postulantesDF.getPostulacionesProfesional = _getPostulacionesProfesional;
    //#endregion

    return postulantesDF;
});