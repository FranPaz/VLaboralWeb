vLaboralApp.controller('profesionalesCtrl', function ($scope, $mdMedia, $mdDialog, $ocLazyLoad //fpaz: definicion de inyectores de dependencias
    , rubrosDF, habilidadesDF, tiposIdentificacionDF, profesionalesDF, ofertasDF, authSvc, empresasDF //fpaz: definicion de data factorys
    ,profesionalesList ,listadoRubros, listadoHabilidades, listadoIdentificacionPro, listadoOfertas, infoProfesional, selectedPro//fpaz: definicion de parametros de entrada    
    ) {

    //#region fpaz: Inicializacion de variables de Scope    
    $scope.habilidades= listadoHabilidades;
    $scope.identificacionesPro = listadoIdentificacionPro;
    $scope.profesional = infoProfesional; //iafar: ya vienen definidos todos los atributos desde la API
  
    $scope.chipsHabilidad = infoProfesional.Habilidades;

    //$scope.chipsRubros = infoProfesional.SubRubros;
    
    $scope.profesionalesList = profesionalesList;


    $scope.Rubros = listadoRubros;
    $scope.rubroSelected = {};

    $scope.subRubros = {};
    $scope.subRubroSelected = {};

    $scope.subRubroDisabled = true;
    $scope.ofertas = listadoOfertas;
    $scope.totalOfertas = listadoOfertas.TotalRows;
    
    $scope.ofertasPerPage = 10;
    $scope.pagination = {
        current: 1,
        limit: 5
    };


    $scope.selectItems = []; //iafar: array de elementos seleccionados para eliminacion
    $scope.query = {       
        limit: 3,
        page: 1
    }; //iafar: variables scope para paginacion de tabla de documentos

    $scope.editValue = false; // variable que voy a usar para activar y desactivar los modos de edicion para hacer el update de la info

    $scope.usuarioLogueado = authSvc.authentication;//fpaz: obtiene la informacion del usuario logueado

    $scope.profesional.FechaNac = new Date($scope.profesional.FechaNac);
    //#endregion

    //#region iafar: transformar habilidades de chips en strings
    $scope.transformChip = function (chip) {
        
        // iafar: Si es un objeto, es una habilidad desde la BD
        if (angular.isObject(chip)) {
            return chip.Nombre.toUpperCase();
        }
        // iafar: Sino, no existe en BD
        return chip.toUpperCase();
    }
    //#endregion

    //#region SLuna: Traer Listado de Ofertas
    $scope.pageChanged = function (newPage) {
        ofertasDF.getOfertas(newPage, $scope.ofertasPerPage)
          .then(function (data) {
              $scope.totalOfertas = data.TotalRows;
              $scope.ofertas = data.Results;
          });
    };
    //#endregion

    //#region SLuna: eventos relacionados con Rubros
    $scope.rubroChanged = function () {
        rubrosDF.getRubro($scope.rubroSelected)
            .then(function (data) {
                $scope.Rubro = data;
                $scope.subRubroDisabled = $scope.Rubro.Subrubros.length === 0;//Si no tiene SubRubros, oculta el Select de SubRubros
            });
    };
    
    $scope.subRubroChanged = function () {
    };

    $scope.subRubroAddClick = function () {
        debugger;
        for (var i = 0; i < $scope.profesional.Subrubros.length; i++) {
            if ($scope.profesional.Subrubros[i].Id === $scope.subRubroSelected.Id) {
                alert("Advertencia: El SubRubro ya está seleccionado.");
                return;
            }
        }
        $scope.profesional.Subrubros.push($scope.subRubroSelected);
    };

    $scope.QuitarSubRubro = function (IdSubRubro) {
        for (var i = 0; i < $scope.profesional.Subrubros.length; i++) {
            if ($scope.profesional.Subrubros[i].Id === IdSubRubro) {
                $scope.profesional.Subrubros.splice(i, 1);
                return;
            }
        }
    };

    //#endregion

    //#region fpaz: actualizacion de perfil del profesional
    $scope.edit = function () {//fpaz: activa el modo de edicion de los campos                
        $scope.editValue = true;
    };

    $scope.profesionalPerfilUpdate = function (prmProfesional) {
        prmProfesional.Habilidades =  $scope.chipsHabilidad !== null ? $scope.chipsHabilidad.toString() : null;
        profesionalesDF.putProfesional(prmProfesional.Id, prmProfesional).then(function (response) {
            alert("Perfil del Profesional Actualizado");
            $scope.profesional = response; //si se actualizo bien el perfil del profesional, cargo el scope con los datos guardados
        },
        function (err) {
            if (err) {
                $scope.error = err;
                alert("Error al Guardar los Cambios en el Perfil: " + $scope.error.Message);
                $scope.profesional = infoProfesional; //Si hubo un error en la actualizacion, cargo los datos originales
            }
        });
    };
    //#endregion

    //#region iafar:region mdTable
    $scope.agregarDoc = function (obj) {
       
       
        $scope.profesional.IdentificacionesProfesional.push(obj);
        borraScopeAdd();
    }

    //iafar: borra el scope de los campos de alta de documento
    function borraScopeAdd() {
        $scope.opcionAgregar = false;
        $scope.nuevoDoc = {};
    }

    $scope.eliminarTipoId = function (objList) {
        var pos;
        for (var o in objList) {
            pos = $scope.profesional.IdentificacionesProfesional.indexOf(objList[o]);
            $scope.profesional.IdentificacionesProfesional.splice(pos, 1);
            //alert($scope.docList.indexOf(objList[o]));
        }
        $scope.selectItems = [];
    }
    $scope.opcionAgregar = false; //iafar: para mostrar el menu para agregar un nuevo tipo de Id
    //#endregion


    //#region kikexp: dispara el modal de nueva experiencia
    $scope.nuevaExperiencia = function () {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
        $mdDialog.show({
            controller: 'experienciasLaboralesCtrl',
            templateUrl: 'App/ExperienciasLaborales/Partials/nuevaExperiencia.html',
            parent: angular.element(document.body),            
            clickOutsideToClose: true,            
            fullscreen: useFullScreen,
            resolve: {
                experienciasLaboralesDF: 'experienciasLaboralesDF',
                listEmpresas: function (empresasDF) {
                    return empresasDF.getEmpresas();
                },
                experienciaPendiente: function () {
                    return { value: [] };
                },                
                loadExperienciasLaboralesCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['App/ExperienciasLaborales/experienciasLaboralesCtrl.js']);
                }]
            }
        })
        .then(function (nuevaExperiencia) {
            $scope.profesional.ExperienciasLaborales.push(nuevaExperiencia);
        });
    }
    //#endregion

    //#region kikexp: dispara el modal de nuevo curso o certificacion
    $scope.nuevoCurso = function () {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
        $mdDialog.show({
            controller: 'cursosCtrl',
            templateUrl: 'App/Cursos/Partials/nuevoCurso.html',
            parent: angular.element(document.body),            
            clickOutsideToClose: true,            
            fullscreen: useFullScreen,
            resolve: {                
                loadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['App/Cursos/cursosCtrl.js']);
                }]
            }
        })
        .then(function (nuevoCurso) {
            $scope.profesional.Cursos.push(nuevoCurso);
        });
    }
    //#endregion

    //#region kikexp: dispara el modal de nuevo Idioma
    $scope.nuevoIdioma = function () {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
        $mdDialog.show({
            controller: 'idiomasCtrl',
            templateUrl: 'App/Idiomas/Partials/nuevoIdiomaConocido.html',
            parent: angular.element(document.body),            
            clickOutsideToClose: true,            
            fullscreen: useFullScreen,
            resolve: {
                idiomasDF: 'idiomasDF',
                listIdiomas: function (idiomasDF) {
                    return idiomasDF.getIdiomas();
                },                
                listCompetenciasIdioma: function (idiomasDF) {
                    return idiomasDF.getCompetencias();
                },
                loadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['App/Idiomas/idiomasCtrl.js']);
                }]
            }
        })
        .then(function (nuevoIdioma) {
            $scope.profesional.IdiomasConocidos.push(nuevoIdioma);
        });
    }
    //#endregion

    //#region kikexp: dispara el modal de nueva educacion
    $scope.nuevaEducacion = function () {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
        $mdDialog.show({
            controller: 'educacionCtrl',
            templateUrl: 'App/Educacion/Partials/nuevaEducacion.html',
            parent: angular.element(document.body),
            //targetEvent: ev,
            clickOutsideToClose: true,           
            fullscreen: useFullScreen,
            resolve: {
                tiposNivEstudioDF: 'tiposNivEstudioDF',
                listTiposNivelesEstudio: function (tiposNivEstudioDF) {
                    return tiposNivEstudioDF.getTiposNivelEstudio();
                },
                loadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['App/Educacion/educacionCtrl.js']);
                }]
            }
        })
        .then(function (nuevaEducacion) {
            $scope.profesional.Educaciones.push(nuevaEducacion);
        });
    }
    //#endregion

    //#region iafar: elementos usados en listado de profesionales

    //iafar: array de profesionales seleccionados
    $scope.search = "";
    $scope.selectedPro = selectedPro; //iafar: array con los profesionales ya listados para invitar en la ventana padre (en caso de usar dialog)
    $scope.selectedItems = []; //iafar: array de elementos seleccionados para eliminacion
    $scope.profesionalesList = profesionalesList; //iafar: cargo scope con primera pagina de profesionales
    $scope.guardarLista = function (response) {
        $mdDialog.hide(response);
    }

    $scope.filtrarLista = function (filtro) { //iafar: aqui puede ser usado para consultar a la api a traves de parametros
        $scope.search = filtro.NomApellido;

    }

    //#endregion

    $scope.cancel = function () {
        $mdDialog.cancel();
    }


    //#region Detalle profesional
    $scope.abrirDetalle = function (prmProfesional) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
        $mdDialog.show({
            controller: 'profesionalesCtrl',
            templateUrl: '/App/Postulantes/Partials/postulanteDetalle.html',
            parent: angular.element(document.body),
            //targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: useFullScreen,
            profesionalesList: profesionalesList,
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
            //infoProfesional: function (profesionalesDF, prmProfesional) {
            //    return profesionalesDF.getProfesional(prmProfesional);
            //},
            infoProfesional: prmProfesional,

            selectedPro: function () {
                return { value: [] };
            },
            loadProfesionalesCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load(['App/Profesionales/profesionalesCtrl.js']);
            }]

        
        })
        .then(function () {

        });
    }
    //#endRegion

    //#region Convocar profesional
    $scope.convocarProfesional = function (prmProfesional) {
        var arrayProf;
        arrayProf.push(prmProfesional);
        $state.go('empresa.ofertas.convocarPro', {postulantesOferta: arrayProf})

    }
    //#endregion

});
