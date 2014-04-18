(function(window, document, $){
    boozy = { 
        init: function() {
            // only initialize after the menu is loaded
            boozy._menu.init();
        },
        _sendChromeMessage: function(drunkObject) {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, drunkObject, function(response) {
                    console.log(response);
                });
            });
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
        _howDrunkHandler: function(event) {
            var $drunkDrop =  $(event.target).closest('.drunk-level'),
                $controlContainer = $drunkDrop.parents('.control'),
                controlId = $controlContainer.attr('id'),
                drunkLevel = $drunkDrop.val(),
                drunkObject = {
                    "controlId": controlId,
                    "drunkLevel": drunkLevel
                };
            boozy._sendChromeMessage(drunkObject);
            boozy._howDrunk(drunkObject); 
        },
        _howDrunk: function(drunkObject) {
            if(drunkObject) {
                var isOption = _.contains(boozy._drunkLevels, drunkObject.drunkLevel);
                if(drunkObject.controlId === 'bulk') {
                    // change them all
                    $('.boozy-menu .drunk-level.single-control').val(drunkObject.drunkLevel).change();
                } else if(drunkObject.drunkLevel === boozy._notDrunk || isOption) {
                    // send that message
                } 
            }
        },
    }

    $(document).ready(function() {
        boozy.init();     
    });

})(window, document, jQuery);
