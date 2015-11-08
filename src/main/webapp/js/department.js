angular.module('department', []);
angular.module('department').controller('departmentController', function ($scope, $http) {
    $('.modal-trigger').leanModal();
    $scope.departments = {};
    $scope.department = {};
    $scope.depqrtmentUpdate = {};
    checkMobile();
    function  checkMobile() {
                var $mobile = $(window).outerWidth() < 995;
                if ($mobile) {
                   $('.table-department').removeAttr('style');
                }
            }

    $scope.saveDepartment = function () {
        $http.post('/savedepartment', $scope.department)
                .success(function (data) {
                    getDepartment();
                    $scope.department = {};
                }).error(function (data) {
            $('body,html').animate({scrollTop: 0}, "600");
        });
    };

    $scope.clearData = function () {
        $scope.department = {};
         $('#namedepartment').removeClass('active');
     };
    getDepartment();
    function getDepartment() {
        $http.get('/getdepartment')
                .success(function (data) {
                    $scope.departments = data;
                }).error(function (data) {

        });
    }

    $scope.actionDelete = function (dep) {
        $scope.department = dep;
        $('#modal-delete').openModal({dismissible: false});
    };

    $scope.actionUpdate = function (dep) {
        $('body,html').animate({scrollTop: 0}, "600");
         $scope.department.id = dep.id;
         $scope.department.name = dep.name;
        $('#namedepartment').addClass('active');
     };

    $scope.deleteDepartment = function () {
        $http.post('/deletedepartment', $scope.department)
                .success(function (data) {
                    getDepartment();
                    $scope.department = {};
                }).error(function (data) {

        });
    };
});