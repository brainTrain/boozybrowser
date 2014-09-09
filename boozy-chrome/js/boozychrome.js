(function($, BoozyBrowser){
    var boozy = { 
        _notDrunk: 'sober',
        _drunkLevels: ['buzzed', 'im-fine', 'drunk', 'wooo', 'blackout'],
        init: function() {
            chrome.runtime.onMessage.addListener(function(drunkObject, sender, sendResponse) {
                    boozy._howDrunk(drunkObject);
                    sendResponse({howDrunk: drunkObject.drunkLevel});
            });
        },
        _howDrunk: function(drunkObject) {
            if(!boozy.boozyObject) {
                boozy.boozyObject = new BoozyBrowser();
            }

            if(drunkObject.controlId === 'bulk') {
                // change them all
                $('.boozy-menu .drunk-level.single-control').val(drunkObject.drunkLevel).change();

            } else if(_.contains(boozy._drunkLevels, drunkObject.drunkLevel)) {
                // be drunk
                boozy.boozyObject.setBooziness(drunkObject.drunkLevel);
                boozy.boozyObject.start(drunkObject.controlId);

            } else if(drunkObject.drunkLevel === boozy._notDrunk) {
                // be sober
                boozy.boozyObject.setBooziness(drunkObject.drunkLevel);
                boozy.boozyObject.stop(drunkObject.controlId);
            }
        }
    };
    // don't want document ready with content script
    boozy.init();     

})(jQuery, window.BoozyBrowser);

