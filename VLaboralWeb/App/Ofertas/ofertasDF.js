vLaboralApp.factory('ofertasDF', function ($http, $q, configSvc) {
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
    

    //#region iafar: area de asignacion de funciones a objeto
    ofertasDF.getOfertas = _getOfertas;

    ofertasDF.postOferta = _postOferta;
    //#endregion





    
    return ofertasDF;

    

});