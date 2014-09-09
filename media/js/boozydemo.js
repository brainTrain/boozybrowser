/*
    dis guy will consume the BoozyBrowser object to show how it's done
*/

(function($){
    var boozy = { 
        _typingSelectors: 'textarea, input, [role="input"], [role="textarea"]',
        _buttonSelectors: '.button, button, .btn, [role="button"]',
        _pageSelectors: 'body',
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
        _notDrunk: 'sober',
        _drunkLevels: ['buzzed', 'im-fine', 'drunk', 'wooo', 'blackout'],
        // TODO: this be where I'm gonna put boozy object handlin, but start with one for now
        _howDrunk: function(drunkObject) {
            if(!boozy.boozyObject) {
                boozy.boozyObject = new BoozyBrowser();
            }
            if(drunkObject.controlId === 'bulk') {
                // change them all
                $('.boozy-menu .drunk-level.single-control').val(drunkObject.drunkLevel).change();
            } else if(drunkObject.drunkLevel === boozy._notDrunk) {
                // be sober
                boozy.boozyObject[drunkObject.controlId].stop();
            } else if(_.contains(boozy._drunkLevels, drunkObject.drunkLevel)) {
                // be drunk
                boozy.boozyObject[drunkObject.controlId].start(drunkObject.drunkLevel);
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
        }
    };

    $(document).ready(function() {
        boozy.init();
    });

})(jQuery);
