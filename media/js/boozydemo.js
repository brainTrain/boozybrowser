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
        // menu control rendering/event handling
        _menu: {
            init: function() {
                var $boozyMenuTemplate = $('#boozy-menu-template');
                $('html').append($boozyMenuTemplate.html());

                $('.boozy-menu .drunk-level')
                    .on('change', boozy._howDrunkHandler);

                // init teh angularz by hand! 
                angular.bootstrap($('.boozy-menu'), ['boozyDemo'])
            }
        },
    };

    $(document).ready(function() {
        boozy.init();
        window.soBoozy = boozy;
    });

})(jQuery, window.BoozyBrowser);
