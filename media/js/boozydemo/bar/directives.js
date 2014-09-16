angular.module('bar.directives', [])
    .directive('drink', function(){
        return {
            restrict: 'EA',
            link: function(scope, element, attrs) {
                console.log('drink element');
                console.log(element);
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
                console.log('browser element');
                console.log(element);
                element.droppable({
                    'hoverClass': 'drop-hover',
                    'drop': function(event, ui) {
                        var $drink = $(ui.draggable);
                        soBoozy.drinks.bottomsUp($drink);
                        $drink.fadeOut(function(){
                            $(this).show();
                        });
                    } 
                });
            }
        }
    });
