vLaboralApp.controller('notificacionesCtrl', function ($scope, $mdMedia, $mdDialog, $ocLazyLoad, $filter, $stateParams //fpaz: definicion de inyectores de dependencias
    , notificacionesDF, authSvc, notificacionesSvc //fpaz: definicion de data factorys
    , listadoNotificaciones, listExperienciasPendientes //fpaz: definicion de parametros de entrada    
    ) {

    $scope.notificaciones = listadoNotificaciones;
    $scope.experienciasPendientesList = listExperienciasPendientes;
    $scope.currentNavItem = 'page1';
    
});