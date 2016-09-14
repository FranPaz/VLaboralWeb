vLaboralApp.factory('formacionesAcademicasDF', function ($http, $q, configSvc) {
    //iafar: Este datafactory contiene las funciones para el manejo de 
    //todo lo relacionado con formacion academica
    //educacion, idioma conocido
    var urlApi = configSvc.urlApi; // fpaz: toma el url del api de configSvc
    var formacionesAcademicasDF = {};
    //#region iafar: Funciones para educacion
    var _postEducacion = function (data) { //iafar: alta de una formacion Academica en particular
        var deferred = $q.defer();
        $http.post(urlApi + 'api/Educacions', data).then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };

    var _putEducacion = function (prmId, data) { // iafar: Modifica una Formacion Academica segun Id
        var deferred = $q.defer();

        $http.put(urlApi + 'api/Educacions/' + prmId, data).then(
            function (response) {
                deferred.resolve(response.data);
            },

            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };
    //#endregion


    //#region iafar: Funciones para Idiomas Conocidos por el Profesional
    var _postIdiomaConocido = function (data) { //iafar: alta de un idioma en particular del profesional
        var deferred = $q.defer();
        $http.post(urlApi + 'api/IdiomaConocidoes', data).then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };

    var _putIdiomaConocido = function (prmId, data) { // iafar: Modifica un Idioma del profesional segun Id
        var deferred = $q.defer();

        $http.put(urlApi + 'api/IdiomaConocidoes/' + prmId, data).then(
            function (response) {
                deferred.resolve(response.data);
            },

            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };

    //#endregion



    //#region iafar: area de asignacion de funciones a objeto
    formacionesAcademicasDF.postEducacion = _postEducacion;
    formacionesAcademicasDF.putEducacion = _putEducacion;
    formacionesAcademicasDF.postIdiomaConocido = _postIdiomaConocido;
    formacionesAcademicasDF.putIdiomaConocido = _putIdiomaConocido;
    //#endregion

    return formacionesAcademicasDF;
});