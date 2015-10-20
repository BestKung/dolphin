angular.module('priceAndExpireProduct', []);
angular.module('priceAndExpireProduct').controller('priceAndExpireProductController', function ($scope, $http) {

    $scope.priceAndExpireProducts = {};
    $scope.priceAndExpireProduct = {};
    $scope.priceAndExpireProductdelete = {};

    $scope.lots = {};
    $scope.products = {};

    loadPriceAndExpireProduct();
    function  loadPriceAndExpireProduct() {
        $http.get('/loadpriceandexpireproduct').success(function (data) {
            $scope.priceAndExpireProducts = data;
        }).error(function (data) {
        });
    }

    loadLot();
    function loadLot() {
        $http.get('/loadlot').success(function (data) {
            $scope.lots = data;
            $scope.priceAndExpireProduct.lot = data.content[0];
        }).error(function (data) {
        });
    }

    loadProduct();
    function loadProduct() {
        $http.get('/loadlproduct').success(function (data) {
            $scope.products = data;
            $scope.priceAndExpireProduct.product = data.content[0];
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

    $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 200,
        format: 'yyyy-mm-dd',
        container: 'body'
    });

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

});





