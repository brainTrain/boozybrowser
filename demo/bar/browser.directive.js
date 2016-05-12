'use strict';

function browser() {
    'ngInject'

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'bar/browser.html',
        link: ($scope, element, attrs) => {
            /*
            element.droppable({
                'hoverClass': 'drop-hover',
                'drop': function(event, ui) {
                    var $drink = $(ui.draggable);
                        drink = $drink.data('drink');
                    $scope.drinkUp(drink);
                    $drink.fadeOut(function(){
                        $(this).show();
                    });
                } 
            });
            */
        }
    };
}

export default browser;
