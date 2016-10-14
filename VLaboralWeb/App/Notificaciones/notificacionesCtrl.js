vLaboralApp.controller('notificacionesCtrl', function ($scope, $mdMedia, $mdDialog, $ocLazyLoad, $filter, $stateParams //fpaz: definicion de inyectores de dependencias
    , notificacionesDF, authSvc, notificacionesSvc //fpaz: definicion de data factorys
    , listadoNotificaciones //fpaz: definicion de parametros de entrada    
    ) {

    $scope.notificaciones = listadoNotificaciones.Results;
    $scope.currentNavItem = 'page1';
    
});