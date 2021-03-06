'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .run(['$rootScope', '$state', '$stateParams', '$window', 'AuthServerProvider',
        function ($rootScope, $state, $stateParams, $window, AuthServerProvider) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.$on('$stateChangeStart', function (event, next) {
                var authorizedRoles = next.data.authorizedRoles;
                if (!AuthServerProvider.hasRole(authorizedRoles)) {
                    event.preventDefault();
                    $window.location.href = '/index.html';
                }
            });
        }
    ])
    .config(['$stateProvider', '$urlRouterProvider', 'USER_ROLES',
        function ($stateProvider, $urlRouterProvider, USER_ROLES) {

            $urlRouterProvider
                .otherwise('/supplier/overview');
            $stateProvider
                .state('app', {
                    abstract: true,
                    url: '/supplier',
                    templateUrl: 'templates/app.html',
                    data: {
                        authorizedRoles: [USER_ROLES.supplier, USER_ROLES.supplierAdmin]
                    }
                })
                .state('app.overview', {
                    url: '/overview',
                    templateUrl: 'templates/overview.html'
                })
                .state('app.order', {
                    url: '/order',
                    templateUrl: 'templates/order.html'
                })
                .state('app.standingOrder', {
                    url: '/standing_order',
                    templateUrl: 'templates/standing_order.html'
                })
                .state('app.paymentSchedule', {
                    url: '/payment_schedule',
                    templateUrl: 'templates/payment_schedule.html'
                })
                .state('app.deliverySchedule', {
                    url: '/delivery_schedule',
                    templateUrl: 'templates/delivery_schedule.html'
                })
                .state('app.customer', {
                    url: '/customer',
                    templateUrl: 'templates/customer.html'
                })
                .state('app.product', {
                    url: '/product',
                    template: '<div ui-view></div>'
                })
                .state('app.product.list', {
                    url: '/list',
                    templateUrl: 'templates/product/list.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'js/product/unit.factory.js',
                                    'js/product/product.factory.js',
                                    'js/product/product.controller.js'
                                ]);
                            }
                        ]
                    }
                })
                .state('app.product.categorization', {
                    url: '/categorization',
                    templateUrl: 'templates/product/categorization.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'js/product/product.uncategorized.factory.js',
                                    'js/product/category.factory.js',
                                    'js/product/product.category.controller.js'
                                ]);
                            }
                        ]
                    }
                })
                .state('app.product.uncategorized', {
                    url: '/uncategorized',
                    templateUrl: 'templates/product/uncategorized.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'js/product/product.uncategorized.factory.js',
                                    'js/product/category.factory.js',
                                    'js/product/product.factory.js',
                                    'js/product/product.uncategorized.controller.js'
                                ]);
                            }
                        ]
                    }
                })
                .state('app.product.add', {
                    url: '/viewone/:id',
                    templateUrl: 'templates/product/viewone.html',
                    controller: function ($stateParams) {
                        $stateParams.id
                    },
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'js/product/product.factory.js',
                                    'js/product/unit.factory.js',
                                    'js/product/category.factory.js',
                                    'js/product/subcategory.factory.js',
                                    'js/product/product.customers.factory.js',
                                    'js/product/product.viewone.controller.js',
                                    'js/product/product.viewone.pricing.controller.js',
                                    'js/product/product.viewone.customers.controller.js',
                                    '/js/services/file-upload.service.js',
                                    'js/pricing/pricing-groups.factory.js'
                                ]);
                            }
                        ]
                    }
                })

                .state('app.pricingProductTable', {
                    url: '/pricing/product_table',
                    templateUrl: 'templates/pricing/pricing.product-table.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    '/js/directives/ng-enter.directive.js',
                                    'js/pricing/pricing-groups.factory.js',
                                    'js/pricing/pricing.product-table.factory.js',
                                    'js/pricing/pricing.product-table.controller.js'
                                ]);
                            }
                        ]
                    }
                })
                .state('app.pricingPriceGroup', {
                    url: '/pricing/price_group',
                    templateUrl: 'templates/pricing/pricing.price-group.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    '/js/directives/ng-enter.directive.js',
                                    'js/pricing/pricing-groups.factory.js',
                                    'js/pricing/pricing.eatery.factory.js',
                                    'js/pricing/pricing.price-group.controller.js'
                                ]);
                            }
                        ]
                    }
                })
                .state('app.setting', {
                    url: '/setting',
                    templateUrl: 'templates/setting.html'
                })
                .state('app.personalProfile', {
                    url: '/personal_profile',
                    templateUrl: 'templates/personal_profile.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    '/js/services/file-upload.service.js',
                                    'js/personal_profile/users.factory.js',
                                    'js/personal_profile/personal-profile.controller.js'
                                ]);
                            }
                        ]
                    }
                })
                .state('app.activityLog', {
                    url: '/activity_log',
                    templateUrl: 'templates/activity_log.html'
                })
                .state('app.dashboard', {
                    url: '/dashboard',
                    templateUrl: 'templates/admin/dashboard.html'
                })
                .state('app.inquiry', {
                    url: '/inquiry',
                    templateUrl: 'templates/admin/inquiry/inquiry.html',
                    data: {
                        authorizedRoles: [USER_ROLES.supplierAdmin]
                    },
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'js/inquiry/inquiry.factory.js',
                                    'js/inquiry/inquiry.reply.factory.js',
                                    'js/inquiry/payment.factory.js',
                                    'js/inquiry/pricing-groups.factory.js',
                                    'js/inquiry/team.factory.js',
                                    'js/inquiry/inquiry.controller.js'
                                ]);
                            }
                        ]
                    }
                })
                .state('app.companySettings', {
                    url: '/company_settings',
                    templateUrl: 'templates/company_settings/company.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'js/company_settings/company.factory.js'
                                ]);
                            }
                        ]
                    }   ,
                    data: {
                        authorizedRoles: [USER_ROLES.supplierAdmin]
                    }
                })
                .state('app.companySettings.profile', {
                    url: '/profile',
                    templateUrl: 'templates/company_settings/company.profile.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    '/js/services/file-upload.service.js',
                                    'js/company_settings/company.profile.controller.js'
                                ]);
                            }
                        ]
                    }  ,
                    data: {
                        authorizedRoles: [USER_ROLES.supplierAdmin]
                    }
                })
                .state('app.companySettings.publicHoliday', {
                    url: '/profile',
                    templateUrl: 'templates/company_settings/public_holiday.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'js/company_settings/public-holiday.factory.js',
                                    'js/company_settings/company.public-holiday.controller.js'
                                ]);
                            }
                        ]
                    },
                    data: {
                        authorizedRoles: [USER_ROLES.supplierAdmin]
                    }
                })
                .state('app.companySettings.offDays', {
                    url: '/profile',
                    templateUrl: 'templates/company_settings/off_days.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'js/company_settings/off-day.factory.js',
                                    'js/company_settings/company.off-days.controller.js',
                                    'js/company_settings/company.off-days.create.controller.js'
                                ]);
                            }
                        ]
                    },
                    data: {
                        authorizedRoles: [USER_ROLES.supplierAdmin]
                    }
                })
                .state('app.companySettings.deliveryDays', {
                    url: '/profile',
                    templateUrl: 'templates/company_settings/area_delivery.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'js/company_settings/company.area-delivery.controller.js'
                                ]);
                            }
                        ]
                    },
                    data: {
                        authorizedRoles: [USER_ROLES.supplierAdmin]
                    }
                })
                .state('app.companySettings.deliveryTiming', {
                    url: '/profile',
                    templateUrl: 'templates/company_settings/order_timing.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'js/company_settings/company.order-timing.controller.js'
                                ]);
                            }
                        ]
                    },
                    data: {
                        authorizedRoles: [USER_ROLES.supplierAdmin]
                    }
                })
                .state('app.teamMember', {
                    url: '/team_member',
                    templateUrl: 'templates/admin/team_member/team_members.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'js/team_member/team.factory.js',
                                    '../js/account.factory.js',
                                    'js/team_member/team-member.controller.js'
                                ]);
                            }
                        ]
                    },
                    data: {
                        authorizedRoles: [USER_ROLES.supplierAdmin]
                    }
                })
                .state('app.teamMemberAdd', {
                    url: '/team_member/add',
                    templateUrl: 'templates/admin/team_member/team_member_add_edit.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'js/team_member/team.factory.js',
                                    'js/team_member/member.factory.js',
                                    'js/team_member/team-member-add-edit.controller.js'
                                ]);
                            }
                        ]
                    },
                    data: {
                        authorizedRoles: [USER_ROLES.supplierAdmin]
                    }
                })
                .state('app.teamMemberEdit', {
                    url: '/team_member/edit/:id',
                    templateUrl: 'templates/admin/team_member/team_member_add_edit.html',
                    controller: function ($stateParams) {
                        $stateParams.id
                    },
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'js/team_member/team.factory.js',
                                    'js/team_member/member.factory.js',
                                    'js/team_member/team-member-add-edit.controller.js'
                                ]);
                            }
                        ]
                    },
                    data: {
                        authorizedRoles: [USER_ROLES.supplierAdmin]
                    }
                })
                .state('app.teamMemberCustomers', {
                    url: '/team_member/:id/customers',
                    templateUrl: 'templates/admin/team_member/customers.html',
                    controller: function ($stateParams) {
                        $stateParams.id
                    },
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'js/team_member/customers.factory.js',
                                    'js/team_member/team-member.customers.controller.js'
                                ]);
                            }
                        ]
                    },
                    data: {
                        authorizedRoles: [USER_ROLES.supplierAdmin]
                    }
                });
        }
    ]
);
