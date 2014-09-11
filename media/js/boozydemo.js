/*
    dis guy will consume the BoozyBrowser object to show how it's done
*/

(function($, BoozyBrowser){
    var boozy = { 
        _notDrunk: 'sober',
        _drunkLevels: ['buzzed', 'im-fine', 'drunk', 'wooo', 'blackout'],
        init: function() {
            // only initialize after the menu is loaded
            boozy._menu.init();

            $('.button').click(function() {
                $('.button').removeClass('pressed');
                $(this).addClass('pressed');
            });

        },
        _howDrunkHandler: function(event) {
            var $drunkDrop =  $(event.target).closest('.drunk-level'),
                $controlContainer = $drunkDrop.parents('.control'),
                controlId = $controlContainer.attr('id'),
                drunkLevel = $drunkDrop.val(),
                drunkObject = {
                    "controlId": controlId,
                    "drunkLevel": drunkLevel
                };
            boozy._howDrunk(drunkObject); 
        },
        _howDrunk: function(drunkObject) {
            if(!boozy.boozyObject) {
                boozy.boozyObject = new BoozyBrowser();
            }
            if(drunkObject.controlId === 'bulk') {
                // change them all
                $('.boozy-menu .drunk-level.single-control').val(drunkObject.drunkLevel).change();
            } else if(drunkObject.drunkLevel === boozy._notDrunk) {
                // be sober
                boozy.boozyObject.setBooziness(drunkObject.drunkLevel);
                boozy.boozyObject.stop(drunkObject.controlId);
            } else if(_.contains(boozy._drunkLevels, drunkObject.drunkLevel)) {
                // be drunk
                boozy.boozyObject.setBooziness(drunkObject.drunkLevel);
                boozy.boozyObject.start(drunkObject.controlId);
            }
        },
        // menu control rendering/event handling
        _menu: {
            init: function() {
                var $boozyMenuTemplate = $('#boozy-menu-template');
                $('html').append($boozyMenuTemplate.html());

                $('.boozy-menu .drunk-level')
                    .on('change', boozy._howDrunkHandler);
                $('.boozy-menu .hide')
                    .on('click', boozy._menu.handleHideClicks);
                $('.boozy-menu .show')
                    .on('click', boozy._menu.handleShowClicks);

                boozy.drinks.init();
            },
            handleHideClicks: function(event) {
                var $menu = $('.boozy-menu');
                $menu.addClass('hide-menu');
                // TODO: these toggles suck, come up with something better
                $('.hide', $menu).toggleClass('fade-out');
                $('.show', $menu).toggleClass('fade-out');
            },
            handleShowClicks: function(event) {
                var $menu = $('.boozy-menu');
                $menu.removeClass('hide-menu');
                // TODO: these toggles suck, come up with something better
                $('.hide', $menu).toggleClass('fade-out');
                $('.show', $menu).toggleClass('fade-out');
            }
        },
        drinks: {
            init: function() {
                boozy.drinks.setDraggableIcons();
                boozy.drinks.setDroppableContainer();
            },
            setDraggableIcons: function() {
                $('.so-drag').draggable({
                    'containment': '.boozy-menu' 
                });
            },
            setDroppableContainer: function() {
                $('.so-drop').droppable({
                    'hoverClass': 'drop-hover',
                    'drop': function(event, ui) {
                        console.log($(ui.draggable).attr('id'));
                    } 
                });
            }
        }
    };

    $(document).ready(function() {
        boozy.init();
        window.soBoozy = boozy;
    });

})(jQuery, window.BoozyBrowser);
