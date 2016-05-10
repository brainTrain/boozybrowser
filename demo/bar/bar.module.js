'use strict';

import angular from 'angular';
//import './bar.templates';

const requires = [
    //'bar.templates'
];

export default angular.module('app.bar', requires)
                      .directive('drink', drink)
                      .directive('browser', browser)
                      .directive('bar-menu', barMenu);
