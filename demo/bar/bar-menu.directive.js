'use strict';

function barMenu() {
    'ngInject'

    return {
        restrict: 'A',
        templateUrl: 'bar/bar-menu.html',
        link: ($scope, element, attrs) => {
        }
    };
}

export default barMenu;
