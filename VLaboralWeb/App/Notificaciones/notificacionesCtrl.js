vLaboralApp.controller('notificacionesCtrl', function ($scope, $mdMedia, $mdDialog, $ocLazyLoad, $filter, $stateParams //fpaz: definicion de inyectores de dependencias
    , notificacionesDF, authSvc, hubProxySvc //fpaz: definicion de data factorys
     //fpaz: definicion de parametros de entrada    
    ) {

    console.log('trying to connect to service');
    console.log('hubProxySvc.defaultServer ' + hubProxySvc.defaultServer);
    var notificacionesDataHub = hubProxySvc(hubProxySvc.defaultServer, 'notificacionesHub');
    console.log('connected to service');
    

    notificacionesDataHub.on('enviarNotificacion', function (data) {
        console.log(data.Titulo + ": " + data.Mensaje);
    });

    $scope.notificaciones = [];
    
});