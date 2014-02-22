(function(window, document, $){
    boozy = { 
        init: function() {
            // only initialize after the menu is loaded
            boozy._menu.init(function(){});
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
        // menu control rendering/event handling
        _menu: {
            init: function() {
                var $boozyMenu = $('.boozy-menu');

                $('.drunk-level', $boozyMenu)
                    .on('change', boozy._howDrunkHandler);
            },
        },
        _notDrunk: 'sober',
        _drunkLevels: ['buzzed', 'im-fine', 'drunk', 'wooo', 'blackout'],
        _howDrunk: function(drunkObject) {
            if(drunkObject) {
                if(drunkObject.controlId === 'bulk') {
                    // change them all
                    $('.boozy-menu .drunk-level.single-control').val(drunkObject.drunkLevel).change()
                } else if(drunkObject.drunkLevel === boozy._notDrunk) {
                    // be sober
                    //boozy[drunkObject.controlId].stop();
                } else if(_.contains(boozy._drunkLevels, drunkObject.drunkLevel)) {
                    // be drunk
                    //boozy[drunkObject.controlId].start(drunkObject.drunkLevel);
                }
                // I am god! (lol #ihtw)
            }
        },
    }

    $(document).ready(function() {
        boozy.init();     
    });

})(window, document, jQuery);
