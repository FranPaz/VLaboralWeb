vLaboralApp.factory('ofertasDF', function ($http, $q, configSvc, authSvc) {
    //iafar: url del web api de cuentas de usuario, cambiar por el de produccion una vez implementado
    var urlApi = configSvc.urlApi; //desarrollo    
    var ofertasDF = {};


    //#region iafar: alta de una oferta publica en particular
    var _postOferta = function (data) { 
        var deferred = $q.defer();
        $http.post(urlApi + 'api/Ofertas', data).then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };
    //#endregion

    //#region iafar: alta de una oferta privada 
    var _postOfertaPrivada = function (prmOfertaPrivada) { 
        var deferred = $q.defer();
        $http.post(urlApi + 'api/OfertasPrivadas', prmOfertaPrivada).then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };
    //#endregion

    //#region SLuna: Traer Ofertas Acticas con paginación
    var _getOfertas = function (prmPage,prmRows) {
        var deferred = $q.defer();
        $http.get(urlApi + 'api/Ofertas', {
            params: {
                page: prmPage,
                rows: prmRows
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
    //#endregion

    //#region fpaz: Traer Ofertas relacionadas con el subrubro del profesional
    var _getOfertasProfesional = function () {
        var deferred = $q.defer();
        $http.get(urlApi + 'api/Ofertas/',
            {
                params: {
                    prmIdProfesional: authSvc.authentication.profesionalId
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


    //#endregion

    //#region kikexp: trae una oferta en particular
    var _getOferta = function (prmIdOferta) {
        var deferred = $q.defer();
        $http.get(urlApi + 'api/Ofertas/', {
            params: { id: prmIdOferta }
        }).then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    }
    //#endregion

    //#region sluna: Pasa la oferta a la siguiente etapa
    var _postOfertaPasarSiguienteEtapa = function (prmIdOferta) {
        var deferred = $q.defer();
        $http.post(urlApi + 'api/Ofertas/PasarSiguienteEtapa/' + prmIdOferta).then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    }
    //#endregion
    
    //#region iafar: devuelve listado de ofertas privadas al profesional
    var _getOfertasPrivadasProfesional = function (page, rows
        //prmIdProfesional,
        //prmFechaDesde, prmFechaHasta, prmEstadoOferta, prmNombreOferta, 
        //prmIsPostulado
        ) {
        var deferred = $q.defer();
        $http.get(urlApi + 'api/OfertasPrivadas/', {
            params: {
                //idProfesional: prmIdProfesional,
                //fechaDesde: prmFechaDesde,
                //fechaHasta: prmFechaHasta,
                //estadoOferta: prmEstadoOferta,
                //nombreOferta: prmNombreOferta,
                //isPostulado: prmIsPostulado
                page: page,
                rows: rows
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
    //#endregion

    //#region iafar: area de asignacion de funciones a objeto
    ofertasDF.getOfertas = _getOfertas;
    ofertasDF.getOfertasProfesional = _getOfertasProfesional;
    ofertasDF.postOferta = _postOferta;
    ofertasDF.getOferta = _getOferta;
    ofertasDF.postOfertaPasarSiguienteEtapa = _postOfertaPasarSiguienteEtapa;
    ofertasDF.getOfertasPrivadasProfesional = _getOfertasPrivadasProfesional;
    ofertasDF.postOfertaPrivada = _postOfertaPrivada;
    //#endregion
        
    return ofertasDF;

    

});