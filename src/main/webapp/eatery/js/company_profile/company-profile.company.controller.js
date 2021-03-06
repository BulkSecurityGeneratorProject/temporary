(function () {
    'use strict';

    app.controller('CompanyProfileCompanyController', CompanyProfileCompanyController);

    CompanyProfileCompanyController
        .$inject = [
        '$scope',
        'toaster',
        'AuthServerProvider',
        'CompanyFactory',
        'FileUploadService'
    ];

    function CompanyProfileCompanyController($scope, toaster, AuthServerProvider, CompanyFactory, FileUploadService) {
        var master = {};
        $scope.company = {
            eateryDetails: {
                topRightPicture: {}
            }
        };
        $scope.logo = {};
        $scope.optionalImage = {};

        $scope.saveCompany = saveCompany;
        $scope.uploadPhoto = uploadPhoto;
        $scope.uploadOptionalImage = uploadOptionalImage;
        $scope.removePhoto = removePhoto;
        $scope.removeOptionalImage = removeOptionalImage;
        $scope.revert = revert;

        activate();

        function activate() {
            AuthServerProvider.updateUserInfo()
                .then(function () {
                    $scope.company = angular.copy(AuthServerProvider.currentUser().company);
                    master = angular.copy(AuthServerProvider.currentUser().company);
                },
                function (e) {
                    toaster.pop('error', 'Error', 'Problems with getting company');
                });
        }

        function saveCompany() {
            CompanyFactory.update($scope.company,
                function (data) {
                    toaster.pop('success', 'Success', 'Company saved');
                    activate();
                }, function (e) {
                    console.error(e);
                    toaster.pop('error', 'Error', 'Please try again');
                });
        }

        function uploadPhoto(image) {
            if ($scope.logo && image.length > 0) {
                FileUploadService.uploadFileToUrl(image[0])
                    .then(function (response) {
                        $scope.company.logo = {
                            title: image[0].name,
                            url: response.data.path
                        };
                    });
            }
        }

        function removePhoto() {
            $scope.company.logo = {
                title: 'logo_placeholder',
                url: '/logo_placeholder.png'
            };
        }

        function uploadOptionalImage(image) {
            if ($scope.optionalImage && image.length > 0) {
                FileUploadService.uploadFileToUrl(image[0])
                    .then(function (response) {
                        $scope.company.eateryDetails.topRightPicture = {
                            title: image[0].name,
                            url: response.data.path
                        };
                    });
            }
        }

        function removeOptionalImage() {
            $scope.company.eateryDetails.topRightPicture = {
                title: 'logo_placeholder',
                url: '/logo_placeholder.png'
            };
        }

        function revert() {
            $scope.company = master;
        }

    }
})();
