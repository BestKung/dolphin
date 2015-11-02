angular.module('priceAndExpireProduct', []);
angular.module('priceAndExpireProduct').controller('priceAndExpireProductController', function ($scope, $http) {

    $scope.priceAndExpireProducts = {};
    $scope.priceAndExpireProduct = {};
    $scope.priceAndExpireProductdelete = {};

    $scope.lots = {};
    $scope.products = {};


//paginLot var
    $scope.rowLot = 10;
    $scope.pageLot = 0;
    $scope.currentPageLot = 0;
    var totalPageLot = 0;
    var totalListLot = 0;
    $scope.searchDataLot = {};
    $scope.searchDataLot.keyword = "";

//===========================================================================================

// pagingProduct var
    $scope.rowProduct = 10;
    $scope.pageProduct = 0;
    $scope.currentPageProduct = 0;
    var totalPageProduct = 0;
    var totalListProduct = 0;
    $scope.searchDataProduct = {};
    $scope.searchDataProduct.keyword = "";
//===========================================================================================

// pagingPriceAndExpireProduct var
    $scope.rowPriceAndExpireProduct = 10;
    $scope.pagePriceAndExpireProduct = 0;
    $scope.currentPagePriceAndExpireProduct = 0;
    var totalPagePriceAndExpireProduct = 0;
    var totalListPriceAndExpireProduct = 0;
    $scope.searchDataPriceAndExpireProduct = {};
    $scope.searchDataPriceAndExpireProduct.keyword = "";
//===========================================================================================


//paginLot
    function loadLot() {
        $http.get('/loadlot').success(function (data) {
            $scope.lots = data;
        }).error(function (data) {
        });
    }
    $scope.clickLot = function () {
//        $scope.searchDataLot = {};
//        $scope.searchDataLot.searchBy = 'ชื่อ';
        $('#modal-employee').openModal();
        loadLot();
//        getTotalListLot();
//        $scope.firstPageLot();
    };

    $scope.selectLot = function (emp) {
        $scope.nameStream = emp.nameTh;
        $('#modal-employee').closeModal();
        $('#label-nameStaffReam').addClass('active');
        $('#prefix-appointment-employee').css('color', '#00bcd4');
    };

//===========================================================================================
// pagingProduct
    function loadProduct() {
        $http.get('/loadlproduct').success(function (data) {
            $scope.products = data;
        }).error(function (data) {
        });
    }
    $scope.clickProduct = function () {
//        $scope.searchDataEmployee = {};
//        $scope.searchDataEmployee.searchBy = 'ชื่อ';
        $('#modal-employee').openModal();
        loadProduct();
//        getTotalListEmployee();
//        $scope.firstPageEmployee();
    };

    $scope.selectProduct = function (emp) {
        $scope.nameStream = emp.nameTh;
        $('#modal-employee').closeModal();
        $('#label-nameStaffReam').addClass('active');
        $('#prefix-appointment-employee').css('color', '#00bcd4');
    };
//===========================================================================================
// pagingPriceAndExpireProduct
    loadPriceAndExpireProduct();
    function  loadPriceAndExpireProduct() {
        $http.get('/loadpriceandexpireproduct').success(function (data) {
            $scope.priceAndExpireProducts = data;
        }).error(function (data) {
        });
    }
    $scope.savePriceAndExpireProduct = function () {
        $http.post('/savepriceandexpireproduct', $scope.priceAndExpireProduct).success(function (data) {
            loadPriceAndExpireProduct();
            loadLot();
            loadProduct();
            $scope.priceAndExpireProduct = {};
            Materialize.toast('saveข้อมูลเรียบร้อย', 3000, 'rounded');
        }).error(function (data) {

        });
    };

    $scope.clearData = function () {
        $scope.priceAndExpireProduct = {};
        loadLot();
        loadProduct();
        $('#namedepartment').removeClass('active'); // ให้ namedepartment เด้งลง
    };


    $scope.actionDelete = function (paep) {
        $scope.priceAndExpireProductdelete = paep;
        $('#modal-delete').openModal({dismissible: false});
    };

    $scope.deletePriceAndExpireProduct = function () {
        $http.post('/deletepriceandexpireproduct', $scope.priceAndExpireProductdelete).success(function (data) {
            loadPriceAndExpireProduct();
            loadLot();
            loadProduct();
            $scope.priceAndExpireProduct = {};
        }).error(function (data) {

        });
    };

    $scope.updatePriceAndExpireProduct = function (paep) {
        $scope.priceAndExpireProduct.id = paep.id;
        $scope.priceAndExpireProduct.lot = paep.lot;
        $scope.priceAndExpireProduct.product = paep.product;
        $scope.priceAndExpireProduct.value = paep.value;
        $scope.priceAndExpireProduct.expire = new Date(paep.expire);
        $scope.priceAndExpireProduct.priceBuy = paep.priceBuy;
        $scope.priceAndExpireProduct.priceSell = paep.priceSell;
        $('#namedepartment').addClass('active');
        $('body,html').animate({scrollTop: 0}, "600");
    };

//===========================================================================================

    $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 200,
        format: 'yyyy-mm-dd',
        container: 'body'
    });
});


