/*
    dis guy will consume the BoozyBrowser object to show how it's done
*/

(function($, BoozyBrowser){
    var boozy = { 
        _currentDrunkLevel: 'sober',
        _drunkLevels: ['sober', 'buzzed', 'im-fine', 'drunk', 'wooo', 'blackout'],
        _drunkArray: ['buzzed', 'im-fine', 'drunk', 'wooo', 'blackout'],
        init: function() {
            // only initialize after the menu is loaded
            boozy._menu.init();
            boozy._paintDrunkLevel();

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
            boozy._currentDrunkLevel = drunkObject.drunkLevel;
            boozy._paintDrunkLevel();
            $('.boozy-menu .menu-footer .drunk-level')
            if(!boozy.boozyObject) {
                boozy.boozyObject = new BoozyBrowser();
            }
            if(drunkObject.controlId === 'bulk') {
                // change them all
                $('.boozy-menu .drunk-level.single-control').val(drunkObject.drunkLevel).change();
            } else if(drunkObject.drunkLevel === 'sober') {
                // be sober
                boozy.boozyObject.setBooziness(drunkObject.drunkLevel);
                boozy.boozyObject.stop(drunkObject.controlId);
            } else if(_.contains(boozy._drunkArray, drunkObject.drunkLevel)) {
                // be drunk
                boozy.boozyObject.setBooziness(drunkObject.drunkLevel);
                boozy.boozyObject.start(drunkObject.controlId);
            }
        },
        _paintDrunkLevel: function() {
            $('.boozy-menu .menu-footer .drunk-level').html(boozy._currentDrunkLevel);
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
                $('.boozy-menu .nav')
                    .on('click', boozy._menu.handleTitleClicks);

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
            },
            handleTitleClicks: function(event) {
                var $menuContainer = $('.boozy-menu'), 
                    $menu = $(this),
                    id = $menu.attr('id');

                if(!$menu.hasClass('active')) {
                    $('.nav', $menuContainer)
                        .addClass('cursor-pointer')
                        .removeClass('active');
                    $('#' + id, $menuContainer)
                        .removeClass('cursor-pointer')
                        .addClass('active');

                    $('.menu-controls', $menuContainer).fadeOut(function(){
                        $('#' + id + '-menu', $menuContainer).fadeIn('slow');
                    });
                }
            }
        },
        drinks: {
            init: function() {
                boozy.drinks.setDraggableIcons();
                boozy.drinks.setDroppableContainer();
            },
            setDraggableIcons: function() {
                $('.drink').draggable({
                    'containment': '.boozy-menu',
                    'revert': true,
                    'revertDuration': 0
                });
            },
            setDroppableContainer: function() {
                $('.boozy-computer').droppable({
                    'hoverClass': 'drop-hover',
                    'drop': function(event, ui) {
                        var $drink = $(ui.draggable);
                        boozy.drinks.bottomsUp($drink);
                        $drink.fadeOut(function(){
                            $(this).show();
                        });
                    } 
                });
            },
            bottomsUp: function($drink) {
                if($drink.hasClass('booze')) {
                    var currentIndex = boozy._drunkLevels.indexOf(boozy._currentDrunkLevel), 
                        nextLevel = currentIndex + 1 >= boozy._drunkLevels.length ? 'blackout' : boozy._drunkLevels[currentIndex + 1];
                    console.log(currentIndex);
                    boozy._howDrunk({
                        'controlId': 'bulk',
                        'drunkLevel': nextLevel 
                    });
                } else if($drink.hasClass('caffine')) {
                    var currentIndex = boozy._drunkLevels.indexOf(boozy._currentDrunkLevel), 
                        nextLevel = currentIndex <= 0 ? 'sober' : boozy._drunkLevels[currentIndex - 1];
                    console.log(currentIndex);
                    boozy._howDrunk({
                        'controlId': 'bulk',
                        'drunkLevel': nextLevel
                    });

                }
            }
        }
    };

    $(document).ready(function() {
        boozy.init();
        window.soBoozy = boozy;
    });

})(jQuery, window.BoozyBrowser);
