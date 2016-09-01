vLaboralApp.controller('empresasCtrl', function ($scope, listadoOfertas, authSvc) {

    $scope.ofertas = listadoOfertas;
    $scope.totalOfertas = listadoOfertas.TotalRows;
    $scope.usuarioLogueado = authSvc.authentication;//fpaz: obtiene la informacion del usuario logueado
});