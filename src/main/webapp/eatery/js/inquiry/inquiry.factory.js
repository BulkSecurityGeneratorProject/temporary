(function() {
    'use strict';

    app.factory('InquiryFactory', InquiryFactory);

    InquiryFactory
        .$inject = [
        '$resource'
    ];

    function InquiryFactory($resource) {
        return $resource('/api/inquirys/:id', {}, {
            'query': {
                method: 'GET',
                isArray: true
            },
            'update': {
                method: 'PUT'
            }
        });
    }

})();
