angular.module('lot', []);
angular.module('lot').controller('lotController', function ($scope, $http) {

    $scope.lot = {};
    $scope.lot.nameStaffReam = "";
    $scope.lots = {};
    $scope.employees = {};
    $scope.lotDelete = {};
    $scope.nameStream = "";
// pageginEmployee
    $scope.rowEmployee = 10;
    $scope.pageEmployee = 0;
    $scope.currentPageEmployee = 0;
    var totalPageEmployee = 0;
    var totalListEmployee = 0;
    $scope.searchDataEmployee = {};
    $scope.searchDataEmployee.keyword = "";
//===========================================================================================

    loadLot();
    function loadLot() {
        $http.get('/loadlot').success(function (data) {
            $scope.lots = data;
        }).error(function (data) {
        });
    }

    function loadEmployees() {
        $http.get('/loademployee', {params: {page: $scope.pageEmployee, size: $scope.rowEmployee}}).success(function (data) {
            $scope.employees = data;
        });
    }

    $scope.saveLot = function () {
        $scope.lot.nameStaffReam = $scope.nameStream;
        $http.post('/savelot', $scope.lot).success(function (data) {
            loadLot();
            $scope.lot = {};
            $scope.nameStream = "";
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
            $scope.lot = {};
        }).error(function (data) {
        });
    };

    $scope.updateLot = function (lo) {
        $scope.lot = lo;
        console.log(lo.nameStaffReam);
        $scope.lot.dateIn = new Date(lo.dateIn);
        $scope.lot.dateOut = new Date(lo.dateOut);
        console.log(lo);
        $scope.nameStream = lo.nameStaffReam;
        $('#label-nameStaffReam').addClass('active');
        $('#prefix-appointment-employee').css('color', '#00bcd4');
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

    $scope.clickEmployee = function () {
        $('#modal-employee').openModal();
        loadEmployees();
        getTotalList();
    };

    $scope.selectEmployee = function (emp) {
        $scope.nameStream = emp.nameTh;
        console.log($scope.lot.nameStaffReam);
        $('#modal-employee').closeModal();
        $('#label-nameStaffReam').addClass('active');
        $('#prefix-appointment-employee').css('color', '#00bcd4');
    };

// pageginEmployee
    $scope.searcDataContent = function () {
        $scope.pageEmployee = 0;
        $scope.currentPageEmployee = $scope.pageEmployee + 1;
        searcDataContent();
    };

    function searcDataContent() {
        $http.post('/loademployee/searchemployee', $scope.searchDataEmployee, {params: {page: $scope.pageEmployee, size: $scope.rowEmployee}}).success(function (data) {
            $scope.employees = data;
            countSearch();
        });
    }

    function countSearch() {
        $http.post('/countsearchemployee', $scope.searchDataEmployee).success(function (data) {
            totalListEmployee = data;
            totalPages();
        });
    }

    function selectGetOrSearch() {
        if (!!$scope.searchData.keyword) {
            searcDataContent();
        }
        else {
            loadEmployees();
        }
    }

    function getTotalList() {
        $http.get('/tatallemployee').success(function (data) {
            totalListEmployee = data;
            totalPages();
        });
    }

    function totalPages() {
        var totalPages = parseInt(totalListEmployee / $scope.rowEmployee);
        console.log(totalListEmployee + "tatal");
        if ((totalListEmployee % $scope.rowEmployee) !== 0) {  //บรรทัดนี้ทำงาน ถ้าค่ามากกว่าจำนวนหน้า แต่ไม่เต็มอีกหน้า ให้บวกอีกหน้า
            totalPages++;
        }
        totalPageEmployee = totalPages;
        console.log(totalPageEmployee);
        if ($scope.currentPageEmployee === 0) {
            $('#first-page-employee').addClass('disabled');
            $('#pre-page-employee').addClass('disabled');
            $('#next-page-employee').removeClass('disabled');
            $('#final-page-employee').removeClass('disabled');
            console.log('1..........');
        }
        if ($scope.currentPageEmployee === totalPageEmployee - 1) {
            $('#next-page').addClass('disabled');
            $('#final-page').addClass('disabled');
            $('#first-page').removeClass('disabled');
            $('#pre-page').removeClass('disabled');
            console.log('2');
        }
        if ($scope.currentPageEmployee === 0 && $scope.currentPageEmployee === totalPageEmployee - 1) {
            $('#next-page-employee').addClass('disabled');
            $('#final-page-employee').addClass('disabled');
            $('#first-page-employee').addClass('disabled');
            $('#pre-page-employee').addClass('disabled');
        }
        if ($scope.currentPageEmployee < totalPageEmployee - 1 && $scope.currentPageEmployee > 0) {
            $('#first-page-employee').removeClass('disabled');
            $('#pre-page-employee').removeClass('disabled');
            $('#next-page-employee').removeClass('disabled');
            $('#final-page-employee').removeClass('disabled');
            console.log('3');
        }
    }

    $scope.firstPageEmployee = function () {
        if (!$('#first-page-employee').hasClass('disabled')) {
            $scope.pageEmployee = 0;
            $scope.currentPageEmployee = $scope.pageEmployee;
            selectGetOrSearch();
            $('#first-page-employee').addClass('disabled');
            $('#pre-page-employee').addClass('disabled');
            $('#next-page-employee').removeClass('disabled');
            $('#final-page-employee').removeClass('disabled');
        }
    };
    $scope.finalPageEmployee = function () {
        if (!$('#final-page-employee').hasClass('disabled')) {
            $scope.pageEmployee = totalPageEmployee - 1;
            selectGetOrSearch();
            $scope.currentPageEmployee = $scope.pageEmployee;
            $('#first-page-employee').removeClass('disabled');
            $('#pre-page-employee').removeClass('disabled');
            $('#next-page-employee').addClass('disabled');
            $('#final-page-employee').addClass('disabled');
        }
    };

    $scope.prePageEmployee = function () {
        if (!$('#first-page-employee').hasClass('disabled')) {
            $scope.pageEmployee--;
            selectGetOrSearch();
            $scope.currentPageEmployee = $scope.pageEmployee;
            if ($scope.pageEmployee === 0) {
                $('#first-page-employee').addClass('disabled');
                $('#pre-page-employee').addClass('disabled');
            }
            $('#next-page-employee').removeClass('disabled');
            $('#final-page-employee').removeClass('disabled');
        }
    };

    $scope.nextPageEmployee = function () {
        if (!$('#final-page-employee').hasClass('disabled')) {
            $scope.pageEmployee++;
            selectGetOrSearch();
            $scope.currentPageEmployee = $scope.pageEmployee;
            if ($scope.pageEmployee === totalPageEmployee - 1) {
                $('#next-page-employee').addClass('disabled');
                $('#final-page-employee').addClass('disabled');
            }
            $('#first-page-employee').removeClass('disabled');
            $('#pre-page-employee').removeClass('disabled');
        }

    };

//===========================================================================================
// pageginLot
    $scope.selectGetOrSearch = function () {
        if (!!$scope.searchData.keyword) {
            $scope.searcDataContent();
            totalPages();
        }
        else {
            $scope.page = 0;
            $scope.currentPage = $scope.page + 1;
            loadUnitProduct();
            totalPages();
        }

    };

    $scope.searcDataContent = function () {
        $scope.page = 0;
        $scope.currentPage = $scope.page + 1;
        searcDataContent();
    };

    function searcDataContent() {
        $http.post('/loadunitproduct/searchunitproduct', $scope.searchData, {params: {page: $scope.page, size: $scope.row}}).success(function (data) {
            $scope.unitProducts = data;
            countSearch();
        });
    }

    function countSearch() {
        $http.post('/countsearchunitproduct', $scope.searchData).success(function (data) {
            totalList = data;
            totalPages();
        });
    }

    function selectGetOrSearch() {
        if (!!$scope.searchData.keyword) {
            searcDataContent();
        }
        else {
            loadUnitProduct();
        }
    }

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
        console.log(totalPage);
        if ($scope.currentPage === 1) {
            $('#first-page').addClass('disabled');
            $('#pre-page').addClass('disabled');
            $('#next-page').removeClass('disabled');
            $('#final-page').removeClass('disabled');
            console.log('1');
        }
        if ($scope.currentPage === totalPage) {
            $('#next-page').addClass('disabled');
            $('#final-page').addClass('disabled');
            $('#first-page').removeClass('disabled');
            $('#pre-page').removeClass('disabled');
            console.log('2');
        }
        if ($scope.currentPage === 1 && $scope.currentPage === totalPage) {
            $('#next-page').addClass('disabled');
            $('#final-page').addClass('disabled');
            $('#first-page').addClass('disabled');
            $('#pre-page').addClass('disabled');
        }
        if ($scope.currentPage < totalPage && $scope.currentPage > 1) {
            $('#first-page').removeClass('disabled');
            $('#pre-page').removeClass('disabled');
            $('#next-page').removeClass('disabled');
            $('#final-page').removeClass('disabled');
            console.log('3');
        }
    }

    $scope.firstPage = function () {
        if (!$('#first-page').hasClass('disabled')) {
            $scope.page = 0;
            $scope.currentPage = 1;
            selectGetOrSearch();
            $('#first-page').addClass('disabled');
            $('#pre-page').addClass('disabled');
            $('#next-page').removeClass('disabled');
            $('#final-page').removeClass('disabled');
        }
    };
    $scope.finalPage = function () {
        if (!$('#final-page').hasClass('disabled')) {
            $scope.page = totalPage - 1;
            selectGetOrSearch();
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
            selectGetOrSearch();
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
            selectGetOrSearch();
            $scope.currentPage = $scope.page + 1;
            if ($scope.page === totalPage - 1) {
                $('#next-page').addClass('disabled');
                $('#final-page').addClass('disabled');
            }
            $('#first-page').removeClass('disabled');
            $('#pre-page').removeClass('disabled');
        }

    };


//===========================================================================================
});





