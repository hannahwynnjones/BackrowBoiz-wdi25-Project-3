angular
  .module('rentApp')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $stateProvider
   .state('itemIndex', {
     url: '/',
     templateUrl: 'js/views/items/index.html',
     controller: 'IndexCtrl as index'
   })
   .state('itemNew', {
     url: '/new',
     templateUrl: 'js/views/items/new.html',
     controller: 'NewCtrl as new'
   })
   .state('itemShow', {
     url: '/show/:id',
     templateUrl: 'js/views/items/show.html',
     controller: 'ShowCtrl as show'
   })
   .state('itemEdit', {
     url: '/show/:id/edit',
     templateUrl: 'js/views/items/edit.html',
     controller: 'ShowCtrl as show'
   })
   .state('login', {
     url: '/login',
     templateUrl: 'js/views/auth/login.html',
     controller: 'LoginCtrl as login'
   })
   .state('register', {
     url: '/register',
     templateUrl: 'js/views/auth/register.html',
     controller: 'RegisterCtrl as register'
   })
   .state('profile', {
     url: '/profile/:id',
     templateUrl: 'js/views/users/show.html',
     controller: 'ProfileCtrl as profile'
   });


  $urlRouterProvider.otherwise('/');
}
