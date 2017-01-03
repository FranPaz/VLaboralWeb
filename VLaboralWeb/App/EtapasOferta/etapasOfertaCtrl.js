vLaboralApp.controller('etapasOfertaCtrl', function ($scope,$window,  $mdDialog, $mdMedia, $filter, $stateParams, $state //fpaz: definicion de inyectores de dependencias
    , listadoTiposEtapas, etapasCargadas, puesto, etapaDetalle, postulantesDF, ofertasDF //fpaz: definicion de parametros de entrada 
    ) {

    //#region fpaz: Inicializacion de variables de scope
    $scope.etapasCargadas = etapasCargadas;
    $scope.etapaOferta = {};
    $scope.tiposEtapas = listadoTiposEtapas;
    $scope.etapaDetalle = etapaDetalle;
    $scope.NombreOferta = $stateParams.NombreOferta;
    $scope.Puesto = puesto;
    $scope.query = {
        order: 'Valoracion',
        limit: 10,
        page: 1
    };
    $scope.selectPostulantes = [];
    //#endregion

    //#region reordenamiento de etapas al agregar una nueva etapa

    $scope.setearEtapaSiguiente = function () {
        
        for (var i in $scope.etapasCargadas) {

            if ($scope.etapasCargadas[i].Orden == $scope.etapaAnterior.Orden + 1) {
                $scope.etapaSiguiente = angular.copy($scope.etapasCargadas[i]);
                break;
            }
        }

    }
    //#endregion

    //#region fpaz: carga de etapas desde el modal
    $scope.addEtapa = function (prmEtapa) {

        for (var i = 0; i < $scope.etapasCargadas.length; i++) {
            if ($scope.etapasCargadas[i].Orden == $scope.etapaSiguiente.Orden) {
                prmEtapa.Orden = $scope.etapaSiguiente.Orden;                
                for (var j = i; j < $scope.etapasCargadas.length; j++) {
                    $scope.etapasCargadas[j].Orden++;
                }
                break;
            }
        }

        $scope.etapasCargadas.push(prmEtapa);

        var etapas = $filter('orderBy')($scope.etapasCargadas, 'Orden'); //array de etapas cargadas incluyendo la nueva que se devuelven ordenadas a la oferta
        
        $mdDialog.hide(etapas);
    }

    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    //#endregion
    
    //#region objeto con el array con los profesionales que pasan a la siguiente etapa de manera parcial
    //$scope.guardarPostulantes = function (selectPostulantes) {

    //    if (selectPostulantes == []) {
    //        alert("Debe seleccionar postulantes");
    //    }
    //    else {
    //        postulantesDF.putPostulacion(selectPostulantes, $scope.etapaDetalle.PuestosEtapaOferta[0].Postulaciones[0].PuestoEtapaOfertaId);
    //        alert("Cambios guardados");
    //        $state.go('empresa.ofertas.detalleOferta', { idOferta: $scope.etapaDetalle.OfertaId });
    //        //$state.go('empresa.ofertas.etapaDetalle', { idEtapa: $scope.etapaDetalle.Id });
               
            
    //    }
        

    //}

    $scope.guardarPostulacion = guardarPostulacion;

    function guardarPostulacion(postulacion) {
        postulantesDF.putPostulacion(postulacion)
            .then(function (response) {
                postulacion = response.data;

                //sluna: TODO: si alguien se anima a optimizar esto le agradeceria.
                angular.forEach($scope.etapaDetalle.PuestosEtapaOferta, function (peo) {
                    angular.forEach(peo.Postulaciones, function (p) {
                        if (p.Id === postulacion.Id) {
                            p.Comentario = postulacion.Comentario;
                            p.PasaEtapa = postulacion.PasaEtapa;
                            p.Valoracion = postulacion.Valoracion;
                            return;
                        }
                    });
                });
            }, function (response) {
                alert(response.Message);
            });
    }

    $scope.guardarPostulantes = function () {

        var postulaciones = $scope.Puesto.Postulaciones;
        for (var i = 0; i < postulaciones.length ; i++) {
            var postulacion = postulaciones[i];
            postulantesDF.putPostulacion(postulacion);
        }
        alert("Cambios guardados");
        $state.go('empresa.ofertas.detalleOferta', { idOferta: $scope.etapaDetalle.OfertaId });
        //$state.go('empresa.ofertas.etapaDetalle', { idEtapa: $scope.etapaDetalle.Id });
    }

    //#endregion

    //#region funcion que pasa la oferta a la siguiente etapa
    $scope.pasarSiguienteEtapa = function () {
        alert("Desea pasar a la siguiente etapa?");
        ofertasDF.postOfertaPasarSiguienteEtapa($scope.etapaDetalle.OfertaId);
        $state.go('empresa.ofertas.detalleOferta', { idOferta: $scope.etapaDetalle.OfertaId });
    }
    //#endRegion

    //#region kikepx: modal con el detalle del perfil del postulante
    $scope.postulanteDetalle= function (profesionalId) {
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
        .then(function (nuevasEtapas) {
            $scope.oferta.EtapasOferta = nuevasEtapas;
        });
    }
    //#endregion


    $scope.postulanteSeleccionado = {};

    //#region sluna: modal para modificar la postulacion, marcar si aprueba, etc.
    $scope.postulanteModificar = function (postulante) {
        $scope.postulanteSeleccionado = postulante; //lo guardo para poder utilizarlo cuando vuelva.

        $mdDialog.show({
            templateUrl: 'App/EtapasOferta/Partials/postulacionDetalleDialog.html',
            parent: angular.element(document.body),
            //targetEvent: ev,
            clickOutsideToClose: true,
            controller: postulanteModificarDialogController,
            locals: {
                postulacionShow: angular.copy(postulante) //sluna: copio para no hacer referencia a la misma instancia.
    }
        })
        .then(function (postulacion) {
            if (postulacion != null) {
                guardarPostulacion(postulacion);
            }
        });
    }

    function postulanteModificarDialogController($scope, $mdDialog, postulacionShow) {
        $scope.postulacionShow = postulacionShow;

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.guardar = function (postulacion) {
            $mdDialog.hide(postulacion);
        };
    }
    //#endregion
});








