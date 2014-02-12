/*
    Let's treat this spot kinda like jira... listing my TODO's

    TODO:
    ====
        * create boozy menu that's useful and easy to discover/recall but very out of the way
        * determine what more/less drunk means for each boozy function
        * change boozy/sober/drunk values on the fly
        * develop combinations for creative booziness 
            (zomgz tequila goes right to my head... I can drink beer forever but I become an asshole.. etc)
        * attempt to find a way to replace jQuery's animate with some css animations
        * attempt to optimize these animations so they don't get so jumpy
        * chrome extension:
            * learn the wtf's 
            * learn about persisten states and remotely influencing thereof (passing drinkz around brah)
            * password to unlock booziness?

*/

(function(window, document, $){
    window.boozy = { 
        _typingSelectors: 'textarea',
        _buttonSelectors: '.button, button, .btn',
        init: function() {
            // only initialize after the menu is loaded
            boozy._menu.init(function() {
                boozy.buttons.init();
                boozy.focus.init();
                boozy.lean.init();
                boozy.keys.init();
            });

            $('.button').click(function() {
                $('.button').removeClass('pressed');
                $(this).addClass('pressed');
            });

        },
        // all the boozy shit
        lean: {
            _leanIntervalId: undefined,
            _howDrunk: 2,
            _howFast: 2000,
            init: function() {
                var $body = $('body'),
                    transitionClass = 'transition-ease-out';
                 
                if(!$body.hasClass(transitionClass)) {
                    $body.addClass(transitionClass);
                }

                boozy.lean._goHomeYoureDrunk($body);
                boozy.lean._leanIntervalId = setInterval(function(){
                    boozy.lean._goHomeYoureDrunk($body);
                }, boozy.lean._howFast);
            },
            stop: function() {
                clearInterval(boozy.lean._leanIntervalId);
                $('body')
                    .removeClass('rotate-' + boozy.lean._howDrunk)
                    .removeClass('rotate-neg-' + boozy.lean._howDrunk);
            },
            _goHomeYoureDrunk: function($whatsThat) {
                var posRotate = 'rotate-' + boozy.lean._howDrunk,
                    negRotate = 'rotate-neg-' + boozy.lean._howDrunk;

                if($whatsThat.hasClass(posRotate)) {
                    $whatsThat
                        .removeClass(posRotate)
                        .addClass(negRotate);
                } else if($whatsThat.hasClass(negRotate)){
                    $whatsThat
                        .removeClass(negRotate)
                        .addClass(posRotate);
                } else {
                    $whatsThat.addClass(posRotate);
                }
            }
        },
        focus: {
            _focusIntervalId: undefined,
            _currentBlur: 1,
            _blurMin: 0,
            _blurMax: 6,
            _blurDirection: 'pos',
            init: function() {
                var $body = $('body');
                
                $body.addClass('transition-ease-out');

                boozy.focus._focusIntervalId = setInterval(function(){
                    boozy.focus._goHomeYoureDrunk($body);
                }, 2000);
            },
            stop: function() {
                clearInterval(boozy.focus._focusIntervalId);

                $('body').removeClass('blur-' + boozy.focus._currentBlur);

                boozy.focus._currentBlur = 1;
                boozy.focus._blurDirection = 'pos';
            },
            _boundBlur: function() {
                if(boozy.focus._currentBlur <= boozy.focus._blurMin) {
                    boozy.focus._blurDirection = 'pos';
                }
                if(boozy.focus._currentBlur >= boozy.focus._blurMax) {
                    boozy.focus._blurDirection = 'neg';
                }
            },
            _upDownBlur: function() {
                boozy.focus._boundBlur();
                var newBlur;
                if(boozy.focus._blurDirection === 'pos') {
                    newBlur = boozy.nextInt(boozy.focus._currentBlur);
                }
                if(boozy.focus._blurDirection === 'neg') {
                    newBlur = boozy.prevInt(boozy.focus._currentBlur);
                }
                boozy.focus._currentBlur =  newBlur;
                return newBlur;
            },
            _goHomeYoureDrunk: function($whatsThat) {
                var currentBlur = boozy.focus._currentBlur, 
                    blurAmount = boozy.focus._upDownBlur();
                $whatsThat
                    .removeClass('blur-' + currentBlur)
                    .addClass('blur-' + blurAmount);
            }
        },
        keys: {
            _boozyClass: 'boozy-keys',
            _abc: 'abcdefghijklmnopqrstuvwxyz'.split(''),
            _keyCounter: 0,
            _howDrunk: 3,
            _howSober: 10,
            _randomInterval: 10,
            init: function() {
                $(boozy._typingSelectors).addClass(boozy.keys._boozyClass);
                $('.boozy-keys').on('keyup.boozy-space', boozy.keys._goHomeYoureDrunk);
                boozy.keys._setRandomInterval();
            },
            _setRandomInterval: function() {
                // higher value == less drunk cause higher value lets you type more without type-o's
                boozy.keys._randomInterval = boozy.boundedRandomInterval(boozy.keys._howDrunk, boozy.keys._howSober);
            },
            _goHomeYoureDrunk: function() {
                if(boozy.keys._keyCounter == boozy.keys._randomInterval){
                    var $textField = $(this),
                        randomBurst = Math.floor((Math.random()*3)+1),
                        randomLetters = '',
                        boozyType = $textField.val();

                    for(j=0; j<randomBurst; j++) {
                        randCount = Math.floor((Math.random()*26));
                        randomLetters += boozy.keys._abc[randCount];
                    }

                    $textField.val(boozyType + randomLetters);

                    boozy.keys._setRandomInterval();
                    boozy.keys._keyCounter = 0;
                }
                boozy.keys._keyCounter ++;
            },
            stop: function() {
                $('.boozy-keys')
                    .off('keyup.boozy-space')
                    .removeClass(boozy.keys._boozyClass);
            }
        },
        buttons: {
            _boozyClass: 'boozy-buttons',
            _howDrunk: 15,
            _howFast: 250,
            _boozyNamespace:'mouseover.boozy-space',
            init: function() {
                $(boozy._buttonSelectors).addClass(boozy.buttons._boozyClass);
                $('.' + boozy.buttons._boozyClass).on(boozy.buttons._boozyNamespace, boozy.buttons._goHomeYoureDrunk);
            },
            _goHomeYoureDrunk: function() {
                var $button = $(this),
                    randSize = boozy.buttons._howDrunk,
                    moveRight = boozy.randDirection(randSize),
                    moveTop = boozy.randDirection(randSize);

                $button.animate({
                    "right": "+=" + moveRight + "px", 
                    "top": "+=" + moveTop + "px", 
                },{
                    duration: boozy.buttons._howFast
                });
            },
            stop: function() {
                $('.'+boozy.buttons._boozyClass)
                    .off(boozy.buttons._boozyNamespace)
                    .removeClass(boozy.buttons._boozyClass);
            }
        },
        // utility functions 
        boundedRandomInterval: function(min, max) {
            return Math.floor(Math.random()*(max-min+1)+min);
        },
        posNeg: function() {
            return Math.random() < 0.555555 ? -1 : 1;
        },
        randDirection: function(randSize) { 
            return boozy.posNeg() * Math.floor((Math.random()*randSize)+1);
        },
        nextInt: function(num) {
            return num + 1;
        },
        prevInt: function(num) {
            return num - 1;
        },
        // menu control rendering/event handling
        _menu: {
            init: function(callBack) {
                var $menuContainer = $('html'),
                    $boozyMenu = $('.boozy-menu');

                $menuContainer.append(boozy._menu._menuHTML.join(''));

                $('.control', $menuContainer).on('click', boozy._menu.handleControlClicks);
                $('.hide', $menuContainer).on('click', boozy._menu.handleHideClicks);
                $('.show', $menuContainer).on('click', boozy._menu.handleShowClicks);

                callBack();
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
            handleControlClicks: function(event) {
                var $control = $(this);
                boozy._menu.toggleControl($control);
            },
            toggleControl: function($control) {
                var controlId = $control.attr('id'),
                    isOn = false;
                $('.switch .option', $control).toggleClass('deactivated');
                if($('.switch .off', $control).hasClass('deactivated')) {
                    isOn = true;
                }
                boozy._menu.toggleBooziness(controlId, isOn);
            },
            toggleBooziness: function(boozyId, isOn) {
                if(isOn === true) {
                    boozy[boozyId].init();
                } else if(isOn === false) {
                    boozy[boozyId].stop();
                }
            },
            _menuHTML: [
            '<div class="boozy-menu">',
                '<h2 class="title font float-left">Boozy Browsin</h2>',
                '<div class="hide font float-right cursor-pointer">x</div>',
                '<div class="clear-both"></div>',
                '<div class="controls-container display-inline-block">',
                    '<div id="lean" class="control cursor-pointer display-inline-block">',
                        '<div class="title font float-left">',
                            'Lean',
                        '</div>',
                        '<div class="switch float-right">',
                            '<div class="on option float-left"></div>',
                            '<div class="off option float-left deactivated"></div>',
                        '</div>',
                    '</div>',
                    '<div class="clear-both"></div>',
                    '<div id="focus" class="control cursor-pointer display-inline-block">',
                        '<div class="title font float-left">',
                            'Focus',
                        '</div>',
                        '<div class="switch float-right">',
                            '<div class="on option float-left"></div>',
                            '<div class="off option float-left deactivated"></div>',
                        '</div>',
                    '</div>',
                    '<div class="clear-both"></div>',
                    '<div id="buttons" class="control cursor-pointer display-inline-block">',
                        '<div class="title font float-left">',
                            'Buttons',
                        '</div>',
                        '<div class="switch float-right">',
                            '<div class="on option float-left"></div>',
                            '<div class="off option float-left deactivated"></div>',
                        '</div>',
                    '</div>',
                    '<div class="clear-both"></div>',
                    '<div id="keys" class="control cursor-pointer display-inline-block">',
                        '<div class="title font float-left">',
                            'Keys',
                        '</div>',
                        '<div class="switch float-right">',
                            '<div class="on option float-left"></div>',
                            '<div class="off option float-left deactivated"></div>',
                        '</div>',
                    '</div>',
                    '<div class="clear-both"></div>',
                '</div>',
                '<div class="clear-both"></div>',
                '<div class="show font float-right cursor-pointer fade-out">open</div>',
            '</div>'
            ]
        }
    };

    $(document).ready(function() {
        boozy.init();     
    });

})(window, document, jQuery);
