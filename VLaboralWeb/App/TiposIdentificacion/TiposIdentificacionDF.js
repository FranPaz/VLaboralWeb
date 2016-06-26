vLaboralApp.factory('tiposIdentificacionDF', function ($http, $q) {
    var urlApi = configSvc.urlApi;; //desarrollo
    //var urlApi = ""; //iafar: url azure a definir
    var tiposIdentificacionDF = {};

    var _getIdentificacionesProfesional = function () {
        var deferred = $q.defer();
        $http.get(urlApi + 'api/TipoIdentificacionProfesionals').then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    }





    //#region iafar: area de asignacion de funciones a objeto
    tiposIdentificacionDF.getIdentificacionesProfesional = _getIdentificacionesProfesional;
    //#endregion

    
    return tiposIdentificacionDF;



});