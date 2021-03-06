﻿vLaboralApp.controller('empresasCtrl', function ($scope,$window
    , authSvc, ofertasDF, empresasDF, blobsDataFactory//fpaz: definicion de data factorys
    , listadoOfertas, infoEmpresa, listOpcionesFiltrosOfertas//fpaz: definicion de parametros de entrada    
    ) {

    //#region Inicializacion de Variables de Scope
    $scope.empresa = infoEmpresa;
    $scope.ofertas = listadoOfertas;
    $scope.totalOfertas = listadoOfertas.TotalRows;
    $scope.usuarioLogueado = authSvc.authentication;//fpaz: obtiene la informacion del usuario logueado
    $scope.opcionesFiltrosOfertas = listOpcionesFiltrosOfertas;
    
    //#region variables iniciales para paginacion
    $scope.queryFiltros = { // tiene los parametros que voy a pasar para filtrar el listado. 
        Rows: 5, //valor inicial de cantidad de filas mostradas
        Page: 1 //valor inicial de la pagina mostrada
    };

    $scope.limitOptions = [1, 2, 5, 10, 15];// sirve para seleccionar la cantidad de filas que se van a mostrar en la tabla

    $scope.TotalRows;
    //#endregion

    //#endregion
    
    //#region fpaz: funciones para el manejo de filtros y ordenamiento en el listado de ofertas

    $scope.setSelectedOfertas = function (filterType, filterValue) { //funcion para armar el objeto con los filtros para las ofertas
        //si el valor pasado como parametro existe lo elimino, sino lo agrego

        //convierto el id en string
        var id = filterValue.Id.toString();

        if ($scope.queryFiltros[filterType] && $scope.queryFiltros[filterType].indexOf(id) >= 0) {
            if (Array.isArray($scope.queryFiltros[filterType])) {
                $scope.queryFiltros[filterType].splice($scope.queryFiltros[filterType].indexOf(id), 1);
            } else {
                $scope.queryFiltros[filterType] = [];
            }
        } else {
            if (!$scope.queryFiltros[filterType]) {
                $scope.queryFiltros[filterType] = [];
            }

            $scope.queryFiltros[filterType].push(id);
        }

        //llamo al webapi para obtener los valores filtrados
        $scope.obtenerListadoFiltradoOfertas();

    }

    $scope.obtenerListadoFiltradoOfertas = function () {
        console.log('entra a $scope.obtenerListadoFiltradoOfertas');

        var query = angular.copy($scope.queryFiltros);

        ofertasDF.obtenerOfertasFiltradas(query).then(function (response) {
            console.log('entra a obtener ofertas filtradas');
            $scope.ofertas = response.results;
            $scope.TotalRows = response.totalPages;
        },
    function (err) {
        if (err) {
            $scope.error = err;
            alert("Error al Filtrar las Ofertas: " + $scope.error.Message);
        }
    });
    }

    $scope.logPaginationOfertas = function (page, limit) {
        console.log('page: ', page);
        console.log('limit: ', limit);
        //llamo al webapi para obtener los valores filtrados
        $scope.obtenerListadoFiltradoOfertas();
    }

    //$scope.ordenOfertasChanged = function () {
    //    console.log('Ordenamiento: ', $scope.queryFiltros.orderBy);
    //    //llamo al webapi para obtener los valores filtrados        
    //    $scope.obtenerListadoFiltradoOfertas();
    //}
    $scope.ordenOfertasFechaInicio = function () {
        $scope.FechaInicioConvocatoria = 'FechaInicioConvocatoria';
        console.log('Ordenamiento', $scope.FechaInicioConvocatoria);
        $scope.obtenerListadoFiltradoOfertas();
    }

    $scope.ordenOfertasFechaFin = function () {
        $scope.FechaFinConvocatoria = 'FechaInicioFin';
        console.log('Ordenamiento', $scope.FechaFinConvocatoria);
        $scope.obtenerListadoFiltradoOfertas();
    }

    $scope.busquedaNombreOferta = function (prmNombre) {
        console.log('Busqueda por nombre: ', $scope.queryFiltros.searchText);
        $scope.queryFiltros.searchText = prmNombre;
        //llamo al webapi para obtener los valores filtrados        
        $scope.obtenerListadoFiltradoOfertas();
    }
    //#endregion

    //#region Modificacion de perfil de la empresa
    $scope.guardarEmpresa = function (prmEmpresa) {
        empresasDF.putEmpresa(prmEmpresa).then(function (response) {
            alert("Perfil actualizado con exito");
            $scope.empresa = response;
        },
        function (err) {
            if (err) {
                $scope.err = err;
                alert("Error al actualizar el perfil");
                $scope.empresa = infoEmpresa;
            }
        })
    }
    //#endregion


    $scope.guardarImagenEmpresa = function (empresa, foto)
    {
        blobsDataFactory.postImagen(foto)
            .then(function (response) {
                empresa.UrlImagenPerfil = response.FileUrl;
                empresasDF.putEmpresa(empresa)
                    .then(function (prmEmp) {
                        console.log("Ok");
                    });
                
                var prmImagenEmpresa = response;
                prmImagenEmpresa.EmpresaId = empresa.Id;
                prmImagenEmpresa.Tipo = "img";

                empresasDF.postImagenEmpresa(prmImagenEmpresa);
                console.log("ok");
                $window.location.reload();

            })
            .then(function(response){
                
            });

    }


    $scope.descargarCurriculum = function (prmFile) {
        var prm = new URL(prmFile);
        var end = prm.pathname.split('/');
        var final = end[2];
        blobsDataFactory.getFile(final)
        .then(
            function (response) {
                var saveData = (function () {
                    var a = document.createElement("a");
                    document.body.appendChild(a);
                    a.style = "display: none";
                    return function (data, fileName) {
                        var json = JSON.stringify(data),
                            blob = new Blob([json], { type: "octet/stream" }),
                            url = window.URL.createObjectURL(blob);
                        a.href = url;
                        a.download = fileName;
                        a.click();
                        window.URL.revokeObjectURL(url);
                    };
                }());
                saveData(response.data, response.config.params.blobId);
                
                //var octetStreamMime = 'application/jpg';
                //var success = false;

                //// Get the headers
                //var headers = response.headers;

                //// Get the filename from the x-filename header or default to "download.bin"
                //var filename = headers['x-filename'] || 'download';

                //// Determine the content type from the header or default to "application/octet-stream"
                //var contentType = headers['content-type'] || octetStreamMime;

                //try {

                //    console.log(filename);
                //    // Try using msSaveBlob if supported
                //    console.log("Trying saveBlob method ...");
                //    var blob = new Blob([response.data], { type: contentType });
                //    saveAs(blob, 'filename');
                //    if (navigator.msSaveBlob)
                //        navigator.msSaveBlob(blob, filename);
                //    else {
                //        // Try using other saveBlob implementations, if available
                //        var saveBlob = navigator.webkitSaveBlob || navigator.mozSaveBlob || navigator.saveBlob;
                //        if (saveBlob === undefined) throw "Not supported";
                //        saveBlob(blob, filename);
                //    }
                //    console.log("saveBlob succeeded");
                //    success = true;
                //} catch (ex) {
                //    console.log("saveBlob method failed with the following exception:");
                //    console.log(ex);
                //}
                
                //var blob = new Blob([response.data], { type: 'application/jpg'});
                //saveAs(blob, 'curriculum.jpg');
                //var url = URL.createObjectURL(new Blob([response.data]));
                //var a = document.createElement('a');
                //a.href = url;
                
                //a.download = 'document_name';
                //a.target = '_blank';
                //a.click();
            }
        )
    }
});