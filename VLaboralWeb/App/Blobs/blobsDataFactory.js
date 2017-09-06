vLaboralApp.factory('blobsDataFactory', function (Upload, $timeout, $http, $q, configSvc) {
    var urlApi = configSvc.urlApi; // fpaz: toma el url del api de configSvc
    var blobsDataFactory = {};

    //fpaz: Upload de una imagen al Blob de Azure
    var _postBlob = function (file) {
        var deferred = $q.defer();
        file.upload = Upload.upload({
            url: urlApi +'api/Imagenes',
            data: { file: file },
        });
        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;                
                deferred.resolve(file.result);                
            });
        }, function (response) {
            if (response.status > 0)
                var errorMsg = response.status + ': ' + response.data;            
            deferred.reject(errorMsg);            
        });
        return deferred.promise;
    };


    //#region descarga de archivos
    var _getFile = function (blobId) {
        var config = { responseType: 'blob' };
        var deferred = $q.defer();
        $http.get(urlApi + 'api/Imagenes/', {
            params: {blobId: blobId}
        }, config
        ).then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response);
            });
        return deferred.promise;
    }
    //#endregion


    blobsDataFactory.postImagen = _postBlob;
    blobsDataFactory.getFile = _getFile;
    return blobsDataFactory;
});

