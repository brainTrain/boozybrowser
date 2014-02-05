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
        _posNeg: function() {
            return Math.random() < 0.555555 ? -1 : 1;
        },
        _randDirection: function(randSize) { 
            return boozy._posNeg() * Math.floor((Math.random()*randSize)+1);
        },
        buttons: function() {
            var $buttons = $('.button, button, .btn');
            $buttons.mouseover(function() {
                var $button = $(this),
                    randSize = 15;

                if($button.attr('id') == 'submit') {
                    randSize = 85;
                } 

                $button.animate({
                    "right": "+=" + boozy._randDirection(randSize) + "px", 
                    "top": "+=" + boozy._randDirection(randSize) + "px", 
                },{
                    duration: 250,
                });
            });
        }
    };

    $(document).ready(function() {
        boozy.init();     
    });
})(window, document, jQuery);
