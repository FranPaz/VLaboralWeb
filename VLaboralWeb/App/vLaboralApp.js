var vLaboralApp = angular.module('vLaboralApp', ['ngResource', 'ngMdIcons', 'ui.router', 'ngCookies', 'ngTable',
  'ngSanitize', 'ngAnimate', 'ngAria', 'ct.ui.router.extras', 'angular-loading-bar', 'LocalStorageModule', 'angular-jwt', 'ngMaterial',
  'oc.lazyLoad', 'ng-mfb', 'ngAutocomplete', 'angular-input-stars', 'ngFileUpload', 'ngMessages', 'vAccordion', 'angularUtils.directives.dirPagination'])
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $stickyStateProvider, cfpLoadingBarProvider) {

        cfpLoadingBarProvider.includeSpinner = true;
        cfpLoadingBarProvider.includeBar = true;


        $urlRouterProvider.otherwise("/home");

        $stateProvider //fpaz: defino los states que van a guiar el ruteo de las vistas parciales de la app       

            //#region Home 
            .state('home', {
                url: "/home",
                views: {
                    '': {
                        templateUrl: '/App/Home/Partials/home.html'
                    },
                    'infoHome': {
                        templateUrl: '/App/Home/Partials/homeInfo.html',
                        controller: ''
                    },
                    'ofertasHome': {
                        templateUrl: '/App/Ofertas/Partials/ofertasList.html',
                        controller: ''
                    }
                }
            })
                .state('registroProfesional', {
                    url: "/registro/profesional",
                    templateUrl: '/App/Seguridad/Partials/registroProfesional.html',
                    controller: 'signupCtrl',
                    resolve: {
                        loadOfertasCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(['App/Seguridad/signupCtrl.js']);
                        }]
                    }
                })
                .state('registroEmpresa', {
                    url: "/registro/empresa",
                    templateUrl: '/App/Seguridad/Partials/registroEmpresa.html',
                    controller: 'signupCtrl',
                    resolve: {                       
                        loadOfertasCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(['App/Seguridad/signupCtrl.js']);
                        }]
                    }
                })
                .state('login', {
                    url: "/login",
                    templateUrl: '/App/Seguridad/Partials/login.html',
                    controller: 'loginCtrl',
                    resolve: {
                        loadOfertasCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(['App/Seguridad/loginCtrl.js']);
                        }]
                    }
                })
                .state('solicitud', {
                    url: "/solicitud",
                    templateUrl: '/App/Seguridad/Partials/confirmCuenta.html'
                })

        //#endregion

        //#region Empresa
        .state('empresa', {
            abstract: true,
            url: '/empresa',
            views: {
                '': {
                    templateUrl: '/App/DashboardEmpresa/Partials/empresaDashboard.html'
                },
                'menu': {
                    templateUrl: '/App/DashboardEmpresa/Partials/empresaMenu.html',
                    controller: 'dashboardEmpresaCtrl',
                    resolve: {
                        loadDashboardCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(['App/DashboardEmpresa/dashboardEmpresaCtrl.js']);
                        }]
                    }
                },
                'contenido': {
                    templateUrl: '/App/DashboardEmpresa/Partials/empresaContenido.html'
                }
            }
        })
            .state('empresa.ofertas', {
                url: '/ofertas',
                templateUrl: '/App/Ofertas/Partials/ofertasList.html',
                controller: 'empresasCtrl',
                resolve: {
                    ofertasDF: 'ofertasDF',
                    listadoOfertas: function (ofertasDF) {
                        return ofertasDF.getOfertas(1, 5);
                    },
                    loadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['App/Empresas/empresasCtrl.js']);
                    }]
                }
            })
                .state('empresa.nuevaOferta', {
                    url: '/nueva',
                    templateUrl: '/App/Ofertas/Partials/ofertasAdd.html',
                    controller: 'ofertasCtrl',
                    resolve: {
                        tiposDisponibilidadDF: 'tiposDisponibilidadDF',
                        listadoTiposDiponibilidad: function (tiposDisponibilidadDF) {
                            return tiposDisponibilidadDF.getTiposDisp();
                        },
                        tiposContratoDF: 'tiposContratoDF',
                        listadoTiposContratos: function (tiposContratoDF) {
                            return tiposContratoDF.getTiposContratos();
                        },
                        requisitosDF: 'requisitosDF',
                        listadoTiposRequisitos: function (requisitosDF) {
                            return requisitosDF.getTiposRequisito();
                        },
                        habilidadesDF:'habilidadesDF',
                        listadoHabilidades: function (habilidadesDF) {
                            return habilidadesDF.getHabilidades();
                        },
                        rubrosDF: 'rubrosDF',
                        listadoRubros: function (rubrosDF) {
                            return rubrosDF.getRubros();
                        },
                        loadOfertasCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(['App/Ofertas/ofertasCtrl.js']);
                        }]
                    }

                })
        //#endregion

        //#region Profesional
        .state('profesional', {
            abstract: true,
            url: '/profesional',
            views: {
                '': {
                    templateUrl: '/App/DashboardProfesional/Partials/profesionalDashboard.html'
                },
                'menu': {
                    templateUrl: '/App/DashboardProfesional/Partials/profesionalMenu.html',
                    controller: 'dashboardProfesionalCtrl',
                    resolve: {
                        loadDashboardCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(['App/DashboardProfesional/dashboardProfesionalCtrl.js']);
                        }]
                    }
                },
                'contenido': {
                    templateUrl: '/App/DashboardProfesional/Partials/profesionalContenido.html'                    
                }
            }
        })
            .state('profesional.perfil', {
                url: '/perfil/:idPro',  
                templateUrl: '/App/Profesionales/Partials/profesionalPerfil.html',
                controller: 'profesionalesCtrl',
                resolve: {
                    listadoOfertas: function () {
                        return { value: [] };
                    },
                    rubrosDF: 'rubrosDF',
                    habilidadesDF: 'habilidadesDF',
                    tiposIdentificacionDF : 'tiposIdentificacionDF', 
                    listadoRubros: function (rubrosDF) {
                        return rubrosDF.getRubros();
                    },
                    listadoHabilidades: function (habilidadesDF) {
                        return habilidadesDF.getHabilidades();
                    },
                    listadoIdentificacionPro: function (tiposIdentificacionDF) {
                        return tiposIdentificacionDF.getIdentificacionesProfesional();
                    },
                    profesionalesDF: 'profesionalesDF',
                    infoProfesional: function (profesionalesDF,$stateParams) {
                        var idPro = $stateParams.idPro;
                        return profesionalesDF.getProfesional(idPro);
                    },
                    listadoOfertas: function () {
                        return { value: [] };
                    },
                    loadProfesionalesCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['App/Profesionales/profesionalesCtrl.js']);
                    }]
                }
            })
            .state('profesional.ofertas', {
                url: '/ofertas/:idPro',
                templateUrl: '/App/Ofertas/Partials/ofertasList.html',
                controller: 'profesionalesCtrl',
                resolve: {
                    ofertasDF: 'ofertasDF',
                    listadoOfertas: function (ofertasDF) {
                        return ofertasDF.getOfertasProfesional();
                    },
                    rubrosDF: 'rubrosDF',
                    habilidadesDF: 'habilidadesDF',
                    tiposIdentificacionDF: 'tiposIdentificacionDF',
                    listadoRubros: function (rubrosDF) {
                        return rubrosDF.getRubros();
                    },
                    listadoHabilidades: function (habilidadesDF) {
                        return habilidadesDF.getHabilidades();
                    },
                    listadoIdentificacionPro: function (tiposIdentificacionDF) {
                        return tiposIdentificacionDF.getIdentificacionesProfesional();
                    },
                    profesionalesDF: 'profesionalesDF',
                    infoProfesional: function (profesionalesDF, $stateParams) {
                        var idPro = $stateParams.idPro;
                        return profesionalesDF.getProfesional(idPro);
                    },
                    loadProfesionalesCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['App/Profesionales/profesionalesCtrl.js']);
                    }]
                }
            })
        //#endregion

        //#region kikexp: ofertas

        .state('oferta', {
            abstract: true,
            url: '/oferta',
            views: {
                '': {
                    templateUrl: ''
                },
                'menu': {
                    templateUrl: '',
                    controller: 'ofertaCtrl',
                    resolve: {
                        loadDashboardCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(['App/Oferta/ofertaCtrl.js']);
                        }]
                    }
                },
                'contenido': {
                    templateUrl: ''
                }
            }
        })
            .state('oferta.detalle', {
                url: 'Oferta/:idOferta',
                templateUrl: 'ofertaDetalle.html',
                controller: 'ofertaCtrl',
                resolve: {
                    ofertasDF: 'ofertasDF',
                    listadoOfertas: function () {
                        return {value:[]};
                    },
                    rubrosDF: 'rubrosDF',
                    habilidadesDF: 'habilidadesDF',
                    tiposIdentificacionDF: 'tiposIdentificacionDF',
                    listadoRubros: function () {
                        return { value: [] };
                    },
                    listadoHabilidades: function () {
                        return { value: [] };
                    },
                    listadoIdentificacionPro: function () {
                        return { value: [] };
                    },
                    profesionalesDF: 'profesionalesDF',
                    infoProfesional: function () {                        
                        return { value: [] };
                    },
                    ofertaDetalle: function (ofertasDF) {
                        var prmId = $stateParams.idOferta;
                        return ofertasDF.getOferta(prmId);
                    },
                    loadOfertasCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['App/Ofertas/ofertasCtrl.js']);
                    }]

                }
            })
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
