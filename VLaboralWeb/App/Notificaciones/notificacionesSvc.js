vLaboralApp.factory('notificacionesSvc', function ($http, $rootScope, $location, Hub, $timeout, authSvc, configSvc, localStorageService) {
    //#region viejo
    var urlHub = configSvc.urlApi; // fpaz: toma el url del api de configSvc
    var notificacionesSvc = {};
    var notificaciones = this;
    var authData = localStorageService.get('authorizationData');
    

    //Hub setup
    var hub = new Hub("notificacionesHub", {

        //client side methods
        listeners:{
            'enviarNotificacion': function (prmNotificacion) {
                _agregarNotificacion(prmNotificacion);
                $rootScope.$apply();
            }
        },

        //server side methods
        methods: ['enviarNotificacionPostulacion'],

        //query params sent on initial connection
        queryParams: {
            "userId": authData.idUsuarioLogueado
        },

        //handle connection error
        errorHandler: function(error){
            console.error(error);
        },
        hubDisconnected: function () {
            if (hub.connection.lastError) {
                hub.connection.start();
            }
        },

        //specify a non default root
        rootPath: 'http://localhost:32069/signalr/',

        stateChanged: function (state) {            
        switch (state.newState) {
            case $.signalR.connectionState.connecting:                
                break;
            case $.signalR.connectionState.connected:
                console.log(hub.connection);
                break;
            case $.signalR.connectionState.reconnecting:
                //your code here
                break;
            case $.signalR.connectionState.disconnected:
                //your code here
                break;
        }
        }

        });

    notificaciones.all = [];
    var _agregarNotificacion = function (prmNotificacion) {       
        notificaciones.all.push(prmNotificacion);
    }

    var _enviarNotificacion = function (prmNotificacion) {
        hub.enviarNotificacionPostulacion(prmNotificacion);
    }

    notificacionesSvc.enviarNotificacion = _enviarNotificacion;
    notificacionesSvc.agregarNotificacion = _agregarNotificacion;
    notificacionesSvc.obtenerNotificaciones = notificaciones;

    return notificacionesSvc;
    //#endregion



});