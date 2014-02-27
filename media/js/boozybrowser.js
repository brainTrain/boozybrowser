/*
    Let's treat this spot kinda like jira... listing my TODO's

    -- drunk classifications --
        * sober: everything off
        * buzzed: slightly noticible
            - keys: slight type-o's (so slight the user might think it's their type-o)
            - buttons: very slight motion.. noticible but very much usuable (buttons should stay within their region desite number of hovers)
            - lean: no lean
            - focus: no focus
        * I'm fine: definitely noticiable but not annoying 
            - keys: noticible type-o's (user should now noticed but still not really be annoyed by them)
            - buttons: noticible motion.. still usable but close to annoying
            - lean: very slight intermittent lean.. kinda like small flashes of rolls
            - focus: very slight intermittent blurring in and out.. not enough to prevent reading and slight enough that most may not notice
        * drunk: annoying but useful
            - keys: type-o's are now impossible to ignore and happen in seemingly every word
            - buttons: quite dynamic motion, should border on frustrating, perhaps random keys are more difficult to chase down than others
            - lean: lean should be in full effect, the page should sway back and forth constantly but not by too much
            - focus: focus now throbs in and out.  The max blur should still be fairly  readable
        * wooo!: holy shit I can barely use this webpage
            - keys: type-o's should happen with every word, in fact a fair number of words should have more than one injected type-o
            - buttons: buttons should now be close to impossible to click.. perhaps some random buttons are easier to click
            - lean: the sway should be constant and quite large.. the user should be getting sea sick at this point
            - focus: focus should throb in and out, with the max blur being impossible to read
        * blackout drunk: completely unusable (black sceen? no.... hmm)

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
        _howDrunk: function(drunkObject) {
            if(drunkObject) {
                if(drunkObject.controlId === 'bulk') {
                    // change them all
                    $('.boozy-menu .drunk-level.single-control').val(drunkObject.drunkLevel).change()
                } else if(drunkObject.drunkLevel === boozy._notDrunk) {
                    // be sober
                    boozy[drunkObject.controlId].stop();
                } else if(_.contains(boozy._drunkLevels, drunkObject.drunkLevel)) {
                    // be drunk
                    boozy[drunkObject.controlId].start(drunkObject.drunkLevel);
                }
                // I am god! (lol #ihtw)
            }
        },
        /*
            Lean:
            ====
        */
        lean: {
            _leanIntervalId: undefined,
            _transitionClass: 'transition-ease-out',
            _howDrunk: 2,
            _howFast: 2000,
            start: function(drunkLevel) {
                // ensure we've cleaned up after ourselves before we start
                boozy.lean.stop();
                boozy.lean._setBooziness(drunkLevel, function(ready) {
                    if(ready === true) {
                        var $page = $(boozy._pageSelectors);
                         
                        if(!$page.hasClass(boozy.lean._transitionClass)) {
                            $page.addClass(boozy.lean._transitionClass);
                        }

                        boozy.lean._goHomeYoureDrunk($page);
                        boozy.lean._leanIntervalId = setInterval(function() {
                            boozy.lean._goHomeYoureDrunk($page);
                        }, boozy.lean._howFast);
                    }
                });
            },
            stop: function() {
                clearInterval(boozy.lean._leanIntervalId);
                $(boozy._pageSelectors)
                    .removeClass('rotate-' + boozy.lean._howDrunk)
                    .removeClass('rotate-neg-' + boozy.lean._howDrunk);
            },
            _setBooziness: function(drunkLevel, ready) {
                var isOption = _.contains(boozy._drunkLevels, drunkLevel);
                if(isOption) {
                    if(drunkLevel === 'buzzed') {
                        boozy.lean._howDrunk = 1;
                        boozy.lean._howFast = 2000;

                    } else if (drunkLevel === 'im-fine') {
                        boozy.lean._howDrunk = 2;
                        boozy.lean._howFast = 2000;

                    } else if (drunkLevel === 'drunk') {
                        boozy.lean._howDrunk = 3;
                        boozy.lean._howFast = 2000;

                    } else if (drunkLevel === 'wooo') {
                        boozy.lean._howDrunk = 4;
                        boozy.lean._howFast = 2000;

                    } else if (drunkLevel === 'blackout') {
                        boozy.lean._howDrunk = 5;
                        boozy.lean._howFast = 2000;

                    }
                    ready(isOption);
                }
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
        /*
            Focus:
            =====
        */
        focus: {
            _focusIntervalId: undefined,
            _transitionClass: 'transition-ease-out',
            _currentBlur: 0,
            _blurMin: 0,
            _blurMax: 1,
            _blurDirection: 'pos',
            start: function(drunkLevel) {
                // ensure we've cleaned up after ourselves before we start 
                boozy.focus.stop();
                boozy.focus._setBooziness(drunkLevel, function(ready) {
                    if(ready === true) {
                        var $page = $(boozy._pageSelectors);
                        
                        $page.addClass(boozy.focus._transitionClass);

                        boozy.focus._focusIntervalId = setInterval(function(){
                            boozy.focus._goHomeYoureDrunk($page);
                        }, 2000);
                    }
                });
            },
            stop: function() {
                clearInterval(boozy.focus._focusIntervalId);

                $(boozy._pageSelectors)
                    .removeClass('blur-' + boozy.focus._currentBlur);

                boozy.focus._currentBlur = 1;
                boozy.focus._blurDirection = 'pos';
            },
            _setBooziness: function(drunkLevel, ready) {
                var isOption = _.contains(boozy._drunkLevels, drunkLevel);
                if(isOption) {
                    if(drunkLevel === 'buzzed') {
                        boozy.focus._blurMin = 0;
                        boozy.focus._blurMax = 1;

                    } else if (drunkLevel === 'im-fine') {
                        boozy.focus._blurMin = 0;
                        boozy.focus._blurMax = 2;

                    } else if (drunkLevel === 'drunk') {
                        boozy.focus._blurMin = 0;
                        boozy.focus._blurMax = 4;

                    } else if (drunkLevel === 'wooo') {
                        boozy.focus._blurMin = 0;
                        boozy.focus._blurMax = 5;

                    } else if (drunkLevel === 'blackout') {
                        boozy.focus._blurMin = 0;
                        boozy.focus._blurMax = 6;

                    }
                    ready(isOption);
                }
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
        /*
            Keys:
            ====
        */
        keys: {
            _abc: 'abcdefghijklmnopqrstuvwxyz'.split(''),
            _boozySpace: 'keyup.boozy-space',
            _keyCounter: 0,
            _howDrunk: 3,
            _howSober: 10,
            _randomInterval: 10,
            start: function(drunkLevel) {
                // ensure we've cleaned up after ourselves before we start
                boozy.keys.stop();
                boozy.keys._setBooziness(drunkLevel, function(ready) {
                    if(ready === true) {
                        $(boozy._typingSelectors)
                            .on(boozy.keys._boozySpace, boozy.keys._goHomeYoureDrunk);
                        boozy.keys._setRandomInterval();
                    }
                });
            },
            _setBooziness: function(drunkLevel, ready) {
                var isOption = _.contains(boozy._drunkLevels, drunkLevel);
                if(isOption) {
                    if(drunkLevel === 'buzzed') {
                        boozy.keys._howDrunk = 50;
                        boozy.keys._howSober = 80;

                    } else if (drunkLevel === 'im-fine') {
                        boozy.keys._howDrunk = 30;
                        boozy.keys._howSober = 40;

                    } else if (drunkLevel === 'drunk') {
                        boozy.keys._howDrunk = 20;
                        boozy.keys._howSober = 30;

                    } else if (drunkLevel === 'wooo') {
                        boozy.keys._howDrunk = 15;
                        boozy.keys._howSober = 25;

                    } else if (drunkLevel === 'blackout') {
                        boozy.keys._howDrunk = 8;
                        boozy.keys._howSober = 14;

                    }
                    ready(isOption);
                }
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
                $(boozy._typingSelectors).off(boozy.keys._boozyNamespace);
            }
        },
        /*
            Buttons:
            =======
        */
        buttons: {
            _howDrunk: 15,
            _howFast: 250,
            _boozyNamespace:'mouseover.boozy-space',
            start: function(drunkLevel) {
                // ensure we've cleaned up after ourselves before we start
                boozy.buttons.stop();
                boozy.buttons._setBooziness(drunkLevel, function(ready){
                    if(ready === true) {
                        $(boozy._buttonSelectors)
                            .on(boozy.buttons._boozyNamespace, boozy.buttons._goHomeYoureDrunk);
                    }
                });
            },
            _setBooziness: function(drunkLevel, ready) {
                var isOption = _.contains(boozy._drunkLevels, drunkLevel); 
                if(isOption) {
                    if(drunkLevel === 'buzzed') {
                        boozy.buttons._howDrunk = 0;
                        boozy.buttons._howFast = 250;

                    } else if (drunkLevel === 'im-fine') {
                        boozy.buttons._howDrunk = 2;
                        boozy.buttons._howFast = 250;

                    } else if (drunkLevel === 'drunk') {
                        boozy.buttons._howDrunk = 15;
                        boozy.buttons._howFast = 250;

                    } else if (drunkLevel === 'wooo') {
                        boozy.buttons._howDrunk = 25;
                        boozy.buttons._howFast = 250;

                    } else if (drunkLevel === 'blackout') {
                        boozy.buttons._howDrunk = 40;
                        boozy.buttons._howFast = 250;

                    }
                    ready(isOption);
                }
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
                $(boozy._buttonSelectors)
                    .off(boozy.buttons._boozyNamespace);
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

})(window, document, jQuery);
