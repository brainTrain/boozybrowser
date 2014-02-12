(function(window, document, $){
    window.boozy = { 
        _typingSelectors: 'textarea',
        _buttonSelectors: '.button, button, .btn',
        init: function() {
            // only initialize after the menu is loaded
            boozy._menu.init(function() {
                boozy.keys.init();
                boozy.buttons.init();
                boozy.focus.init();
                boozy.lean.init();
            });

            $('.button').click(function() {
                $('.button').removeClass('pressed');
                $(this).addClass('pressed');
            });

        },
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
                $('.hide', $menu).toggleClass('fade-out');
                $('.show', $menu).toggleClass('fade-out');
            },
            handleShowClicks: function(event) {
                var $menu = $('.boozy-menu');
                $menu.removeClass('hide-menu');

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
        },
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
        lean: {
            _leanIntervalId: undefined,
            init: function() {
                var $body = $('body'),
                    transitionClass = 'transition-ease-out';
                 
                if(!$body.hasClass(transitionClass)) {
                    $body.addClass(transitionClass);
                }

                boozy.lean._goHomeYoureDrunk($body);
                boozy.lean._leanIntervalId = setInterval(function(){
                    boozy.lean._goHomeYoureDrunk($body);
                }, 2000);
            },
            stop: function() {
                clearInterval(boozy.lean._leanIntervalId);
                $('body')
                    .removeClass('rotate-2')
                    .removeClass('rotate-neg-2')
                    .addClass('rotate-0')
            },
            _goHomeYoureDrunk: function($whatsThat) {
                if($whatsThat.hasClass('rotate-2')) {
                    $whatsThat
                        .removeClass('rotate-2')
                        .addClass('rotate-neg-2');
                } else if($whatsThat.hasClass('rotate-neg-2')){
                    $whatsThat
                        .removeClass('rotate-neg-2')
                        .addClass('rotate-2');
                } else {
                    $whatsThat.addClass('rotate-2');
                }
            }
        },
        focus: {
            _focusIntervalId: undefined,
            _currentBlur: 1,
            _blurMin: 1,
            _blurMax: 2,
            _blurDirection: 'pos',
            init: function() {
                var $body = $('body');
                
                $body.addClass('transition-ease-out');

                boozy.focus._blurMin = 0;
                boozy.focus._blurMax = 6;
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
            abc: 'abcdefghijklmnopqrstuvwxyz'.split(''),
            keyCounter: 0,
            howDrunk: 3,
            howSober: 10,
            randomInterval: 10,
            init: function() {
                $(boozy._typingSelectors).addClass(boozy.keys._boozyClass);
                $('.boozy-keys').on('keyup.boozy-space', boozy.keys._goHomeYoureDrunk);
                boozy.keys.setRandomInterval();
            },
            setRandomInterval: function() {
                boozy.keys.randomInterval = boozy.boundedRandomInterval(boozy.keys.howDrunk, boozy.keys.howSober);
            },
            _goHomeYoureDrunk: function() {
                if(boozy.keys.keyCounter == boozy.keys.randomInterval){
                    var $textField = $(this),
                        randomBurst = Math.floor((Math.random()*3)+1),
                        randomLetters = '',
                        boozyType = $textField.val();

                    for(j=0; j<randomBurst; j++) {
                        randCount = Math.floor((Math.random()*26));
                        randomLetters += boozy.keys.abc[randCount];
                    }
                    var newBoozyType = boozyType + randomLetters; 
                    $textField.val(newBoozyType);

                    boozy.keys.setRandomInterval();
                    boozy.keys.keyCounter = 0;
                }
                boozy.keys.keyCounter ++;
            },
            stop: function() {
                $('.boozy-keys')
                    .off('keyup.boozy-space')
                    .removeClass(boozy.keys._boozyClass);
            }
        },
        buttons: {
            _boozyClass: 'boozy-buttons',
            init: function() {
                $(boozy._buttonSelectors).addClass(boozy.buttons._boozyClass);
                $('.boozy-buttons').on('mouseover.boozy-space', boozy.buttons._goHomeYoureDrunk);
            },
            _goHomeYoureDrunk: function() {
                var $button = $(this),
                    randSize = 15;

                if($button.attr('id') == 'submit') {
                    randSize = 85;
                }

                $button.animate({
                    "right": "+=" + boozy.randDirection(randSize) + "px", 
                    "top": "+=" + boozy.randDirection(randSize) + "px", 
                },{
                    duration: 250,
                });
            },
            stop: function() {
                $('.boozy-buttons')
                    .off('mouseover.boozy-space')
                    .removeClass(boozy.buttons._boozyClass);
            }
        }
    };

    $(document).ready(function() {
        boozy.init();     
    });

})(window, document, jQuery);
