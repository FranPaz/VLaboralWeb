﻿vLaboralApp.factory('ofertasDF', function ($http, $q, configSvc, authSvc) {
    //iafar: url del web api de cuentas de usuario, cambiar por el de produccion una vez implementado
    var urlApi = configSvc.urlApi; //desarrollo
    //var urlApi = ""; //iafar: url azure a definir
    var ofertasDF = {};



    var _postOferta = function (data) { //iafar: alta de una oferta en particular
        var deferred = $q.defer();
        $http.post(urlApi + '/api/Ofertas/', data).then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };

    //#region SLuna: Traer Ofertas Acticas con paginación
    var _getOfertas = function (prmPage,prmRows) {
        var deferred = $q.defer();
        $http.get(urlApi + 'api/Ofertas?page=' + prmPage + '&rows=' + prmRows).then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    }
    //#endregion

    //#region fpaz: Traer Ofertas relacionadas con el profesional
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
    var _getOferta = function (prmId) {
        var deferred = $q.defer();
        $http.get(urlApi + 'api/Ofertas/',
            {
                params: {
                    prmId: prmId
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
    //endregion
    

    //#region iafar: area de asignacion de funciones a objeto
    ofertasDF.getOfertas = _getOfertas;
    ofertasDF.getOfertasProfesional = _getOfertasProfesional;
    ofertasDF.postOferta = _postOferta;
    ofertasDF.getOferta = _getOferta;
    //#endregion





    
    return ofertasDF;

    

});