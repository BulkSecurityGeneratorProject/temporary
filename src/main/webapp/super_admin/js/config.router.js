(function () {
    'use strict';

    angular.module('app')
        .run(
        ['$rootScope', '$state', '$stateParams',
            function ($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    )
        .config(
        ['$stateProvider', '$urlRouterProvider', 'JQ_CONFIG',
            function ($stateProvider, $urlRouterProvider, JQ_CONFIG) {

                $urlRouterProvider
                    .otherwise('/super_admin/manage_company/list');
                $stateProvider
                    .state('app', {
                        abstract: true,
                        url: '/super_admin',
                        templateUrl: 'tpl/app.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('js/directives/back-button.directive.js');
                                }
                            ]
                        }
                    })
                    .state('app.manageCompany', {
                        url: '/manage_company',
                        template: '<div ui-view></div>'
                    })
                    .state('app.manageCompany.add', {
                        url: '/add',
                        templateUrl: 'tpl/manage_company/add_edit.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        'js/directives/file-model.directive.js',
                                        'js/directives/click-selector.directive.js',
                                        'js/manage_company/add-edit.controller.js'
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('app.manageCompany.edit', {
                        url: '/edit/:id',
                        templateUrl: 'tpl/manage_company/add_edit.html',
                        controller: function ($stateParams) {
                            $stateParams.id
                        },
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        'js/directives/file-model.directive.js',
                                        'js/directives/click-selector.directive.js',
                                        'js/manage_company/add-edit.controller.js'
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('app.manageCompany.list', {
                        url: '/list',
                        templateUrl: 'tpl/manage_company/list.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('js/manage_company/list.controller.js');
                                }
                            ]
                        }
                    })
                    .state('app.manageCompany.outlets', {
                        url: '/outlets',
                        templateUrl: 'tpl/manage_company/outlets.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('js/manage_company/outlets.controller.js');
                                }
                            ]
                        }
                    })
                    .state('app.manageCompany.outletsAdd', {
                        url: '/outlets/add',
                        templateUrl: 'tpl/manage_company/outlets_add_edit.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('js/manage_company/outlets.add-edit.controller.js');
                                }
                            ]
                        }
                    })
                    .state('app.manageCompany.outletsEdit', {
                        url: '/outlets/:id',
                        templateUrl: 'tpl/manage_company/outlets_add_edit.html',
                        controller: function ($stateParams) {
                            $stateParams.id
                        },
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('js/manage_company/outlets.add-edit.controller.js');
                                }
                            ]
                        }
                    })
                    .state('app.manageCompany.employees', {
                        url: '/employees',
                        templateUrl: 'tpl/manage_company/employees.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('js/manage_company/employees.controller.js');
                                }
                            ]
                        }
                    })
                    .state('app.order', {
                        url: '/order',
                        templateUrl: 'tpl/order.html'
                    })
                    .state('app.productType', {
                        url: '/product_type',
                        templateUrl: 'tpl/product_type.html'
                    })
                    .state('app.taxType', {
                        url: '/tax_type',
                        templateUrl: 'tpl/tax_type.html'
                    })
                    .state('app.publicHoliday', {
                        url: '/public_holiday',
                        templateUrl: 'tpl/public_holiday.html'
                    })
                    .state('app.systemAnnouncement', {
                        url: '/system_announcement',
                        templateUrl: 'tpl/system_announcement.html'
                    })
                    .state('app.businessType', {
                        url: '/business_type',
                        templateUrl: 'tpl/business_type.html'
                    })
                    .state('app.unit', {
                        url: '/unit',
                        templateUrl: 'tpl/unit.html'
                    })
                    .state('app.paymentTerms', {
                        url: '/payment_terms',
                        templateUrl: 'tpl/payment_terms.html'
                    })
                    .state('app.eateryInvitation', {
                        url: '/eatery_invitation',
                        templateUrl: 'tpl/eatery_invitation.html'
                    })
                    .state('app.standingOrderConvertion', {
                        url: '/standing_order_convertion',
                        templateUrl: 'tpl/standing_order_convertion.html'
                    })
                    .state('app.currency', {
                        url: '/currency',
                        templateUrl: 'tpl/currency.html'
                    })
                    .state('app.deliveryLocation', {
                        url: '/delivery_location',
                        templateUrl: 'tpl/delivery_location.html'
                    })
            }
        ]
    );
})();