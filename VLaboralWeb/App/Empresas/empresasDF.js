vLaboralApp.factory('empresasDF', function ($http, $q, configSvc) {

    var urlApi = configSvc.urlApi; 
    var empresasDF = {};

    var _getEmpresas = function () {
        var deferred = $q.defer();
        $http.get(urlApi + 'api/Empresas').then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    }

    var _getEmpresa = function (prmIdEmpresa) { //iafar: funcion para recuperar una empresa en particular segun Id
        var deferred = $q.defer();
        $http.get(urlApi + 'api/Empresas/' + prmIdEmpresa).then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    }

    //#region fpaz: area de asignacion de funciones a objeto
    empresasDF.getEmpresa = _getEmpresa;
    empresasDF.getEmpresas = _getEmpresas;
    //#endregion

    return empresasDF;
    
});

