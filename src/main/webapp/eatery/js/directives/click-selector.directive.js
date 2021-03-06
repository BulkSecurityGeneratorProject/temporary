angular.module('app')
    .directive('clickSelector', clickSelector);

function clickSelector() {
    return {
        restrict: 'A',
        
        link: function(scope, element, attrs) {
            element.on('click', function() {
                scope.$apply(function() {
                    $(attrs.clickSelector).click();
                });
            });
        }
    }
}
