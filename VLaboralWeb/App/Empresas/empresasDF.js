vLaboralApp.factory('empresasDF', function ($http, $q, configSvc, authSvc) {

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

    var _putEmpresa = function (prmEmpresa) {
        var deferred = $q.defer();
        $http.put(urlApi + 'api/Empresas/'+prmEmpresa.Id,prmEmpresa).then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    }

    var _postImagenEmpresa = function (file) {
        var deferred = $q.defer();
        $http.post(urlApi + 'api/Empresa/Imagenes', file).then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response);
            });
    }

    //#region fpaz: area de asignacion de funciones a objeto
    empresasDF.getEmpresa = _getEmpresa;
    empresasDF.getEmpresas = _getEmpresas;
    empresasDF.putEmpresa = _putEmpresa;
    empresasDF.postImagenEmpresa = _postImagenEmpresa;
    //#endregion

    return empresasDF;
    
});

