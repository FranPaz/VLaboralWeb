vLaboralApp.factory('cursosDF', function ($http, $q, configSvc) {
    //iafar: Este datafactory contiene las funciones para el manejo de 
    //todo lo relacionado con formacion academica
    
    var urlApi = configSvc.urlApi; // fpaz: toma el url del api de configSvc
    var cursosDF = {};

    //#region iafar: Funciones para cursos

    var _postCursos = function (data) { //iafar: alta de uncurso o certificacion
        var deferred = $q.defer();
        $http.post(urlApi + 'api/Cursos', data).then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };
    
    //#endregion
    

    //#region iafar: area de asignacion de funciones a objeto
    cursosDF.postCursos = _postCursos;
    //#endregion

    return cursosDF;
});