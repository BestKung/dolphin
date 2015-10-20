angular.module('product', []);
angular.module('product').controller('productController', function ($scope, $http) {


    $scope.product = {};
    $scope.products = {};

    $scope.typeProducts = {};
    $scope.unitProducts = {};

    loadProduct();
    function loadProduct() {
        $http.get('/loadlproduct').success(function (data) {
            $scope.products = data;
        }).error(function (data) {
        });
    }

    loadTpyeProduct();
    function loadTpyeProduct() {
        $http.get('/loadtypeproduct').success(function (data) {
            $scope.typeProducts = data;
            $scope.product.typeProduct = data.content[0];
        }).error(function (data) {
        });
    }

    loadUnitProduct();
    function loadUnitProduct() {
        $http.get('/loadunitproduct').success(function (data) {
            $scope.unitProducts = data;
            $scope.product.unit = data.content[0];
        }).error(function (data) {
        });
    }

    $scope.saveProduct = function () {
        $http.post('/saveproduct', $scope.product).success(function (data) {
            loadProduct();
            loadTpyeProduct();
            loadUnitProduct();
            $scope.product = {};
            Materialize.toast('saveข้อมูลเรียบร้อย', 3000, 'rounded');
        }).error(function (data) {
        });
    };

    $scope.clearData = function () {
        $scope.product = {};
        loadTpyeProduct();
        loadUnitProduct();
        $('#namedepartment').removeClass('active'); // ให้ namedepartment เด้งลง
    };

    $scope.actionDelete = function (pd) {
        $scope.product = pd;
        $('#modal-delete').openModal({dismissible: false});
    };

    $scope.deleteProduct = function () {
        $http.post('/deleteproduct', $scope.product).success(function (data) {
            loadProduct();
            loadTpyeProduct();
            loadUnitProduct();
            $scope.product = {};
        }).error(function (data) {

        });
    };

    $scope.updateProduct = function (pd) {
        $scope.product.id = pd.id;
        $scope.product.name = pd.name;
        $scope.product.barCode_Main = pd.barCode_Main;
        $scope.product.barCode_Sub = pd.barCode_Sub;
        $scope.product.typeProduct = pd.typeProduct;
        $scope.product.unit = pd.unit;
        $('#namedepartment').addClass('active');
        $('body,html').animate({scrollTop: 0}, "600");
    };

});

