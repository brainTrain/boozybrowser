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
        // menu control rendering/event handling
        _menu: {
            init: function() {
                var $boozyMenuTemplate = $('#boozy-menu-template');
                $('html').append($boozyMenuTemplate.html());

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
