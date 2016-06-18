// config

var vLaboralApp =  
angular.module('vLaboralApp')
  .config(
    [        '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ($controllerProvider,   $compileProvider,   $filterProvider,   $provide) {
        
        // lazy controller, directive and service
        vLaboralApp.controller = $controllerProvider.register;
        vLaboralApp.directive  = $compileProvider.directive;
        vLaboralApp.filter     = $filterProvider.register;
        vLaboralApp.factory    = $provide.factory;
        vLaboralApp.service    = $provide.service;
        vLaboralApp.constant   = $provide.constant;
        vLaboralApp.value      = $provide.value;
    }
  ])
  .config(['$translateProvider', function($translateProvider){
    // Register a loader for the static files
    // So, the module will search missing translation tables under the specified urls.
    // Those urls are [prefix][langKey][suffix].
    $translateProvider.useStaticFilesLoader({
      prefix: 'i18n/',
      suffix: '.js'
    });
    // Tell the module what language to use by default
    $translateProvider.preferredLanguage('en');
    // Tell the module to store the language in the local storage
    $translateProvider.useLocalStorage();
  }]);
