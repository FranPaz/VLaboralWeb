vLaboralApp.controller('empresasCtrl', function ($scope, listadoOfertas) {

    $scope.ofertas = listadoOfertas;
    $scope.totalOfertas = listadoOfertas.TotalRows;
});