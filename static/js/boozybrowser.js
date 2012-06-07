$(document).ready(function() {


    var req = new XMLHttpRequest();
    req.open('GET', document.location, false);req.send(null);var headers = 
    req.getAllResponseHeaders().toLowerCase();
    console.log(headers); 

    $('.button').click(function() {
        $('.button').removeClass('pressed');
        $(this).addClass('pressed');
    });

    //for(j=0; 
    var abc = 'abcdefghijklmnopqrstuv'.split('');
    var keyCounter = 0;
    
    var randomInterval = Math.floor((Math.random()*17)+8);

    $('.typin textarea').keyup(function(event) {

        if(keyCounter == randomInterval ){
            var randomBurst = Math.floor((Math.random()*3)+1);
            var randomLetters = '';

            for(j=0; j<randomBurst; j++) {
                randCount = Math.floor((Math.random()*22));
                randomLetters += abc[randCount];
            }

            var boozyType = $(this).val();
            var newBoozyType = boozyType + randomLetters; 
            $(this).val(newBoozyType);

            randomInterval = Math.floor((Math.random()*17)+8);
            keyCounter = 0;
        }
        
        keyCounter ++;
    });

    var clickWin = 0;

    var clickWhatev = 0;
    var clickLol = 0;
    var clickSub = 0;

    $('*').click(function() {
        var clickClass = $(this).attr('click-message'); 
        $('#bottom').html(clickClass);
    });

    $('*').mouseover(function() {
        var randSize = 15;

        if( $(this).attr('id') == 'submit') {
            randSize = 85;
        } 

        var randNegSpeed = Math.random() < 0.555555 ? -1 : 1;
        var randNegRight = Math.random() < 0.555555 ? -1 : 1;
        var randNegLeft = Math.random() < 0.555555 ? -1 : 1;
        var randNegTop = Math.random() < 0.555555 ? -1 : 1;
        var randNegBottom = Math.random() < 0.555555 ? -1 : 1;

        var randSpeed = randNegSpeed * Math.floor((Math.random()*10)+1);
        var randRight = randNegRight * Math.floor((Math.random()*randSize)+1);
        var randLeft = randNegLeft * Math.floor((Math.random()*randSize)+1);
        var randTop = randNegTop * Math.floor((Math.random()*randSize)+1);
        var randBottom = randNegBottom * Math.floor((Math.random()*randSize)+1);

        $(this).animate({
            "right": "+=" + randRight + "px", 
            "left": "+=" + randLeft + "px", 
            "top": "+=" + randTop + "px", 
            "bottom": "+=" + randBottom + "px"
            }, 
            {
                duration: 250,
            });
            
            var offsetVar = $(this).offset();

    });
    
});
