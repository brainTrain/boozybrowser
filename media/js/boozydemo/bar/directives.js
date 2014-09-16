angular.module('bar.directives', [])
    .directive('drink', function(){
        return {
            restrict: 'EA',
            link: function(scope, element, attrs) {
                element.draggable({
                    'containment': '.boozy-menu',
                    'revert': true,
                    'revertDuration': 0
                });

            }
        }
    })
    .directive('browser', function(){
        return {
            restrict: 'EA',
            link: function(scope, element, attrs) {
                element.droppable({
                    'hoverClass': 'drop-hover',
                    'drop': function(event, ui) {
                        var $drink = $(ui.draggable);
                            drink = $drink.data('drink');
                        scope.drinkUp(drink);
                        $drink.fadeOut(function(){
                            $(this).show();
                        });
                    } 
                });
            }
        }
    });
