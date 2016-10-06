vLaboralApp.factory('hubProxySvc', function ($rootScope ,$http, $q, configSvc, localStorageService) {

    var urlApi = configSvc.urlApi;
    var authData = localStorageService.get('authorizationData');
  // var o authSvc.authentication;
    function backendFactory(serverUrl, hubName) {
          var connection = $.hubConnection(urlApi); //, { useDefaultPath: false, qs: "bearer_token=" + authData.token });
          var proxy = connection.createHubProxy(hubName);
          proxy.qs = { "access_token": authData.idUsuarioLogueado };
          connection.qs = { "access_token": authData.idUsuarioLogueado };
          connection.start().done(function() {});
          return {
              on: function (eventName, callback) {
                  proxy.on(eventName, function (result) {
                      $rootScope.$apply(function () {
                          if (callback) {
                              callback(result);
                          }
                      });
                  });
              },
              invoke: function (methodName, callback) {
                  proxy.invoke(methodName)
                  .done(function (result) {
                      $rootScope.$apply(function () {
                          if (callback) {
                              callback(result);
                          }
                      });
                  });
              }
          };
      };
    return backendFactory;
  });