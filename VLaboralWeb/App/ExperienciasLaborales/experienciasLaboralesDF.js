vLaboralApp.factory('experienciasLaboralesDF', function ($http, $q, configSvc) {

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
    };

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


    var _getExperienciasPendientes = function (prmIdEmpresa,prmIdProfesional) {
        //authSvc.authentication.empresaId
        return $http.get(urlApi + 'api/ExperienciaLaboral/Verificacion', {
            params: {
                idEmpresa: prmIdEmpresa,
                idProfesional: prmIdProfesional
            }
        }).then(function (response) {
            console.log(response.data);
            return response.data;
        });
    }


    //#region iafar: area de asignacion de funciones a objeto
    experienciasLaboralesDF.postExperiencia = _postExperiencia;
    experienciasLaboralesDF.putExperiencia = _putExperiencia;
    experienciasLaboralesDF.getExperienciasPendientes = _getExperienciasPendientes;
    //#endregion

    return experienciasLaboralesDF;
});