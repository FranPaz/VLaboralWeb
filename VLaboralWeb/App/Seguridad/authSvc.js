vLaboralApp.service('authSvc', function ($http, $q, cuentaDataFactory, tokenDataFactory, localStorageService, jwtHelper, configSvc) {

    var urlApi = configSvc.urlApi; // fpaz: toma el url del api de configSvc
    var authServiceFactory = {};

    
    var _authentication = { //clase para manejar si el usuario esta autenticado o no
        isAuth: false,
        idUsuarioLogueado:"",
        userName: "",
        roles: [],
        isEmpresa: false,
        isProfesional: false,
        isVisitante: false,
        empresaId: "",
        profesionalId: ""
    };

    //#region registracion de usuario Empresa
    var _saveRegistrationEmpresa = function (registration) {         
        _logOut();
        var deferred = $q.defer();
        $http.post(urlApi + 'api/accounts/createEmpresa', registration).then(
            function (response) {
                //  Registro OK
                deferred.resolve(response);
            },
            function (response) {
                //  Registro ERROR
                deferred.reject(response);
            });
        return deferred.promise
    };
    //#endregion

    //#region registracion de usuario Profesional
    var _saveRegistrationProfesional = function (registration) {        
        _logOut();
        var deferred = $q.defer();
        $http.post(urlApi + 'api/accounts/createProfesional', registration).then(
            function (response) {
                //  Registro OK
                deferred.resolve(response);
            },
            function (response) {
                //  Registro ERROR
                deferred.reject(response);
            });
        return deferred.promise
    };
    //#endregion

    //#region Login y Logout de usuario
    var _login = function (loginData) { // funcion para hacer el login de usuario y generar el token

        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password; // defino los datos que voy a pasar como parametros
        
        var deferred = $q.defer();        

        $http.post(urlApi  + 'oauth/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                        
            var tokenPayload = jwtHelper.decodeToken(response.access_token); //fpaz: decodifico el token para obener los roles y los claims que se hayan definido            

            localStorageService.set('authorizationData', { token: response.access_token, idUsuarioLogueado: tokenPayload.nameid, userName: loginData.userName, roles: tokenPayload.role, tipoUser: tokenPayload.app_usertype, empresaId: tokenPayload.empresaId, profesionalId: tokenPayload.profesionalId });

            //fpaz: seteo en el servicio las credenciales del usuario logueado, para que pueda acceder a esta info desde cualquier parte de la app usando la funcion authSvc.authentication
            // que devuelve todo el objeto con la info del usuario logueado
            _authentication.isAuth = true;
            _authentication.idUsuarioLogueado = tokenPayload.nameid;
            _authentication.userName = loginData.userName;
            _authentication.tipoUser = tokenPayload.app_usertype;
            _authentication.roles = tokenPayload.role;                        
            _authentication.empresaId = tokenPayload.empresaId;
            _authentication.profesionalId = tokenPayload.profesionalId;

            switch (tokenPayload.app_usertype) {
                case "profesional":
                    _authentication.isProfesional = true;
                    break;
                case "empresa":
                    _authentication.isEmpresa = true;
                    break;
                default:
                    _authentication.isVisitante = true;

            }

            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;
        
    };

    var _logOut = function () {// funcion para hacer el logout

        localStorageService.remove('authorizationData'); //para hacer el logout solamente remuevo del storage del cliente el token obtenido

        _authentication.isAuth = false;
        _authentication.idUsuarioLogueado = "";
        _authentication.userName = "";
        _authentication.tipoUser = "";
        _authentication.roles = [];        
        _authentication.empresaId = "";
        _authentication.profesionalId = "";
        _authentication.isEmpresa = false,
        _authentication.isProfesional = false,
        _authentication.isVisitante = false
    };

    //#endregion

    var _fillAuthData = function () { 

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            _authentication.isAuth = true;
            _authentication.idUsuarioLogueado = authData.idUsuarioLogueado;
            _authentication.userName = authData.userName;
            _authentication.roles = authData.roles;
            _authentication.tipoUser = authData.tipoUser;
            _authentication.empresaId = authData.empresaId;
            _authentication.profesionalId = authData.profesionalId;

            switch (authData.tipoUser) {
                case "profesional":
                    _authentication.isProfesional = true;
                    break;
                case "empresa":
                    _authentication.isEmpresa = true;
                    break;
                default:
                    _authentication.isVisitante = true;

            }

            
        }

    }

    authServiceFactory.saveRegistrationEmpresa = _saveRegistrationEmpresa;
    authServiceFactory.saveRegistrationProfesional = _saveRegistrationProfesional;
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;

    return authServiceFactory;
});