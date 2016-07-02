vLaboralApp.controller('ofertasCtrl', function ($scope, $mdMedia, $mdDialog, //fpaz: definicion de inyectores de dependencias
    ofertasDF, rubrosDF, requisitosDF, habilidadesDF, //fpaz: definicion de data factorys
     listadoTiposDiponibilidad, listadoTiposContratos,//fpaz: definicion de parametros de entrada 
    listadoRubros, listadoTiposRequisitos, listadoHabilidades//
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
                }
            }
        })
        .then(function (nuevoPuesto) {
            $scope.oferta.Puestos.push(nuevoPuesto);
        });
    }
    //#endregion

    

    //funcion para dar de alta la oferta en la bd
    $scope.ofertaSave = function (prmOferta) {
        prmOferta.EmpresaId = 1; //hardcode para prueba
        for (var i in prmOferta.Puestos) { //para cada puesto armo el objeto tal cual lo voy a enviar al post de ofertas

            //dejo solamente el Id del tipo de contrato seleccionado
            prmOferta.Puestos[i].TipoContratoId = prmOferta.Puestos[i].TipoContrato.Id;
            delete prmOferta.Puestos[i].TipoContrato;

            //dejo solamente el Id del tipo de disponibilidad seleccionada
            prmOferta.Puestos[i].TipoDisponibilidadId = prmOferta.Puestos[i].Disponibilidad.Id;
            delete prmOferta.Puestos[i].Disponibilidad;

            //para cada subrubro asociado al puesto solo dejo el Id del subrubro
            //for (var j in oferta.Puestos[i].SubRubros) {
            //    delete oferta.Puestos[i].SubRubros[j].Nombre;
            //    delete oferta.Puestos[i].SubRubros[j].Descripcion;
            //    delete oferta.Puestos[i].SubRubros[j].Empleados;
            //    delete oferta.Puestos[i].SubRubros[j].Empleadores;
            //    delete oferta.Puestos[i].SubRubros[j].Puestos;
            //}
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




});








