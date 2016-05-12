'use strict';

function drink() {
    'ngInject'

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'bar/drink.html',
        scope: {
            drink: '='
        },
        link: ($scope, element, attrs) => {
            // don't forget the $scope.drink.strength
            /*
            element.draggable({
                'containment': '.boozy-menu',
                'helper': 'clone',
                'opacity': 0.7,
                'revert': true,
                'revertDuration': 0
            });
            */
        }
    };
}

export default drink;
