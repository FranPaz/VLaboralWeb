vLaboralApp.factory('experienciasLaboralesDF', function ($http, $q, configSvc, authSvc) {

    var urlApi = configSvc.urlApi; // fpaz: toma el url del api de configSvc
    var experienciasLaboralesDF = {};

    var _postExperiencia = function (data) { //iafar: alta de una Experiencia Academica en particular
        var deferred = $q.defer();
        $http.post(urlApi + 'api/ExperienciaLaborals', data).then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    }

    var _putExperiencia = function (prmId, data) { // iafar: Modifica una Experiencia Academica segun Id
        var deferred = $q.defer();

        $http.put(urlApi + 'api/ExperienciaLaborals/' + prmId, data).then(
            function (response) {
                deferred.resolve(response.data);
            },

            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };


    var _getExperienciaPendiente = function (prmIdExperiencia) { //iafar: trae el detalle de una sola experiencia pendiente a verificar junto a los datos basicos del profesional 
        //authSvc.authentication.empresaId
        var deferred = $q.defer();
        $http.get(urlApi + 'api/ExperienciaLaboral/Verificacion',
             {
                 params: { idExperiencia: prmIdExperiencia }
             }
            +prmIdExperiencia).then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    }

    var _getExperienciasPendientes = function () { //iafar: trae todas las experiencias pendientes a verificar por la empresa
        debugger;
        var prmIdEmpresa = authSvc.authentication.empresaId;
        var deferred = $q.defer();
        $http.get(urlApi + 'api/ExperienciaLaboral/PendientesValidar',  {
            params: { idEmpresa: prmIdEmpresa }
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
    experienciasLaboralesDF.postExperiencia = _postExperiencia;
    experienciasLaboralesDF.putExperiencia = _putExperiencia;
    experienciasLaboralesDF.getExperienciasPendientes = _getExperienciasPendientes;
    experienciasLaboralesDF.getExperienciaPendiente = _getExperienciaPendiente;
    //#endregion

    return experienciasLaboralesDF;
});