var vLaboralApp = angular.module('vLaboralApp', ['ngResource', 'ngMdIcons', 'ui.router', 'ngCookies', 'ngTable',
  'ngSanitize', 'ngAnimate', 'ngAria', 'ct.ui.router.extras', 'angular-loading-bar', 'LocalStorageModule', 'angular-jwt', 'ngMaterial', 
  'oc.lazyLoad', 'ng-mfb', 'ngAutocomplete', 'angular-input-stars', 'ngFileUpload'])
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $stickyStateProvider, cfpLoadingBarProvider) {

        cfpLoadingBarProvider.includeSpinner = true;
        cfpLoadingBarProvider.includeBar = true;


        $urlRouterProvider.otherwise("/home");

        $stateProvider //fpaz: defino los states que van a guiar el ruteo de las vistas parciales de la app       

            //#region Home            
            .state('home', {
                url: '/home',
                templateUrl: '/App/Home/Partials/home.html',
                controller: ''
            })
            //.state('home', {
            //    url: "/Home",
            //    views: {
            //        'menuHome': {
            //            templateUrl: '/Scripts/App/Partials/Header.html',
            //            controller: ''
            //        },
            //        'infoHome': {
            //            templateUrl: '/Scripts/App/Partials/Menu.html',
            //            controller: ''
            //        },
            //        'ofertasHome': {
            //            templateUrl: '/Scripts/App/Partials/Dashboard.html',
            //            controller: ''                        
            //        }
            //    }
            //})

            //#endregion

            //#region Seguridad
            .state('seguridad', {
                abstract: true,
                url: '/seguridad',
                views: {
                    '': {
                        templateUrl: ''
                    },
                    'aside': {
                        templateUrl: ''
                    },
                    'content': {
                        templateUrl: ''
                    }
                }
            })
            .state('seguridad.login', {
                url: '/login',
                templateUrl: '/App/Seguridad/Partials/login.html',
                controller: 'loginCtrl',                
                resolve: {
                    loadLoginCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['App/Seguridad/loginCtrl.js','App/Seguridad/styleLoginCss.css']);
                    }]
                }
            })
        .state('seguridad.signup', {
            url: '/signup',
            templateUrl: '/App/Seguridad/Partials/signup.html',
            controller: 'signupCtrl',
            resolve: {
                loadLoginCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['App/Seguridad/signupCtrl.js', 'App/Seguridad/styleLoginCss.css']);
                }]
            }
        })
            .state('seguridad.confirm', {
                url: '/confirm',
                templateUrl: '/App/Seguridad/Partials/confirmCuenta.html',
                controller: 'loginCtrl',
                resolve: {
                    loadLoginCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['App/Seguridad/loginCtrl.js']);
                    }]
                }
            })
        //#endregion          

            //#region Empleador
            .state('empleador', {
                abstract: true,
                url: '/empleador',
                views: {
                    '': {
                        templateUrl: 'views/layout.html'
                    },
                    'aside': {
                        templateUrl: 'views/aside.html'
                    },
                    'content': {
                        templateUrl: 'views/content.html'
                    }
                }
            })
            .state('empleador.info', {
                url: '/info',
                templateUrl: '/App/Empleador/Partials/empleadorInfo.html',
                controller: 'empleadorCtrl',
                data: { title: 'Info Empleador' },
                resolve: {
                    empleadorDataFactory: 'empleadorDataFactory',
                    infoEmpleador: function (empleadorDataFactory, authSvc) {                      
                        //return authSvc.authentication.empleadorId;
                        return empleadorDataFactory.getEmpleador(1);
                    },
                    listadoEmpleadores: function (empleadorDataFactory) {
                        return { value: [] };
                    },
                    loadEmpleadorCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['App/Empleador/empleadorCtrl.js', 'App/Empleador/empleadorDataFactory.js']);
                    }]                  
                }
            })
            //.state('empleador.add', {
            //    url: '/add',
            //    templateUrl: '/App/Empleador/Partials/empleadorAdd.html',
            //    controller: 'empleadorCtrl',
            //    data: { title: 'Alta de Empleador' },
            //    resolve: {
            //        empleadorDataFactory: 'empleadorDataFactory',
            //        infoEmpleador: function (empleadorDataFactory) {
            //            return { value: [] };
            //        },
            //        listadoEmpleadores: function (empleadorDataFactory) {
            //            return empleadorDataFactory.query();
            //        },
            //        loadEmpleadorCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            //            return $ocLazyLoad.load(['App/Empleador/empleadorCtrl.js', 'App/Empleador/empleadorDataFactory.js']);
            //        }]                         
            //    }
            //})        
            //#endregion
      
    })


    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorSvc');//agrego al array de interceptor el sevicio authInterceptorSvc que se encarga de mandar ,en cada peticion al web api, el token de acceso obtenido en el login y de redirigir a la pagina de logueo , en caso de que un usuario anonimo quiera agseder a un recurso privado
    })
    .config(
    ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ($controllerProvider, $compileProvider, $filterProvider, $provide) {

        // lazy controller, directive and service
        vLaboralApp.controller = $controllerProvider.register;
        vLaboralApp.directive = $compileProvider.directive;
        vLaboralApp.filter = $filterProvider.register;
        vLaboralApp.factory = $provide.factory;
        vLaboralApp.service = $provide.service;
        vLaboralApp.constant = $provide.constant;
        vLaboralApp.value = $provide.value;
    }
    ])
    .run(['authSvc', function (authSvc) { //cada ves que el usuario entra a la aplicacion ejecuto la funcion para obtener el token guardado en el storage que este vigente, en caso de que exita uno almacenado
        authSvc.fillAuthData();
    }]);
