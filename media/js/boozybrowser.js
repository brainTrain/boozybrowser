(function(window, document, $){
    var boozy = { 
        init: function() {
            $('.button').click(function() {
                $('.button').removeClass('pressed');
                $(this).addClass('pressed');
            });

            boozy.keys();
            boozy.buttons();

        },
        abc: 'abcdefghijklmnopqrstuvwxyz'.split(''),
        keys: function() {
            var keyCounter = 0,
                randomInterval = Math.floor((Math.random()*17)+8);
            $('.typin textarea').keyup(function(event) {

                if(keyCounter == randomInterval){
                    var $textField = $(this),
                        randomBurst = Math.floor((Math.random()*3)+1),
                        randomLetters = '',
                        boozyType = $textField.val();

                    for(j=0; j<randomBurst; j++) {
                        randCount = Math.floor((Math.random()*26));
                        randomLetters += boozy.abc[randCount];
                    }

                    var newBoozyType = boozyType + randomLetters; 
                    $textField.val(newBoozyType);

                    randomInterval = Math.floor((Math.random()*17)+8);
                    keyCounter = 0;
                }
                
                keyCounter ++;
            });
        },
        buttons: function() {
            window.$buttons = $('.button, button, .btn');
            console.log(window.$buttons);
            window.$buttons.mouseover(function() {
                var $button = $(this),
                    randSize = 15;

                if($button.attr('id') == 'submit') {
                    randSize = 85;
                } 
                // negative
                var randNegSpeed = Math.random() < 0.555555 ? -1 : 1,
                    randNegRight = Math.random() < 0.555555 ? -1 : 1,
                    randNegLeft = Math.random() < 0.555555 ? -1 : 1,
                    randNegTop = Math.random() < 0.555555 ? -1 : 1,
                    randNegBottom = Math.random() < 0.555555 ? -1 : 1,
                // positive 
                    randSpeed = randNegSpeed * Math.floor((Math.random()*10)+1),
                    randRight = randNegRight * Math.floor((Math.random()*randSize)+1),
                    randLeft = randNegLeft * Math.floor((Math.random()*randSize)+1),
                    randTop = randNegTop * Math.floor((Math.random()*randSize)+1),
                    randBottom = randNegBottom * Math.floor((Math.random()*randSize)+1);




                $button.animate({
                    "right": "+=" + randRight + "px", 
                    "left": "+=" + randLeft + "px", 
                    "top": "+=" + randTop + "px", 
                    "bottom": "+=" + randBottom + "px"
                }, {
                    duration: 250,
                });
            });
        }
    };

    $(document).ready(function() {
        boozy.init();     
    });
})(window, document, jQuery);
