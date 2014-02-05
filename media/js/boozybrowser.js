(function(window, document, $){
    window.boozy = { 
        init: function() {
            $('.button').click(function() {
                $('.button').removeClass('pressed');
                $(this).addClass('pressed');
            });

            boozy.keys.init();
            boozy.buttons.init();
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
