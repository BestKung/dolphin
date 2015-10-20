angular.module('lot', []);
angular.module('lot').controller('lotController', function ($scope, $http) {

    $scope.lot = {};
    $scope.lots = {};
    $scope.employees = {};
    $scope.lotDelete = {};

    loadLot();
    function loadLot() {
        $http.get('/loadlot').success(function (data) {
            $scope.lots = data;
        }).error(function (data) {
        });
    }

    loadEmployees();
    function loadEmployees() {
        $http.get('/staffs').success(function (data) {
            $scope.employees = data;
            $scope.lot.nameStaffReam = data.content[0];
        });
    }

    $scope.saveLot = function () {
        $scope.lot.nameStaffReam = $scope.lot.nameStaffReam.nameTh;
        $http.post('/savelot', $scope.lot).success(function (data) {
            loadLot();
            loadEmployees();
            $scope.lot = {};
            Materialize.toast('saveข้อมูลเรียบร้อย', 3000, 'rounded');
        }).error(function (data) {
        });
    };

    $scope.clearData = function () {
        $scope.lot = {};
        $('#namedepartment').removeClass('active'); // ให้ namedepartment เด้งลง
    };

    $scope.actionDelete = function (lo) {
        $scope.lotDelete = lo;
        $('#modal-delete').openModal({dismissible: false});
    };

    $scope.deleteLot = function () {
        $http.post('/deletelot', $scope.lotDelete).success(function (data) {
            loadLot();
            loadEmployees();
            $scope.lot = {};
        }).error(function (data) {
        });
    };

    $scope.updateLot = function (lo) {
        
        $scope.lot.id = lo.id;
        $scope.lot.nameStaffReam = lo.nameStaffReam;
        $scope.lot.dateIn = new Date(lo.dateIn);
        $scope.lot.dateOut = new Date(lo.dateOut);
        $('#namedepartment1').addClass('active');
        $('#namedepartment2').addClass('active');
        $('body,html').animate({scrollTop: 0}, "600");
    };

    $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 200,
        format: 'yyyy-mm-dd',
        container: 'body'
    });

});


