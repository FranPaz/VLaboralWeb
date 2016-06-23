vLaboralApp.factory('ofertasDF', function ($http,$q) {
    //iafar: url del web api de cuentas de usuario, cambiar por el de produccion una vez implementado
    var urlApi = "http://localhost:32069"; //desarrollo
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




    //iafar: llamada a funciones del DF
    ofertasDF.postOferta = _postOferta;

    //iafar: se devuelve objeto con datos de consulta
    return ofertasDF;

    

});