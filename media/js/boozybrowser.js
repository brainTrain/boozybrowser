(function(window, document, $){
    window.boozy = { 
        init: function() {
            $('.button').click(function() {
                $('.button').removeClass('pressed');
                $(this).addClass('pressed');
            });

            boozy.keys.init();
            boozy.buttons.init();
            boozy.focus.init();
            boozy.lean.init();
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
            _blurIntervalId: undefined,
            _currentBlur: 1,
            _blurMin: 1,
            _blurMax: 2,
            _blurDirection: 'pos',
            init: function() {
                var $body = $('body');
                
                $body.addClass('transition-ease-out');

                boozy.focus._blurMin = 0;
                boozy.focus._blurMax = 6;
                boozy.focus._blurIntervalId = setInterval(function(){
                    boozy.focus._goHomeYoureDrunk($body);
                }, 2000);
            },
            stop: function() {
                clearInterval(boozy.focus._focusIntervalId);
                $('body')
                    .removeClass('blur-' + boozy.focus._currentBlur)
                    .addClass('blur-0');
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
            init: function() {
                $('.typin textarea').keyup(boozy.keys.typer);
                boozy.keys.setRandomInterval();
            },
            abc: 'abcdefghijklmnopqrstuvwxyz'.split(''),
            keyCounter: 0,
            howDrunk: 3,
            howSober: 10,
            randomInterval: 10,
            setRandomInterval: function() {
                boozy.keys.randomInterval = boozy.boundedRandomInterval(boozy.keys.howDrunk, boozy.keys.howSober);
            },
            typer: function() {
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
            }
        },
        buttons: {
            init: function() {
                $('.button, button, .btn').mouseover(boozy.buttons.boozyMotions);
            },
            boozyMotions: function() {
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
            }
        }
    };

    $(document).ready(function() {
        boozy.init();     
    });

})(window, document, jQuery);
