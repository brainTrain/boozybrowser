/*

    usage:
    ====
        var bb = new BoozyBrowser();

        bb.setBooziness("sober | buzzed | drunk | wooo | blackout");

        bb.setBoozyTypes(["lean", "focus", "keys", "buttons"]);

        bb.removeBoozyTypes(["lean", "focus", "keys", "buttons"]);

        bb.setBoozySelectors({
            "keys": "textarea, input, [role='input'], [role='textarea']",   
            "buttons": ".button, button, .btn, [role='button']",
            "lean": "body",
            "focus": "body",
            "replace": false | true // optional: replace current selectors, defautlts to false
        });

        bb.start();
        bb.stop();

        bb.stop('lean');
        bb.start('lean');
*/

(function($){
    window.BoozyBrowser = function() {
        this.setBooziness("sober"); 
        this.setBoozyTypes(["lean", "focus", "keys", "buttons"]);
        this.setBoozySelectors({
            "keys": "textarea, input, [role='input'], [role='textarea']",   
            "buttons": ".button, button, .btn, [role='button']",
            "lean": "body",
            "focus": "body",
            "replace": true 
        });

    };

    // utility functions 
    BoozyBrowser.someMaths = {
        boundedRandomInterval: function(min, max) {
            return Math.floor(Math.random()*(max-min+1)+min);
        },
        posNeg: function() {
            return Math.random() < 0.555555 ? -1 : 1;
        },
        randDirection: function(randSize) { 
            return this.posNeg() * Math.floor((Math.random()*randSize)+1);
        }
    };

    BoozyBrowser.prototype = {
        constructor: BoozyBrowser,
        setBooziness: function(drunkLevel) {
            this.drunkLevel = drunkLevel; 
        },
        setBoozyTypes: function(boozyTypes) {
            // allow people to pass in a single string if they like
            if(Array.isArray(boozyTypes)) {
                this.boozyTypes = boozyTypes;
            } else {
                this.boozyTypes = [boozyTypes];
            }
        },
        removeBoozyTypes: function(boozyTypes) {
        },
        setBoozySelectors: function(selectorObject) {
            for(var key in selectorObject) {
                // don't want to iterate on the replace option
                if(selectorObject.hasOwnProperty(key) && key !== 'replace') {
                    if(selectorObject.replace === true) {
                        this[key]._selectors = selectorObject[key];
                    } else {
                        // make sure to handle case where selector is empty
                        if(!this[key]._selectors) {
                            this[key]._selectors = selectorObject[key];
                        } else {
                            this[key]._selectors += ', ' + selectorObject[key];
                        }
                    }
                }
            }
        },
        start: function(boozyType) {
            if(boozyType) {
                this[boozyType].start(this.drunkLevel);
            } else {
                var boozyTypes = this.boozyTypes;
                for(var i = 0, len = boozyTypes.length; i < len; i++) {
                    this[boozyTypes[i]].start(this.drunkLevel);
                }
            }
        },
        stop: function(boozyType) {
            if(boozyType) {
                this[boozyType].stop();
            } else {
                var boozyTypes = this.boozyTypes;
                for(var i = 0, len = boozyTypes.length; i < len; i++) {
                    this[boozyTypes[i]].stop();
                }
            }
        },
        lean: {
            _leanIntervalId: undefined,
            _transitionClass: 'transition-ease-out',
            start: function(drunkLevel) {
                var lean = this,
                    $page = $(lean._selectors);

                // ensure we've cleaned up after ourselves before we start
                lean.stop();
                lean._setBooziness(drunkLevel);

                if(!$page.hasClass(lean._transitionClass)) {
                    $page.addClass(lean._transitionClass);
                }
                if(!$page.hasClass('hardware-acceleration')) {
                    $page.addClass('hardware-acceleration');
                }

                lean._goHomeYoureDrunk($page);
                lean._leanIntervalId = setInterval(function() {
                    lean._goHomeYoureDrunk($page);
                }, lean._howFast);
            },
            stop: function() {
                var lean = this;
                clearInterval(lean._leanIntervalId);
                $(lean._selectors)
                    .removeClass('rotate-' + lean._howDrunk)
                    .removeClass('rotate-neg-' + lean._howDrunk)
                    .removeClass('hardware-acceleration');
            },
            _setBooziness: function(drunkLevel) {
                var lean = this;

                if(drunkLevel === 'buzzed') {
                    lean._howDrunk = 1;
                    lean._howFast = 2000;

                } else if (drunkLevel === 'im-fine') {
                    lean._howDrunk = 2;
                    lean._howFast = 2000;

                } else if (drunkLevel === 'drunk') {
                    lean._howDrunk = 3;
                    lean._howFast = 2000;

                } else if (drunkLevel === 'wooo') {
                    lean._howDrunk = 4;
                    lean._howFast = 2000;

                } else if (drunkLevel === 'blackout') {
                    lean._howDrunk = 5;
                    lean._howFast = 2000;

                }
            },
            _goHomeYoureDrunk: function($whatsThat) {
                var lean = this,
                    posRotate = 'rotate-' + lean._howDrunk,
                    negRotate = 'rotate-neg-' + lean._howDrunk;

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
            _transitionClass: 'transition-ease-out',
            _soberClass: 'blur-0',
            _focusIntervalId: undefined,
            _focusTimeoutId: undefined,
            start: function(drunkLevel) {
                var focus = this, 
                    $page = $(focus._selectors);
                // ensure we've cleaned up after ourselves before we start 
                focus.stop();
                focus._setBooziness(drunkLevel);

                window.$page = $page;

                if(!$page.hasClass(focus._transitionClass)) {
                    $page.addClass(focus._transitionClass);
                }
                
                focus._focusIntervalId = setInterval(function(){
                    focus._goHomeYoureDrunk($page);
                }, focus._displayInterval);
            },
            stop: function() {
                var focus = this;

                clearInterval(focus._focusIntervalId);
                clearInterval(focus._focusTimeoutId);

                $(focus._selectors)
                    .removeClass(focus._soberClass)
                    .removeClass(focus._drunkClass);
            },
            _setBooziness: function(drunkLevel) {
                var focus = this;

                if(drunkLevel === 'buzzed') {
                    focus._drunkClass = 'blur-2';
                    focus._drunkTransitionClass = 'buzzed-transition';
                    focus._displayTimeout = BoozyBrowser.someMaths.boundedRandomInterval(600, 900);
                    focus._displayInterval = BoozyBrowser.someMaths.boundedRandomInterval(10000, 60000);

                } else if (drunkLevel === 'im-fine') {
                    focus._drunkClass = 'blur-3';
                    focus._drunkTransitionClass = 'im-fine-transition';
                    focus._displayTimeout = BoozyBrowser.someMaths.boundedRandomInterval(600, 1100);
                    focus._displayInterval = BoozyBrowser.someMaths.boundedRandomInterval(10000, 40000);

                } else if (drunkLevel === 'drunk') {
                    focus._drunkClass = 'blur-4';
                    focus._drunkTransitionClass = 'drunk-transition';
                    focus._displayTimeout = BoozyBrowser.someMaths.boundedRandomInterval(1500, 2000);
                    focus._displayInterval = BoozyBrowser.someMaths.boundedRandomInterval(8000, 10000);

                } else if (drunkLevel === 'wooo') {
                    focus._drunkClass = 'blur-5';
                    focus._drunkTransitionClass = 'wooo-transition';
                    focus._displayTimeout = BoozyBrowser.someMaths.boundedRandomInterval(2000, 3000);
                    focus._displayInterval = BoozyBrowser.someMaths.boundedRandomInterval(5000, 7000);

                } else if (drunkLevel === 'blackout') {
                    focus._drunkClass = 'blur-6';
                    focus._drunkTransitionClass = 'blackout-transition';
                    focus._displayTimeout = BoozyBrowser.someMaths.boundedRandomInterval(3000, 4000);
                    focus._displayInterval = BoozyBrowser.someMaths.boundedRandomInterval(4000, 6000);
                }
            },
            _goHomeYoureDrunk: function($whatsThat) {
                var focus = this;

                $whatsThat
                    .removeClass(focus._soberClass)
                    .addClass(focus._drunkClass);

                focus._focusTimeoutId = setTimeout(function(){
                    $whatsThat
                        .removeClass(focus._drunkClass)
                        .addClass(focus._soberClass);
                }, focus._displayTimeout);
            }
        },
        keys: {
            _abc: 'abcdefghijklmnopqrstuvwxyz'.split(''),
            _boozySpace: 'keyup.boozy-space',
            _keyCounter: 0,
            _randomInterval: 10,
            start: function(drunkLevel) {
                var keys = this;
                // ensure we've cleaned up after ourselves before we start
                keys.stop();
                keys._setBooziness(drunkLevel);

                $(keys._selectors)
                    .on(keys._boozySpace, {"keys": keys}, keys._goHomeYoureDrunk);

                keys._setRandomInterval();
            },
            _setBooziness: function(drunkLevel) {
                var keys = this;

                if(drunkLevel === 'buzzed') {
                    keys._howDrunk = 50;
                    keys._howSober = 80;

                } else if (drunkLevel === 'im-fine') {
                    keys._howDrunk = 30;
                    keys._howSober = 40;

                } else if (drunkLevel === 'drunk') {
                    keys._howDrunk = 20;
                    keys._howSober = 30;

                } else if (drunkLevel === 'wooo') {
                    keys._howDrunk = 15;
                    keys._howSober = 25;

                } else if (drunkLevel === 'blackout') {
                    keys._howDrunk = 8;
                    keys._howSober = 14;

                }
            },
            _setRandomInterval: function() {
                var keys = this;

                // higher value == less drunk cause higher value lets you type more without type-o's
                keys._randomInterval = BoozyBrowser.someMaths.boundedRandomInterval(keys._howDrunk, keys._howSober);
            },
            _goHomeYoureDrunk: function(event) {
                var keys = event.data.keys;

                if(keys._keyCounter == keys._randomInterval){
                    var $textField = $(this),
                        randomBurst = Math.floor((Math.random()*3)+1),
                        randomLetters = '',
                        boozyType = $textField.val();

                    for(j=0; j<randomBurst; j++) {
                        randCount = Math.floor((Math.random()*26));
                        randomLetters += keys._abc[randCount];
                    }

                    $textField.val(boozyType + randomLetters);

                    keys._setRandomInterval();
                    keys._keyCounter = 0;
                }
                keys._keyCounter ++;
            },
            stop: function() {
                var keys = this;
                $(keys._selectors).off(keys._boozyNamespace);
            }
        },
        buttons: {
            _boozyNamespace:'mouseover.boozy-space',
            start: function(drunkLevel) {
                var buttons = this;
                // ensure we've cleaned up after ourselves before we start
                buttons.stop();
                buttons._setBooziness(drunkLevel);

                $(buttons._selectors)
                    .on(buttons._boozyNamespace, {"buttons": buttons}, buttons._goHomeYoureDrunk);
            },
            _setBooziness: function(drunkLevel) {
                var buttons = this;

                if(drunkLevel === 'buzzed') {
                    buttons._howDrunk = 0;
                    buttons._howFast = 250;

                } else if (drunkLevel === 'im-fine') {
                    buttons._howDrunk = 2;
                    buttons._howFast = 250;

                } else if (drunkLevel === 'drunk') {
                    buttons._howDrunk = 15;
                    buttons._howFast = 250;

                } else if (drunkLevel === 'wooo') {
                    buttons._howDrunk = 25;
                    buttons._howFast = 250;

                } else if (drunkLevel === 'blackout') {
                    buttons._howDrunk = 140;
                    buttons._howFast = 350;

                }
            },
            _goHomeYoureDrunk: function(event) {
                var buttons = event.data.buttons, 
                    $button = $(this),
                    randSize = buttons._howDrunk,
                    moveLeft = BoozyBrowser.someMaths.randDirection(randSize),
                    moveTop = BoozyBrowser.someMaths.randDirection(randSize),
                    animationOffset, animationTop, animationLeft;

                $button
                    .animate({
                        "left": "+=" + moveLeft + "px", 
                        "top": "+=" + moveTop + "px", 
                    },{
                        duration: buttons._howFast,
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
                                        duration: buttons._howFast
                                    });
                            }
                            if(animationLeft < 0) {
                                $button
                                    .animate({
                                        "left": "5px", 
                                        "top": moveTop + "px", 
                                    },{
                                        duration: buttons._howFast
                                    });
                            }
                        }
                    });
            },
            stop: function() {
                var buttons = this;
                $(buttons._selectors)
                    .off(buttons._boozyNamespace);
            }
        }
    };

})(jQuery);
