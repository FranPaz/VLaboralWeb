vLaboralApp.factory('profesionalesDF', function ($http, $q, configSvc, authSvc) {
    //iafar: url del web api de cuentas de usuario, cambiar por el de produccion una vez implementado
    var urlApi = configSvc.urlApi; //desarrollo    
    var profesionalesDF = {};


    //iafar: funcion para recuperar un listado de todos los profesionales
    var _getProfesionales = function (page, rows) { //prmIdProfesional, prmNombre, 
        //prmApellido, prmValoracion, prmRubro, prmLugarResidencia
        var deferred = $q.defer();
        $http.get(urlApi + 'api/Profesionals/', {
            params: {
                //idProfesional: prmIdProfesional,
                //nombre: prmNombre,
                //apellido: prmApellido,
                //valoracion: prmValoracion,
                //rubro: prmRubro,
                //lugarResidencia: prmLugarResidencia,
                page: page,
                rows:rows
            }
        }).then(
           function (response) {
               deferred.resolve(response.data.Results);
           },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    }

    var _getProfesionalId = function (tipoIdentificacionId, valor) { //iafar: funcion para recuperar un profesional en particular segun Id
        var deferred = $q.defer();
        $http.get(urlApi + 'api/Profesionals/', {
            params: {
                tipoIdentificacion: tipoIdentificacionId,
                valor: valor
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

    var _getProfesional = function (prmIdPro) { //iafar: funcion para recuperar un profesional en particular segun Id
        var deferred = $q.defer();
        $http.get(urlApi + 'api/Profesionals/' + prmIdPro).then(
            function (response) {                
                if (response.data.Habilidades !== null) {
                    response.data.Habilidades = response.data.Habilidades.split(",");
                } else {
                    response.data.Habilidades = [];
                }


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

    //#region fpaz: obtiene el listado de filtros disponibles y posibles valores de esos filtros
    var _obtenerOpcionesFiltrosProfesionales = function () {
        var deferred = $q.defer();
        var options = {
            Filters: [
                "Rubros",
                "Valoraciones"
            ]
        };

        $http.post(urlApi + 'api/Profesionals/QueryOptions', options).then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };
    //#endregion

    //#region fpaz: devuelve el listado de profesionales filtrados
    var _obtenerProfesionalesFiltrados = function (prmQueryBusquedaFiltrada) {
        var deferred = $q.defer();

        $http.post(urlApi + 'api/Profesionals/Search', prmQueryBusquedaFiltrada).then(
            function (response) {
                deferred.resolve(response.data.results);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };
    //#endregion

    //#region iafar: area de asignacion de funciones a objeto
    profesionalesDF.getProfesional = _getProfesional;
    profesionalesDF.getProfesionales = _getProfesionales;
    profesionalesDF.putProfesional = _putProfesional;
    profesionalesDF.obtenerOpcionesFiltrosProfesionales = _obtenerOpcionesFiltrosProfesionales;
    profesionalesDF.obtenerProfesionalesFiltrados = _obtenerProfesionalesFiltrados;
    profesionalesDF.getProfesionalId = _getProfesionalId;
    //#endregion


    return profesionalesDF;
});