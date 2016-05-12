'use strict';

function barMenu() {
    'ngInject'

    return {
        restrict: 'A',
        replace: true,
        templateUrl: 'bar/bar-menu.html',
        link: ($scope, element, attrs) => {
        }
    };
}

export default barMenu;
