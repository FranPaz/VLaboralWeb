var vLaboralApp = angular.module('vLaboralApp', ['ngResource', 'ngMdIcons', 'ui.router', 'ngCookies', 'ngTable',
  'ngSanitize', 'ngAnimate', 'ngAria', 'ct.ui.router.extras', 'angular-loading-bar', 'LocalStorageModule', 'angular-jwt', 'ngMaterial',
  'oc.lazyLoad', 'ng-mfb', 'ngAutocomplete', 'angular-input-stars', 'ngFileUpload', 'ngMessages', 'vAccordion'
  , 'angularUtils.directives.dirPagination', 'md.data.table', 'angular-timeline', 'angular.filter', 'SignalR', 'angular-notification-icons', 'jkAngularRatingStars'])
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
                        controller: 'profesionalesCtrl',
                        resolve: {
                            ofertasDF: 'ofertasDF',
                            listadoOfertas: function (ofertasDF) {
                                //return ofertasDF.getOfertasProfesional();
                                return ofertasDF.getOfertas(1, 5);
                            },
                            listadoRubros: function () {
                                return { value: [] };
                            },
                            listadoHabilidades: function () {
                                return { value: [] };
                            },
                            listadoIdentificacionPro: function () {
                                return { value: [] };
                            },
                            infoProfesional: function () {
                                return { value: [] };
                            },
                            loadProfesionalesCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['App/Profesionales/profesionalesCtrl.js']);
                            }]
                        }
                    }
                }
            })
                .state('registroProfesional', {
                    url: "/registro/profesional",
                    templateUrl: '/App/Seguridad/Partials/registroProfesional.html',
                    controller: 'signupCtrl',
                    resolve: {
                        loadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(['App/Seguridad/signupCtrl.js']);
                        }]
                    }
                })
                .state('registroEmpresa', {
                    url: "/registro/empresa",
                    templateUrl: '/App/Seguridad/Partials/registroEmpresa.html',
                    controller: 'signupCtrl',
                    resolve: {
                        loadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(['App/Seguridad/signupCtrl.js']);
                        }]
                    }
                })
                .state('login', {
                    url: "/login",
                    templateUrl: '/App/Seguridad/Partials/login.html',
                    controller: 'loginCtrl',
                    resolve: {
                        loadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
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
                    templateUrl: '/App/DashboardEmpresa/Partials/empresaDashboard.html',
                    controller: 'dashboardEmpresaCtrl',
                    resolve: {
                        loadDashboardCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(['App/DashboardEmpresa/dashboardEmpresaCtrl.js']);
                        }]
                    }
                },
                'menu': {
                    templateUrl: '/App/DashboardEmpresa/Partials/empresaMenu.html'
                },
                'contenido': {
                    templateUrl: '/App/DashboardEmpresa/Partials/empresaContenido.html'
                }
            }
        })

            //#region Perfil de la empresa
            .state('empresa.perfil', {
                url: '/perfil/:idEmpresa',
                views: {
                    'contenido@empresa': {
                        templateUrl: '/App/Empresas/Partials/empresaPerfilPublico.html',
                        controller: 'empresasCtrl',
                        resolve: {
                            empresasDF: 'empresasDF',
                            infoEmpresa: function (empresasDF, $stateParams) {
                                var idEmpresa = $stateParams.idEmpresa;
                                return empresasDF.getEmpresa(idEmpresa);
                            },
                            listadoOfertas: function () {
                                return { value: [] };
                            },
                            loadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['App/Empresas/empresasCtrl.js']);
                            }]
                        }
                    }
                }

            })
            //#endregion

            //#region Ofertas para Usuarios Empresa
            .state('empresa.ofertas', {
                url: '/ofertas',
                views: {
                    'contenido@empresa': {
                        templateUrl: '/App/Ofertas/Partials/ofertasList.html',
                        controller: 'empresasCtrl',
                        resolve: {
                            infoEmpresa: function () {
                                return { value: [] };
                            },
                            ofertasDF: 'ofertasDF',
                            listadoOfertas: function (ofertasDF) {
                                return ofertasDF.getOfertas(1, 5);
                            },
                            loadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['App/Empresas/empresasCtrl.js']);
                            }]
                        }
                    }
                }
            })
            .state('empresa.ofertas.detalleOferta', {
                url: '/detalleOferta/:idOferta',
                views: {
                    'contenido@empresa': {
                        templateUrl: '/App/Ofertas/Partials/ofertaDetalle.html',
                        controller: 'ofertasCtrl',
                        resolve: {
                            ofertasDF: 'ofertasDF',
                            listadoOfertas: function () {
                                return { value: [] };
                            },
                            tiposDisponibilidadDF: 'tiposDisponibilidadDF',
                            listadoTiposDiponibilidad: function () {
                                return { value: [] };
                            },
                            rubrosDF: 'rubrosDF',
                            habilidadesDF: 'habilidadesDF',
                            tiposIdentificacionDF: 'tiposIdentificacionDF',
                            listadoRubros: function () {
                                return { value: [] };
                            },
                            tiposContratoDF: 'tiposContratoDF',
                            listadoTiposContratos: function () {
                                return { value: [] };
                            },
                            listadoHabilidades: function () {
                                return { value: [] };
                            },
                            listadoIdentificacionPro: function () {
                                return { value: [] };
                            },
                            requisitosDF: 'requisitosDF',
                            listadoTiposRequisitos: function () {
                                return { value: [] };
                            },
                            profesionalesDF: 'profesionalesDF',
                            infoProfesional: function () {
                                return { value: [] };
                            },
                            ofertaDetalle: function (ofertasDF, $stateParams) {
                                var prmIdOferta = $stateParams.idOferta;
                                return ofertasDF.getOferta(prmIdOferta);
                            },
                            etapasObligatorias: function () {
                                return { value: [] };
                            },

                            loadOfertasCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['App/Ofertas/ofertasCtrl.js']);
                            }]

                        }
                    }
                }
            })
            .state('empresa.ofertas.nuevaOferta', {
                url: '/nueva',
                views: {
                    'contenido@empresa': {
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
                            habilidadesDF: 'habilidadesDF',
                            listadoHabilidades: function (habilidadesDF) {
                                return habilidadesDF.getHabilidades();
                            },
                            rubrosDF: 'rubrosDF',
                            listadoRubros: function (rubrosDF) {
                                return rubrosDF.getRubros();
                            },
                            etapasOfertaDF: 'etapasOfertaDF',
                            etapasObligatorias: function (etapasOfertaDF) {
                                return etapasOfertaDF.getEtapasObligatorias();
                            },
                            ofertaDetalle: function () {
                                return { value: [] };
                            },
                            loadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['App/Ofertas/ofertasCtrl.js']);
                            }]
                        }
                    }
                }
            })
            .state('empresa.ofertas.etapaDetalle', {
                url: '/detalleEtapa/:idEtapa',
                params: {
                    idEtapa: null,
                    NombreOferta: null
                },
                views: {
                    'contenido@empresa': {
                        templateUrl: '/App/EtapasOferta/Partials/etapaOferta.html',
                        controller: 'etapasOfertaCtrl',

                        resolve: {
                            //NombreOferta: function ($stateParams) {
                            //    return $stateParams.NombreOferta.toString();
                            //},
                            etapasOfertaDF: 'etapasOfertaDF',
                            listadoTiposEtapas: function () {
                                return { value: [] };
                            },
                            puesto: function () {
                                return { value: [] };
                            },
                            etapasCargadas: function(){
                                return { value: [] };
                            },
                            etapaDetalle: function (etapasOfertaDF, $stateParams) {
                                prmIdEtapa = $stateParams.idEtapa;
                                return etapasOfertaDF.getEtapaOferta(prmIdEtapa);
                            },
                            //ofertaDetalle: function (ofertasDF, $stateParams) {
                            //    var prmIdOferta = $stateParams.idOferta;
                            //    return ofertasDF.getOferta(prmIdOferta);
                            //}
                            loadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['App/EtapasOferta/etapasOfertaCtrl.js']);
                            }]
                        }
                    }
                }
            })

            .state('empresa.ofertas.etapaDetalle.listadoPostulantes', {
                url: 'listadoPostulantes/:idEtapa',
                params: {
                    idEtapa: null,
                    puesto: null,
                },
                views: {
                    'contenido@empresa': {
                        templateUrl: '/App/Postulantes/Partials/listadoPostulantes.html',
                        controller: 'etapasOfertaCtrl',

                        resolve: {
                            //NombreOferta: function ($stateParams) {
                            //    return $stateParams.NombreOferta.toString();
                            //},
                            etapasOfertaDF: 'etapasOfertaDF',
                            listadoTiposEtapas: function () {
                                return { value: [] };
                            },
                            etapasCargadas: function () {
                                return { value: [] };
                            },
                            puesto: function($stateParams){                                
                                return $stateParams.puesto;
                            },
                            etapaDetalle: function (etapasOfertaDF, $stateParams) {
                                prmIdEtapa = $stateParams.idEtapa;
                                return etapasOfertaDF.getEtapaOferta(prmIdEtapa);
                            },
                            //ofertaDetalle: function (ofertasDF, $stateParams) {
                            //    var prmIdOferta = $stateParams.idOferta;
                            //    return ofertasDF.getOferta(prmIdOferta);
                            //}
                            loadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['App/EtapasOferta/etapasOfertaCtrl.js']);
                            }]
                        }
                    }
                }
            })
            //#endregion

            //#region Profesionales para Usuarios Empresa
            .state('empresa.profesional', {
                url: '/profesional/:idPro',
                views: {
                    'contenido@empresa': {
                        templateUrl: '/App/Profesionales/Partials/profesionalPerfilPublico.html',
                        controller: 'profesionalesCtrl',
                        resolve: {
                            listadoOfertas: function () {
                                return { value: [] };
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
                            listadoOfertas: function () {
                                return { value: [] };
                            },
                            loadProfesionalesCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['App/Profesionales/profesionalesCtrl.js']);
                            }]
                        }
                    }
                }

            })
            //#endregion
            
             //#region Centro de notificaciones para Usuarios Empresa
            .state('empresa.centroNotificaciones', {
                url: '/centroNotificaciones',
                views: {
                    'contenido@empresa': {
                        templateUrl: '/App/Notificaciones/Partials/centroNotificaciones.html',
                        controller: 'notificacionesCtrl',
                        resolve: {
                            notificacionesDF: 'notificacionesDF',
                            listadoNotificaciones: function (notificacionesDF) {                                
                                return notificacionesDF.getNotificacionesRecibidas(1, 20);
                            },
                            loadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['App/Notificaciones/notificacionesCtrl.js']);
                            }]
                        }
                    }
                }

            })
                .state('empresa.centroNotificaciones.postulacion', {
                    url: '/postulacion',
                    params: {
                        prmIdNotificacion: null,
                        prmTipoNotificacion:null
                    },
                    views: {
                        'detalleNotificacion@empresa.centroNotificaciones': {
                            templateUrl: '/App/Notificaciones/Partials/detalleNotificacionPostulacion.html',
                            controller: 'postulantesCtrl',
                            resolve: {
                                notificacionesDF: 'notificacionesDF',
                                infoPostulacion: function (notificacionesDF, $stateParams) {                                    
                                    var idNotif = $stateParams.prmIdNotificacion;
                                    var tipoNotyif = $stateParams.prmTipoNotificacion
                                    return notificacionesDF.getDetalleNotificacion(idNotif,tipoNotyif);
                                },
                                listadoPostulantes: function () {
                                    return { value: [] };
                                },
                                infoPuesto: function () {
                                    return { value: [] };
                                },
                                loadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['App/Postulantes/postulantesCtrl.js']);
                                }]
                            }
                        }
                    }

                })
                .state('empresa.centroNotificaciones.experiencia', {
                    url: '/experiencia',
                    views: {
                        'detalleNotificacion@empresa.centroNotificaciones': {
                            templateUrl: '/App/Notificaciones/Partials/detalleNotificacionExperiencia.html',
                            controller: '',
                            resolve: {
                                //notificacionesDF: 'notificacionesDF',
                                //listadoNotificaciones: function (notificacionesDF) {
                                //    return notificacionesDF.getNotificacionesRecibidas(1, 20);
                                //},
                                //loadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                                //    return $ocLazyLoad.load(['App/Notificaciones/notificacionesCtrl.js']);
                                //}]
                            }
                        }
                    }

                })
            //#endregion

            //#region Verificacion de experiencia laboral de profesional con empresa
             .state('empresa.verificacionExperiencia', {
                 url: '/Verificacion/Experiencia',
                 params: {
                     idProfesional: null
                 },
                 views: {
                     'contenido@empresa': {
                         templateUrl: '/App/ExperienciasLaborales/Partials/VerificarExperienciasProfesional.html',
                         controller: 'experienciasLaboralesCtrl',
                         resolve: {
                             experienciasLaboralesDF: 'experienciasLaboralesDF',
                             listEmpresas: function () {
                                 return { value: [] };
                             },
                             listExperienciasPendientes: function (experienciasLaboralesDF, $stateParams) {
                                 return { value: [] }; // experienciasLaboralesDF.
                             },
                             loadExperienciasLaborales: ['$ocLazyLoad', function ($ocLazyLoad) {
                                 return $ocLazyLoad.load(['App/ExperienciasLaborales/experienciasLaboralesCtrl.js']);
                             }]
                         }
                     }
                 }

             })

            //#endregion

        //#endregion

        //#region Profesional
        .state('profesional', {
            abstract: true,
            url: '/profesional',
            views: {
                '': {
                    templateUrl: '/App/DashboardProfesional/Partials/profesionalDashboard.html',
                    controller: 'dashboardProfesionalCtrl',
                    resolve: {
                        loadDashboardCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(['App/DashboardProfesional/dashboardProfesionalCtrl.js']);
                        }]
                    }
                },
                'menu': {
                    templateUrl: ''
                },
                'contenido': {
                    templateUrl: '/App/DashboardProfesional/Partials/profesionalContenido.html'
                }
            }
        })

            //#region Perfil del Profesional
            .state('profesional.perfil', {
                url: '/perfil/:idPro',

                views: {
                    'contenido@profesional': {
                        templateUrl: '/App/Profesionales/Partials/profesionalPerfil.html',
                        controller: 'profesionalesCtrl',
                        resolve: {
                            listadoOfertas: function () {
                                return { value: [] };
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
                            listadoOfertas: function () {
                                return { value: [] };
                            },
                            loadProfesionalesCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['App/Profesionales/profesionalesCtrl.js']);
                            }]
                        }
                    }
                }

            })
            //#endregion

            //#region Ofertas Para Profesionales
            .state('profesional.ofertas', {
                url: '/ofertas',
                views: {
                    'contenido@profesional': {
                        templateUrl: '/App/Ofertas/Partials/ofertasList.html',
                        controller: 'profesionalesCtrl',
                        resolve: {
                            ofertasDF: 'ofertasDF',
                            listadoOfertas: function (ofertasDF) {
                                //return ofertasDF.getOfertasProfesional();
                                return ofertasDF.getOfertas(1, 5);
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
                            infoProfesional: function (profesionalesDF, authSvc) {
                                var idPro = authSvc.authentication.profesionalId;
                                return profesionalesDF.getProfesional(idPro);
                            },
                            loadProfesionalesCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['App/Profesionales/profesionalesCtrl.js']);
                            }]
                        }
                    }
                }
            })
                .state('profesional.ofertas.detalleOferta', {
                    url: '/detalleOferta/:idOferta',
                    views: {
                        'contenido@profesional': {
                            templateUrl: '/App/Ofertas/Partials/ofertaDetalle.html',
                            controller: 'ofertasCtrl',
                            resolve: {
                                ofertasDF: 'ofertasDF',
                                listadoOfertas: function () {
                                    return { value: [] };
                                },
                                tiposDisponibilidadDF: 'tiposDisponibilidadDF',
                                listadoTiposDiponibilidad: function () {
                                    return { value: [] };
                                },
                                rubrosDF: 'rubrosDF',
                                habilidadesDF: 'habilidadesDF',
                                tiposIdentificacionDF: 'tiposIdentificacionDF',
                                listadoRubros: function () {
                                    return { value: [] };
                                },
                                tiposContratoDF: 'tiposContratoDF',
                                listadoTiposContratos: function () {
                                    return { value: [] };
                                },
                                listadoHabilidades: function () {
                                    return { value: [] };
                                },
                                listadoIdentificacionPro: function () {
                                    return { value: [] };
                                },
                                requisitosDF: 'requisitosDF',
                                listadoTiposRequisitos: function () {
                                    return { value: [] };
                                },
                                profesionalesDF: 'profesionalesDF',
                                infoProfesional: function () {
                                    return { value: [] };
                                },
                                ofertaDetalle: function (ofertasDF, $stateParams) {
                                    var prmIdOferta = $stateParams.idOferta;
                                    return ofertasDF.getOferta(prmIdOferta);
                                },
                                etapasObligatorias: function () {
                                    return { value: [] };
                                },

                                loadOfertasCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['App/Ofertas/ofertasCtrl.js']);
                                }]

                            }
                        }
                    }
                })
        //#endregion

        //#region Perfil de la Empresa para profesionales
            .state('profesional.empresa', {
                url: '/empresa/:idEmpresa',
                views: {
                    'contenido@profesional': {
                        templateUrl: '/App/Empresas/Partials/empresaPerfilPublico.html',
                        controller: 'empresasCtrl',
                        resolve: {
                            empresasDF: 'empresasDF',
                            infoEmpresa: function (empresasDF, $stateParams) {
                                var idEmpresa = $stateParams.idEmpresa;
                                return empresasDF.getEmpresa(idEmpresa);
                            },
                            listadoOfertas: function () {
                                return { value: [] };
                            },
                            loadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['App/Empresas/empresasCtrl.js']);
                            }]
                        }
                    }
                }

            })
        //#endregion
        

        //#region Centro de notificaciones para Usuarios Empresa
            .state('profesional.centroNotificaciones', {
                url: '/centroNotificaciones',
                views: {
                    'contenido@profesional': {
                        templateUrl: '/App/Notificaciones/Partials/centroNotificaciones.html',
                        controller: 'notificacionesCtrl',
                        resolve: {
                            notificacionesDF: 'notificacionesDF',
                            listadoNotificaciones: function (notificacionesDF) {
                                return notificacionesDF.getNotificacionesRecibidas(1, 5);
                            },
                            loadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['App/Notificaciones/notificacionesCtrl.js']);
                            }]
                        }
                    }
                }

            })
        //#endregion
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
