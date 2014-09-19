angular.module('bar.controllers', [])
    .controller('bar', function($scope){ 
        // init dat drunk object if we don't already have it
        window.$scope = $scope;
        $scope.boozyObject = new BoozyBrowser();

        $scope.selectTypes = angular.copy($scope.boozyObject.boozyTypes);
        $scope.selectTypes.unshift('bulk');

        $scope.currentDrunkLevel = $scope.boozyObject.drunkLevel;
        $scope.browserStates = ['sober', 'buzzed', 'im-fine', 'drunk', 'wooo', 'blackout'];
        $scope.boozyStates = ['buzzed', 'im-fine', 'drunk', 'wooo', 'blackout'];

        $scope.changeDropDown = function(selectType){
            console.log('selectType');
            console.log(selectType);
        };

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
            if(drunkObject.controlId === 'bulk') {
                // change them all
                angular.forEach($scope.boozyObject.boozyTypes, function(value, index){
                    $scope.howDrunk({
                        'controlId': value,
                        'drunkLevel': drunkObject.drunkLevel
                    });
                });
            } else {
                if(drunkObject.drunkLevel === 'sober') {
                    // be sober
                    $scope.boozyObject.setBooziness(drunkObject.drunkLevel);
                    $scope.boozyObject.stop(drunkObject.controlId);
                } else if(_.contains($scope.boozyStates, drunkObject.drunkLevel)) {
                    // be drunk
                    $scope.boozyObject.setBooziness(drunkObject.drunkLevel);
                    $scope.boozyObject.start(drunkObject.controlId);
                }
                // updates view for currentDrunkLevel
                $scope.currentDrunkLevel = drunkObject.drunkLevel;
                $scope.$apply();
            }
        };
    });
