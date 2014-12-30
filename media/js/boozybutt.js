/*
    dis guy will consume the BoozyBrowser object to show how it's done
*/

(function($){
    var boozy = { 
        init: function() {
            boozy.menu.init();

            $('.button').click(function() {
                $('.button').removeClass('pressed');
                $(this).addClass('pressed');
            });

        },
        // menu control rendering/event handling
        menu: {
            init: function() {
                // kinda haxky logic, cause ng-include won't let you include outside of the 
                // body for some reason we don't want the menu getting drunk
                var $boozyMenuTemplate = $('#boozy-menu-template');
                $('html').append($boozyMenuTemplate.html());

                // init teh angularz by hand! 
                angular.bootstrap($('.boozy-menu-wrapper'), ['boozyDemo'])
            }
        }
    };

    $(document).ready(function() {
        boozy.init();
    });

})(jQuery);
