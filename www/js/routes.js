angular.module('app.routes', ['ionic', 'app.controllers'])

.config(function($ionicNativeTransitionsProvider){
	
	// use fade for android and ios
	var isIOS = ionic.Platform.isIOS();
	var isAndroid = ionic.Platform.isAndroid();
	var type = 'slide';
		
	if(isIOS || isAndroid) {
		type = 'slide';
	}
		
	$ionicNativeTransitionsProvider.setDefaultTransition({
		type: type,
		direction: 'left',
		duration: 200
	});
	    
	$ionicNativeTransitionsProvider.setDefaultBackTransition({
		type: type,
		direction: 'right',
		duration: 200
	});
})


.config(function($stateProvider, $urlRouterProvider, $provide, $ionicNativeTransitionsProvider) {

	$stateProvider
	
	.state('menu.home', {
		url: '/',
		views: {
			'side-menu21': {
				templateUrl: 'js/modules/app/templates/home.html',
				controller: 'AppController'
			}
		}
	})

	.state('menu.search', {
		url: '/search',
		views: {
			'side-menu21': {
				templateUrl: 'js/modules/search/templates/search.html',
				controller: 'SearchController'
			}
		}
	})

	.state('menu', {
		url: '/side-menu21',
		templateUrl: 'js/shared/sidemenu/menu.html',
		abstract:true
	});

	$urlRouterProvider.otherwise('/side-menu21/search');	

});