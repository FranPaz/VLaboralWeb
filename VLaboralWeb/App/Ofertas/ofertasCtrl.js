vLaboralApp.controller('ofertasCtrl', function ($scope, $mdMedia, $mdDialog,$ocLazyLoad, //fpaz: definicion de inyectores de dependencias
    ofertasDF, rubrosDF, requisitosDF, habilidadesDF,authSvc, tiposEtapasDF, //fpaz: definicion de data factorys
     listadoTiposDiponibilidad, listadoTiposContratos,//fpaz: definicion de parametros de entrada 
    listadoRubros, listadoTiposRequisitos, listadoHabilidades,ofertaDetalle, etapasObligatorias//    
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

    $scope.oferta.EtapasOferta = etapasObligatorias;
    $scope.ofertaDetalle = ofertaDetalle;

    $scope.usuarioLogueado = authSvc.authentication;//fpaz: obtiene la informacion del usuario logueado
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
                loadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['App/Puestos/puestosCtrl.js']);
                }]
            }
        })
        .then(function (nuevoPuesto) {
            $scope.oferta.Puestos.push(nuevoPuesto);
        });
    }
    //#endregion
        
    //#region funcion para dar de alta la oferta en la bd
    $scope.ofertaSave = function (prmOferta) {        
        prmOferta.EmpresaId = authSvc.authentication.empresaId; //id de la empresa logueada
        for (var i in prmOferta.Puestos) { //para cada puesto armo el objeto tal cual lo voy a enviar al post de ofertas
            delete prmOferta.Puestos[i].Habilidades;
            //dejo solamente el Id del tipo de contrato seleccionado
            prmOferta.Puestos[i].TipoContratoId = prmOferta.Puestos[i].TipoContrato.Id;
            delete prmOferta.Puestos[i].TipoContrato;

            //dejo solamente el Id del tipo de disponibilidad seleccionada
            prmOferta.Puestos[i].TipoDisponibilidadId = prmOferta.Puestos[i].Disponibilidad.Id;
            delete prmOferta.Puestos[i].Disponibilidad;

            //para cada subrubro asociado al puesto solo dejo el Id del subrubro
//            debugger;
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

        ofertasDF.postOferta(prmOferta).then(function (response) {
            alert("Oferta Guardada");
        },
    function (err) {
        if (err) {
            $scope.error = err;
            alert("Error al Guardar la Oferta: " + $scope.error.Message);
        }
    });
    };
    //#endregion
    //#endregion

    //#region fpaz: carga de Etapas de Oferta

    //#region fpaz: llamado al modal de carga de puestos
    //funcion que abre el modal para la carga de puestos en la oferta
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
                etapasCargadas : function () {
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
});








