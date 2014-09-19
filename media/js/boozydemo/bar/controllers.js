angular.module('bar.controllers', [])
    .controller('bar', function($scope){ 

        $scope.currentDrunkLevel = 'sober';
        $scope.browserStates = ['sober', 'buzzed', 'im-fine', 'drunk', 'wooo', 'blackout'];
        $scope.boozyStates = ['buzzed', 'im-fine', 'drunk', 'wooo', 'blackout'];

        $scope.drinkUp = function(drink) {
            if(drink.intoxicant === 'booze') {
                var currentIndex = $scope.browserStates.indexOf($scope.currentDrunkLevel), 
                    nextLevel = currentIndex + 1 >= $scope.browserStates.length ? 'blackout' : $scope.browserStates[currentIndex + 1];
                $scope.howDrunk({
                    'controlId': 'bulk',
                    'drunkLevel': nextLevel 
                });
            } else if(drink.intoxicant === 'caffine') {
                var currentIndex = $scope.browserStates.indexOf($scope.currentDrunkLevel), 
                    nextLevel = currentIndex <= 0 ? 'sober' : $scope.browserStates[currentIndex - 1];

                $scope.howDrunk({
                    'controlId': 'bulk',
                    'drunkLevel': nextLevel
                });

            }

        };

        $scope.howDrunk = function(drunkObject) {
            if(!$scope.boozyObject) {
                $scope.boozyObject = new BoozyBrowser();
            }
            if(drunkObject.controlId === 'bulk') {
                // change them all
                angular.forEach($scope.boozyObject.boozyTypes, function(value, index){
                    $scope.howDrunk({
                        'controlId': value,
                        'drunkLevel': drunkObject.drunkLevel
                    });
                });
            } else if(drunkObject.drunkLevel === 'sober') {
                // be sober
                $scope.boozyObject.setBooziness(drunkObject.drunkLevel);
                $scope.boozyObject.stop(drunkObject.controlId);
                // updates view for currentDrunkLevel
                $scope.currentDrunkLevel = drunkObject.drunkLevel;
                $scope.$apply();
            } else if(_.contains($scope.boozyStates, drunkObject.drunkLevel)) {
                // be drunk
                $scope.boozyObject.setBooziness(drunkObject.drunkLevel);
                $scope.boozyObject.start(drunkObject.controlId);
                // updates view for currentDrunkLevel
                $scope.currentDrunkLevel = drunkObject.drunkLevel;
                $scope.$apply();
            }
        };
    });
