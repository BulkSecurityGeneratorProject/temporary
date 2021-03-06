(function() {
    'use strict';

    app.factory('OutletsFactory', OutletsFactory);

    OutletsFactory
        .$inject = [
        '$resource'
    ];

    function OutletsFactory($resource) {
        return $resource('/api/outlets', {}, {
            'update': {
                method: 'PUT'
            }
        });
    }

})();
