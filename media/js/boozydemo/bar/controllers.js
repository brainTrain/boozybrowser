angular.module('bar.controllers', [])
    .controller('bar', function($scope){ 
        window.$scope = $scope;

        // init dat drunk object if we don't already have it
        $scope.boozyObject = new BoozyBrowser();

        $scope.selectTypes = angular.copy($scope.boozyObject.boozyTypes);
        $scope.selectTypes.unshift('bulk');

        $scope.browserStates = ['sober', 'buzzed', 'im-fine', 'drunk', 'wooo', 'blackout'];
        $scope.boozyStates = ['buzzed', 'im-fine', 'drunk', 'wooo', 'blackout'];

        $scope.currentDrunkLevel = {};
        angular.forEach($scope.selectTypes, function(value, index){
            var modelName = value;
            $scope[modelName] = $scope.boozyObject.drunkLevel;
            //$scope.currentDrunkLevel[value] = $scope.boozyObject.drunkLevel;
        });

        // sets bulk or individual drunken states from advanced menu (select drop downs)
        $scope.changeDropDown = function(selectType, currentDrunkLevel){
            $scope.intoxicate({
                'controlId': selectType,
                'drunkLevel': currentDrunkLevel
            });
        };
        // set bulk drunk states from bar menu (click/drag drink icons)
        $scope.drinkUp = function(drink) {
            if(drink.intoxicant === 'booze') {
                var currentIndex = $scope.browserStates.indexOf($scope.currentDrunkLevel['bulk']), 
                    nextLevel = currentIndex + 1 >= $scope.browserStates.length ? 'blackout' : $scope.browserStates[currentIndex + 1];
                $scope.intoxicate({
                    'controlId': 'bulk',
                    'drunkLevel': nextLevel 
                });
            } else if(drink.intoxicant === 'caffine') {
                var currentIndex = $scope.browserStates.indexOf($scope.currentDrunkLevel['bulk']), 
                    nextLevel = currentIndex <= 0 ? 'sober' : $scope.browserStates[currentIndex - 1];

                $scope.intoxicate({
                    'controlId': 'bulk',
                    'drunkLevel': nextLevel
                });

            }

        };

        $scope.intoxicate = function(drunkObject) {
            if(drunkObject.controlId === 'bulk') {
                // change them all
                angular.forEach($scope.boozyObject.boozyTypes, function(value, index){
                    $scope.intoxicate({
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
                //$scope.$apply();
            }
            $scope.currentDrunkLevel[drunkObject.controlId] = drunkObject.drunkLevel;
            console.log('$scope.currentDrunkLevel');
            console.log($scope.currentDrunkLevel);
            console.log('drunkObject');
            console.log(drunkObject);
        };
    });
