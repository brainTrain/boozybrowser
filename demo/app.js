'use strict';

import angular from 'angular';

import './bar/bar.module';

const requires = [ 
    'app.bar'
];

// mount on window for testing
window.app = angular.module('app', requires);

app.controller('MainController', ($scope) => {
    $scope.message = 'Angularzzzzz Works!'
});
