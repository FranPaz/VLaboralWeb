vLaboralApp.factory('cuentaDataFactory', function ($resource) { // data factory para manejar las cuentas de usuario
    //fpaz: url del web api de cuentas de usuario, cambiar por el de produccion una vez implementado
    //var urlApi = "http://localhost:32069"; //desarrollo
    var urlApi = "http://vlaboralapi.azurewebsites.net"; //azure
    return $resource(urlApi + '/api/accounts/create/:id',
           { id: '@id' },
           { 'update': { method: 'PUT' } }
        );
});