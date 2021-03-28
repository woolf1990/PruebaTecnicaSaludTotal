// Creación del módulo
var angularRoutingApp = angular.module('angularRoutingApp', ['ngRoute']);

// Configuración de las rutas
angularRoutingApp.config(function ($routeProvider) {

    $routeProvider
		.when('/', {
		    templateUrl: 'pages/home.html',
		    controller: 'mainController'
		})
		.when('/loco12', {
		    templateUrl: 'Usuarios/Menus/Index.aspx?ID=4',
		    controller: 'aboutController'
		})
		.when('/contacto', {
		    templateUrl: 'pages/contacto.html',
		    controller: 'contactController'
		})
		.otherwise({
		    redirectTo: '/'
		});
});


angularRoutingApp.controller('mainController', function ($scope) {
    $scope.message = 'Hola, Mundo!';
});

angularRoutingApp.controller('aboutController', function ($scope) {
    $scope.message = 'Esta es la página "Acerca de"';
});

angularRoutingApp.controller('contactController', function ($scope) {
    $scope.message = 'Esta es la página de "Contacto", aquí podemos poner un formulario';
});