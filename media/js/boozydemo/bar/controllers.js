angular.module('bar.controllers', [])
    .controller('bar', function($scope){ 
        $scope.drinkUp = function(drink) {
            console.log('drink up');
            console.log(drink);
            window.drank = drink;
            console.log(drink.intoxicant);
            if(drink.intoxicant === 'booze') {
                var currentIndex = soBoozy._drunkLevels.indexOf(soBoozy._currentDrunkLevel), 
                    nextLevel = currentIndex + 1 >= soBoozy._drunkLevels.length ? 'blackout' : soBoozy._drunkLevels[currentIndex + 1];
                console.log(currentIndex);
                soBoozy._howDrunk({
                    'controlId': 'bulk',
                    'drunkLevel': nextLevel 
                });
            } else if(drink.intoxicant === 'caffine') {
                var currentIndex = soBoozy._drunkLevels.indexOf(soBoozy._currentDrunkLevel), 
                    nextLevel = currentIndex <= 0 ? 'sober' : soBoozy._drunkLevels[currentIndex - 1];
                console.log(currentIndex);
                soBoozy._howDrunk({
                    'controlId': 'bulk',
                    'drunkLevel': nextLevel
                });

            }

        };
    });
