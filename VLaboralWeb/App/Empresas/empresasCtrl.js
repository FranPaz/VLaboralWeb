vLaboralApp.controller('empresasCtrl', function ($scope, listadoOfertas, authSvc,infoEmpresa) {

    //#region Inicializacion de Variables de Scope
    $scope.empresa = infoEmpresa;
    $scope.ofertas = listadoOfertas;
    $scope.totalOfertas = listadoOfertas.TotalRows;
    $scope.usuarioLogueado = authSvc.authentication;//fpaz: obtiene la informacion del usuario logueado
    //#endregion
    
});