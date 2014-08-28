(function(window, document, $){
    boozy = { 
        _typingSelectors: 'textarea, input, [role="input"], [role="textarea"]',
        _buttonSelectors: '.button, button, .btn, [role="button"]',
        _pageSelectors: 'body',
        _notDrunk: 'sober',
        _drunkLevels: ['buzzed', 'im-fine', 'drunk', 'wooo', 'blackout'],
        init: function() {
            chrome.runtime.onMessage.addListener(function(drunkObject, sender, sendResponse) {
                    boozy._setHowDrunk(drunkObject);
                    sendResponse({howDrunk: drunkObject.drunkLevel});
            });
        },
        _setHowDrunk: function(drunkObject) {
            if(drunkObject && drunkObject.controlId !== 'bulk') {
                if(drunkObject.drunkLevel === boozy._notDrunk) {
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
                        if(!$page.hasClass('hardware-acceleration')) {
                            $page.addClass('hardware-acceleration');
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
                    .removeClass('rotate-neg-' + boozy.lean._howDrunk)
                    .removeClass('hardware-acceleration');
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
            _focusTimeoutId: undefined,
            _displayInterval: 5000,
            _displayTimeout: 200,
            _drunkTransitionClass: '',
            _drunkClass: '',
            _soberClass: 'blur-0',
            _currentBlur: 0,
            _blurMin: 0,
            _blurMax: 1,
            start: function(drunkLevel) {
                // ensure we've cleaned up after ourselves before we start 
                boozy.focus.stop();
                boozy.focus._setBooziness(drunkLevel, function(ready) {
                    if(ready === true) {
                        var $page = $(boozy._pageSelectors);

                        if(!$page.hasClass(boozy.lean._transitionClass)) {
                            $page.addClass(boozy.lean._transitionClass);
                        }
                        
                        boozy.focus._focusIntervalId = setInterval(function(){
                            boozy.focus._goHomeYoureDrunk($page);
                        }, boozy.focus._displayInterval);
                    }
                });
            },
            stop: function() {
                clearInterval(boozy.focus._focusIntervalId);
                clearInterval(boozy.focus._focusTimeoutId);

                $(boozy._pageSelectors)
                    .removeClass(boozy.focus._transitionClass)
                    .removeClass(boozy.focus._soberClass)
                    .removeClass(boozy.focus._drunkClass);
            },
            _setBooziness: function(drunkLevel, ready) {
                var isOption = _.contains(boozy._drunkLevels, drunkLevel);
                if(isOption) {
                    if(drunkLevel === 'buzzed') {
                        boozy.focus._drunkClass = 'blur-2';
                        boozy.focus._drunkTransitionClass = 'buzzed-transition';
                        boozy.focus._displayTimeout = boozy.boundedRandomInterval(600, 900);
                        boozy.focus._displayInterval = boozy.boundedRandomInterval(10000, 60000);

                    } else if (drunkLevel === 'im-fine') {
                        boozy.focus._drunkClass = 'blur-3';
                        boozy.focus._drunkTransitionClass = 'im-fine-transition';
                        boozy.focus._displayTimeout = boozy.boundedRandomInterval(600, 1100);
                        boozy.focus._displayInterval = boozy.boundedRandomInterval(10000, 40000);

                    } else if (drunkLevel === 'drunk') {
                        boozy.focus._drunkClass = 'blur-4';
                        boozy.focus._drunkTransitionClass = 'drunk-transition';
                        boozy.focus._displayTimeout = boozy.boundedRandomInterval(1500, 2000);
                        boozy.focus._displayInterval = boozy.boundedRandomInterval(8000, 10000);

                    } else if (drunkLevel === 'wooo') {
                        boozy.focus._drunkClass = 'blur-5';
                        boozy.focus._drunkTransitionClass = 'wooo-transition';
                        boozy.focus._displayTimeout = boozy.boundedRandomInterval(2000, 3000);
                        boozy.focus._displayInterval = boozy.boundedRandomInterval(5000, 7000);

                    } else if (drunkLevel === 'blackout') {
                        boozy.focus._drunkClass = 'blur-6';
                        boozy.focus._drunkTransitionClass = 'blackout-transition';
                        boozy.focus._displayTimeout = boozy.boundedRandomInterval(3000, 4000);
                        boozy.focus._displayInterval = boozy.boundedRandomInterval(4000, 6000);
                    }
                    ready(isOption);
                }
            },
            _goHomeYoureDrunk: function($whatsThat) {
                $whatsThat
                    .removeClass(boozy.focus._soberClass)
                    .addClass(boozy.focus._drunkClass);
                boozy.focus._focusTimeoutId = setTimeout(function(){
                    $whatsThat
                        .removeClass(boozy.focus._drunkClass)
                        .addClass(boozy.focus._soberClass);
                }, boozy.focus._displayTimeout);
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
                        boozy.buttons._howDrunk = 140;
                        boozy.buttons._howFast = 350;

                    }
                    ready(isOption);
                }
            },
            _goHomeYoureDrunk: function() {
                var $button = $(this),
                    randSize = boozy.buttons._howDrunk,
                    moveLeft = boozy.randDirection(randSize),
                    moveTop = boozy.randDirection(randSize),
                    animationOffset, animationTop, animationLeft;
                window.$button = $button;
                $button
                    .animate({
                        "left": "+=" + moveLeft + "px", 
                        "top": "+=" + moveTop + "px", 
                    },{
                        duration: boozy.buttons._howFast,
                        complete: function() {
                            // if buttons leave the clickable region 
                            // of a page bounce 'em right back! (only top/left)
                            animationOffset = $button.offset(); 
                            animationTop = animationOffset.top;
                            animationLeft = animationOffset.left;
                            if(animationTop < 0) {
                                $button
                                    .animate({
                                        "left": moveLeft + "px", 
                                        "top": "5px", 
                                    },{
                                        duration: boozy.buttons._howFast
                                    });
                            }
                            if(animationLeft < 0) {
                                $button
                                    .animate({
                                        "left": "5px", 
                                        "top": moveTop + "px", 
                                    },{
                                        duration: boozy.buttons._howFast
                                    });
                            }
                        }
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
        }
    };
    // don't want document ready with content script
    boozy.init();     

})(window, document, jQuery);
