vLaboralApp.controller('ofertasCtrl', function ($scope, $mdMedia, $mdDialog, $ocLazyLoad, $state, //fpaz: definicion de inyectores de dependencias
    profesionalesDF,ofertasDF, rubrosDF, requisitosDF, habilidadesDF, authSvc, tiposEtapasDF,notificacionesSvc, //fpaz: definicion de data factorys
     listadoTiposDiponibilidad, listadoTiposContratos,//fpaz: definicion de parametros de entrada 
    listadoRubros, listadoTiposRequisitos, listadoHabilidades, ofertaDetalle, etapasObligatorias
    ) {

    //#region fpaz: Inicializacion de variables de Scope
    $scope.tiposDisponibilidad = listadoTiposDiponibilidad;
    $scope.tiposContrato = listadoTiposContratos;
    $scope.tiposRequisito = listadoTiposRequisitos;
    $scope.habilidades = listadoHabilidades;

    $scope.Rubros = listadoRubros;
    $scope.rubroSelected = {};

    $scope.subRubros = {};
    $scope.subRubroSelected = {};

    $scope.subRubroDisabled = true;

    $scope.oferta = {};
    $scope.oferta.Puestos = [];
    $scope.oferta.Publica = 'true'; //fpaz seteo por defecto el radio button de tipo de oferta publica

    $scope.oferta.EtapasOferta = etapasObligatorias;
    $scope.ofertaDetalle = ofertaDetalle;

    $scope.usuarioLogueado = authSvc.authentication;//fpaz: obtiene la informacion del usuario logueado

   

    $scope.postulantes = [];

    $scope.pagination = {
        current: 1,
        limit: 5
    };
    
    $scope.eliminarPostulante = function (p) {
        var index = $scope.postulantes.indexOf(p);
        $scope.postulantes.splice(index, 1);
    }

    $scope.postulanteDetalle = function (profesionalId) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
        $mdDialog.show({
            controller: 'profesionalesCtrl',
            templateUrl: 'App/Postulantes/Partials/postulanteDetalle.html',
            parent: angular.element(document.body),
            //targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true,
            resolve: {
                listadoOfertas: function () {
                    return { value: [] };
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
                infoProfesional: function (profesionalesDF) {

                    return profesionalesDF.getProfesional(profesionalId);
                },
                listadoOfertas: function () {
                    return { value: [] };
                },
                selectedPro: function () {
                    return [];
                },
                profesionalesList: function () {
                    return { value: [] };
                },
                loadProfesionalesCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['App/Profesionales/profesionalesCtrl.js']);
                }]
            }
        })
        .then(function () {

        });
    }

    //#endregion

    //#region fpaz: carga de ofertas
    //#region fpaz: llamado al modal de carga de puestos
    //funcion que abre el modal para la carga de puestos en la oferta
    $scope.openPuestoAdd = function (ev) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
        $mdDialog.show({
            controller: 'puestosCtrl',
            templateUrl: 'App/Puestos/Partials/puestosAdd.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            //fullscreen: true,
            fullscreen: useFullScreen,
            resolve: {
                listadoTiposDiponibilidad: function () {
                    return $scope.tiposDisponibilidad;
                },
                listadoTiposContratos: function () {
                    return $scope.tiposContrato;
                },
                listadoRubros: function () {
                    return $scope.Rubros;
                },
                listadoTiposRequisitos: function () {
                    return $scope.tiposRequisito;
                },
                puesto: function () {
                    return { value: [] };
                },
                loadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['App/Puestos/puestosCtrl.js']);
                }]
            }
        })
        .then(function (nuevoPuesto) {
            $scope.oferta.Puestos.push(nuevoPuesto);
        });
    }

    $scope.openPuestoDetalle = function (prmPuesto) {
        prmPuesto.Habilidades = prmPuesto.Habilidades.split(',');
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
        $mdDialog.show({
            controller: 'puestosCtrl',
            templateUrl: 'App/Puestos/Partials/puestoDetalleOferta.html',
            parent: angular.element(document.body),
            //targetEvent: ev,
            clickOutsideToClose: true,
            //fullscreen: true,
            fullscreen: useFullScreen,
            resolve: {
                listadoTiposDiponibilidad: function () {
                    return $scope.tiposDisponibilidad;
                },
                listadoTiposContratos: function () {
                    return $scope.tiposContrato;
                },
                listadoRubros: function () {
                    return $scope.Rubros;
                },
                listadoTiposRequisitos: function () {
                    return $scope.tiposRequisito;
                },
                
                loadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['App/Puestos/puestosCtrl.js']);
                }]
            },
            puesto: prmPuesto,
        })
        .then(function (puestoEdit) {            
            $scope.oferta.Puestos[$scope.oferta.Puestos.indexOf(puestoEdit)] = puestoEdit;
            angular.forEach($scope.oferta.Puestos, function (p) {
                p.Habilidades = p.Habilidades.toString();
            })
        });
    }

    $scope.eliminarPuesto = function (prmPuesto) {
        r = confirm("Desea eliminar el puesto?");
        if (r == true) {
            var index = $scope.oferta.Puestos.indexOf(prmPuesto);
            $scope.oferta.Puestos.splice(index, 1);
        }
        
    }
    //#endregion

    //#region funcion para dar de alta la oferta en la bd
    $scope.ofertaSave = function (prmOferta) {

        if ($scope.oferta.Puestos.length > 0) {

            prmOferta.EmpresaId = authSvc.authentication.empresaId; //id de la empresa logueada
            for (var i in prmOferta.Puestos) { //para cada puesto armo el objeto tal cual lo voy a enviar al post de ofertas
                //delete prmOferta.Puestos[i].Habilidades;
                //dejo solamente el Id del tipo de contrato seleccionado
                prmOferta.Puestos[i].TipoContratoId = prmOferta.Puestos[i].TipoContrato.Id;
                delete prmOferta.Puestos[i].TipoContrato;

                //dejo solamente el Id del tipo de disponibilidad seleccionada
                prmOferta.Puestos[i].TipoDisponibilidadId = prmOferta.Puestos[i].Disponibilidad.Id;
                delete prmOferta.Puestos[i].Disponibilidad;

                //para cada subrubro asociado al puesto solo dejo el Id del subrubro                
                for (var x in prmOferta.Puestos[i].Subrubros) {
                    delete prmOferta.Puestos[i].Subrubros[x].Nombre;
                    delete prmOferta.Puestos[i].Subrubros[x].Descripcion;
                    delete prmOferta.Puestos[i].Subrubros[x].Profesionales;
                    delete prmOferta.Puestos[i].Subrubros[x].Puestos;
                }

                //para cada requisito asociado al puesto solo dejo el Id del tipo de requisito, el valor y si es exclueyente o no
                for (var j in prmOferta.Puestos[i].Requisitos) {
                    prmOferta.Puestos[i].Requisitos[j].TipoRequisitoId = prmOferta.Puestos[i].Requisitos[j].TipoRequisito.Id;
                    delete prmOferta.Puestos[i].Requisitos[j].TipoRequisito;
                }
            }

            for (var x in prmOferta.EtapasOferta) {
                //dejo solamente el Id del tipo de Etapa seleccionado
                prmOferta.EtapasOferta[x].TipoEtapaId = prmOferta.EtapasOferta[x].TipoEtapa.Id;
                delete prmOferta.EtapasOferta[x].TipoEtapa;
            }

            //debugger;
            if (prmOferta.Publica == 'true') {
                    
                ofertasDF.postOferta(prmOferta).then(function (response) {
                    alert("Oferta Publica Guardada");
                    $state.go('empresa.ofertas');
                },
                function (err) {
                    if (err) {
                        $scope.error = err;
                        alert("Error al Guardar la Oferta: " + $scope.error.Message);
                    }
                });
            }
            else {
                var ofertaPrivada = {};
                ofertaPrivada.oferta = prmOferta;
                ofertaPrivada.profesionales = $scope.postulantes;
                ofertasDF.postOfertaPrivada(ofertaPrivada).then(function (response) {
                    
                    console.log('termino ok post oferta privada');
                    notificacionesSvc.enviarNotificacionesInvitacionesOfertasPriv(response.data);
                    alert("Oferta Privada Guardada");
                    $state.go('empresa.ofertas');
                },
                function (err) {
                    if (err) {
                        $scope.error = err;
                        alert("Error al Guardar la Oferta: " + $scope.error.Message);
                    }
                });
            }
        } else {
            alert("Debe agregar al menos un puesto a la oferta")
        }


    };
    //#endregion
    //#endregion

    //#region fpaz: carga de Etapas de Oferta

    //fpaz: llamado al modal de carga de etapas    
    $scope.openEtapaOfertaAdd = function (ev) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
        $mdDialog.show({
            controller: 'etapasOfertaCtrl',
            templateUrl: 'App/EtapasOferta/Partials/etapaOfertaAdd.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            //fullscreen: true,
            fullscreen: useFullScreen,
            resolve: {
                listadoTiposEtapas: function (tiposEtapasDF) {
                    return tiposEtapasDF.getTiposEtapas();
                },
                puesto: function ($stateParams) {
                    return { value: [] };
                },
                etapasCargadas: function () {
                    return $scope.oferta.EtapasOferta;
                },
                etapaDetalle: function () {
                    return { value: [] };
                },
                loadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['App/EtapasOferta/etapasOfertaCtrl.js']);
                }]
            }
        })
        .then(function (nuevasEtapas) {
            $scope.oferta.EtapasOferta = nuevasEtapas;
        });
    }

    //#endregion

    //#region postulacion del profesional
    $scope.postularProfesional = function (prmPuesto) { //funcion que habre un modal con la info detallada del puesto al que quiere postularse el profesional
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
        $mdDialog.show({
            controller: 'postulantesCtrl',
            templateUrl: 'App/Puestos/Partials/puestoDetalle.html',
            parent: angular.element(document.body),
            //targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: useFullScreen,
            resolve: {
                listadoPostulantes: function () {
                    return { value: [] };
                },
                infoPuesto: function () {
                    return prmPuesto;
                },
                infoPostulacion: function () {
                    return prmPuesto;
                },
                loadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['App/Postulantes/postulantesCtrl.js']);
                }]
            }
        })
        .then(function () {
            $state.go("profesional.ofertas");
        });
    }
    //#endregion

    //#region iafar: funcion para llamar modal seleccion de profesionales
        
    $scope.profesionalesAdd = function (postulantes) {
        debugger;
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
        $mdDialog.show({
            controller: 'profesionalesCtrl',
            templateUrl: 'App/Profesionales/Partials/profesionalesDialogList.html',
            parent: angular.element(document.body),            
            clickOutsideToClose: true,
            fullscreen: useFullScreen,
            resolve: {                
                listadoOfertas: function () {
                    return { value: [] };
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
                selectedPro:function () {
                    return postulantes;
                },                  
                profesionalesDF: 'profesionalesDF',
                profesionalesList: function (profesionalesDF) {
                    return profesionalesDF.getProfesionales(1, 5);
                },
                loadProfesionalesCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['App/Profesionales/profesionalesCtrl.js']);
                }]
            }
        })
        .then(function (response) {
            $scope.postulantes = response;
        });
    }
    
    //#endregion
})