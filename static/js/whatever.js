$(document).ready(function() {


    $('button').click(function() {
        var postDisShiz = {'wahhhhhhh': 'bahh'};
        $.ajax({
            type: 'POST',
            data: JSON.stringify(postDisShiz),
            url: 'http://logs.marie.uni.loggly.net/inputs/ac074846-eb05-4b59-b81b-3d92deac6cd6',
        });
        

    });

    
});
