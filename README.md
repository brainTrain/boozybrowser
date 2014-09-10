# boozybrowser
_This is just about teaching the internet how to drink._
<a href="http://www.boozybrowser.com" target="_blank">Check Out The Demo</a>

## (tech spec I guess)
### example usage!! \o/ 
``` JavaScript
// init boozy object, brah!
var bb = new BoozyBrowser();
// choose a string to set booziness, default will be sober
// NOTE: re-setting booziness will trigger a start/stop for all 
//       boozy functions
bb.setBooziness("sober | buzzed | drunk | wooo | blackout");
// pass in an array (or single string if you're just doin one)
// defaults to all
bb.setBoozyTypes(["lean", "focus", "keys", "buttons"]);
// alternatively you can remove boozy types from the array after the fact 
// NOTE: removing boozy type will stop that functions boozy shenanigans 
// (double NOTE: only for lean and focus for some reason :/)
bb.removeBoozyTypes(["lean", "focus", "keys", "buttons"]);
// set selectors and whether they should be additive or just replace, 
// below are the current default selectors
bb.setBoozySelectors({
    "keys": "textarea, input, [role='input'], [role='textarea']",   
    "buttons": ".button, button, .btn, [role='button']",
    "lean": "body",
    "focus": "body",
    "replace": false | true // optional: replace current selectors, defautlts to false
});
// start all boozy functions
bb.start();
// stop all boozy functions
bb.stop();
// or start/stop individual functions
bb.stop('lean');
bb.start('lean');
``` 

### known issues (prolly more to come)
* the keys function doesn't work in fake text boxes like seen on twitter, need to come up with a smart way to handle both normal and abnormal text input types
* stopping is broken with buttons and keys for some reason :(
