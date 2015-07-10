'use strict';

var resouceCenterControllers = angular.module('resouceCenterControllers', []);

resouceCenterControllers.controller('ProjectsListCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('data/projects.json').success(function (data) {
        $scope.projects = data.projects;
    });

}]);

resouceCenterControllers.controller('ProjectDetailCtrl', ['$scope', '$http', '$routeParams', '$location', function ($scope, $http, $routeParams, $location) {
    $scope.project_name = $routeParams.project_name;
    $scope.prefix = $routeParams.prefix;
    $http.get('data/' + $scope.project_name + '.json').success(function (data) {
        $scope.columns = [];
        $scope.file_type = 'dir';
        var _data = data;
        if ($scope.prefix) {
            var _prefix = $scope.prefix.split('/');
            for (var i = 0; i < _prefix.length; i++) {
                for (var k in _data) {
                    if (k == _prefix[i]) {
                        _data = _data[k];
                    }
                }
            }
        }

        if (_data instanceof Object) {
            for (var column in _data) {
                $scope.columns.push(column);
            }
        } else if (_data.constructor == String) {
            if (_data.match(/(jpg|png|jpeg|gif)$/i)) {
                $scope.file_type = 'img';
            } else {
                $scope.file_type = 'file';
            }
        } else {
            for (var column in _data) {
                $scope.columns.push(column);
            }
        }

        var _url = '/data/projects/' + $scope.project_name + "/" + $scope.prefix;
        if ($scope.file_type == 'file') {
            $("#file").load(_url, function (data) {
                $(this).html(data);
            })
            if(_url.match(/(htm|html)$/i)){
                $('#preview a').attr('href', 'http://' + $location.host() + _url);
                $('#preview').show();
            }
        }

        if($scope.file_type == 'img'){
            $("#img").attr('src', _url);
        }

        $('#' + $scope.file_type).show();


        $scope.is_html = function(column){
            return $('$preview_' + column).attr('href', 'http://baidu.com').show();
        }

    });

}]);
