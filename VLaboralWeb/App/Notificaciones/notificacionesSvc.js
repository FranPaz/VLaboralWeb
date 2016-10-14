vLaboralApp.factory('notificacionesSvc', function ($http, $rootScope, $location, Hub, $timeout, authSvc, configSvc, localStorageService, notificacionesDF) {
    //#region viejo
    var urlHub = configSvc.urlApi; // fpaz: toma el url del api de configSvc
    var notificacionesSvc = {};
    var notificaciones = this;
    //var authData = localStorageService.get('authorizationData');
    

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
        methods: ['enviarNotificacionPostulacion', 'enviarNotificacionExperiencia'],

        //query params sent on initial connection
        queryParams: {
            "userId": authSvc.authentication.idUsuarioLogueado
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
        rootPath: urlHub+ 'signalr/',

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

    var _agregarHistorialNotificaciones = function () {//fpaz: agrega el historial de notificaciones luego de hacer el login

        notificacionesDF.getNotificacionesRecibidas(1,5).then(function (response) {
            console.log(response.Results);            
            notificaciones.all = response.Results;
        },
                function (err) {
                    if (err) {
                        $scope.error = err;
                        console.log("Error al Guardar los Cambios en el Perfil: " + $scope.error.Message);
                    }
                });
        
    }

    var _enviarNotificacion = function (prmNotificacion) {
        hub.enviarNotificacionPostulacion(prmNotificacion);
    }

    var _enviarNotificacionExperiencia = function (prmNotificacion) {//fpaz: llama al hub que manda las notificaciones de Nuevas Experiencias cargadas por un Profesional
        hub.enviarNotificacionExperiencia(prmNotificacion);
    }

    notificacionesSvc.enviarNotificacion = _enviarNotificacion;
    notificacionesSvc.enviarNotificacionExperiencia = _enviarNotificacionExperiencia;
    notificacionesSvc.agregarNotificacion = _agregarNotificacion;
    notificacionesSvc.agregarHistorialNotificaciones = _agregarHistorialNotificaciones;
    notificacionesSvc.obtenerNotificaciones = notificaciones;

    return notificacionesSvc;
    //#endregion



});