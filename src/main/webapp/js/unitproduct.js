angular.module('unitProduct', []);
angular.module('unitProduct').controller('unitProductController', function ($scope, $http) {

    $scope.unitProduct = {};
    $scope.unitProducts = {};

    $scope.row = 10;
    $scope.page = 0;
    $scope.currentPage = 1;
    var totalPage = 0;
    var totalList = 0;

    loadUnitProduct();
    function loadUnitProduct() {
        $http.get('/loadunitproduct', {params: {page: $scope.page, size: $scope.row}}).success(function (data) {
            $scope.unitProducts = data;
        }).error(function (data) {
        });
    }

    $scope.saveUnitProduct = function () {
        $http.post('/saveunitproduct', $scope.unitProduct).success(function (data) {
            loadUnitProduct();
            $scope.unitProduct = {};
            getTotalList();
            Materialize.toast('saveข้อมูลเรียบร้อย', 3000, 'rounded');
        }).error(function (data) {

        });
    };

    $scope.clearData = function () {
        $scope.unitProduct = {};
        $('#namedepartment').removeClass('active'); // ให้ namedepartment เด้งลง
    };


    $scope.actionDelete = function (up) {
        $scope.unitProduct = up;
        $('#modal-delete').openModal({dismissible: false});
    };

    $scope.deleteUnitProduct = function () {
        $http.post('/deleteunitproduct', $scope.unitProduct).success(function (data) {
            loadUnitProduct();
            $scope.unitProduct = {};
            getTotalList();
            $scope.firstPage();
        }).error(function (data) {

        });
    };

    $scope.updateUnitProduct = function (up) {
        $scope.unitProduct.id = up.id;
        $scope.unitProduct.name = up.name;
        $('#namedepartment').addClass('active');
        $('body,html').animate({scrollTop: 0}, "600");
    };

    // pagegin
    $scope.selectGetOrSearch = function () {
        loadUnitProduct();
        getTotalList();
        $scope.firstPage();
        if (totalPage >= $scope.currentPage) {
            $('#next-page').removeClass('disabled');
            $('#final-page').removeClass('disabled');
        }
    };

    getTotalList();
    function getTotalList() {
        $http.get('/totalunitproduct').success(function (data) {
            totalList = data;
            totalPages();
        });
    }

    function totalPages() {
        var totalPages = parseInt(totalList / $scope.row);
        if ((totalList % $scope.row) !== 0) {  //บรรทัดนี้ทำงาน ถ้าค่ามากกว่าจำนวนหน้า แต่ไม่เต็มอีกหน้า ให้บวกอีกหน้า
            totalPages++;
        }

        totalPage = totalPages;

        if ($scope.currentPage === 1) {
            $('#first-page').addClass('disabled');
            $('#pre-page').addClass('disabled');
        }
        if ($scope.currentPage === totalPage) {
            $('#next-page').addClass('disabled');
            $('#final-page').addClass('disabled');
        }
        if ($scope.currentPage < totalPage && $scope.currentPage > 1) {
            $('#first-page').removeClass('disabled');
            $('#pre-page').removeClass('disabled');
            $('#next-page').removeClass('disabled');
            $('#final-page').removeClass('disabled');
        }
    }

    $scope.firstPage = function () {
        if (!$('#first-page').hasClass('disabled')) {
            $scope.page = 0;
            loadUnitProduct();
            $scope.currentPage = 1;
            $('#first-page').addClass('disabled');
            $('#pre-page').addClass('disabled');
            $('#next-page').removeClass('disabled');
            $('#final-page').removeClass('disabled');
        }
    };
    $scope.finalPage = function () {
        if (!$('#final-page').hasClass('disabled')) {
            $scope.page = totalPage - 1;
            loadUnitProduct();
            $scope.currentPage = totalPage;
            $('#first-page').removeClass('disabled');
            $('#pre-page').removeClass('disabled');
            $('#next-page').addClass('disabled');
            $('#final-page').addClass('disabled');
        }
    };

    $scope.prePage = function () {
        if (!$('#first-page').hasClass('disabled')) {
            $scope.page--;
            loadUnitProduct();
            $scope.currentPage = $scope.page + 1;
            if ($scope.page === 0) {
                $('#first-page').addClass('disabled');
                $('#pre-page').addClass('disabled');
            }
            $('#next-page').removeClass('disabled');
            $('#final-page').removeClass('disabled');
        }
    };

    $scope.nextPage = function () {
        if (!$('#final-page').hasClass('disabled')) {
            $scope.page++;
            loadUnitProduct();
            $scope.currentPage = $scope.page + 1;
            if ($scope.page === totalPage - 1) {
                $('#next-page').addClass('disabled');
                $('#final-page').addClass('disabled');
            }
            $('#first-page').removeClass('disabled');
            $('#pre-page').removeClass('disabled');
        }

    };


});


