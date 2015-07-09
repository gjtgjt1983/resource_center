'use strict';

/* App Module */
var ResouceCenter = angular.module('ResouceCenter', [
    'ngRoute',
    'resouceCenterControllers'
]);

ResouceCenter.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/projects', {
                templateUrl: 'partials/projects.html',
                controller: 'ProjectsListCtrl'
            }).
            when('/projects/:project_name', {
                templateUrl: 'partials/project.html',
                controller: 'ProjectDetailCtrl'
            }).
            otherwise({
                redirectTo: '/projects'
            });
    }]);