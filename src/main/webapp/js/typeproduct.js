angular.module('typeProduct', []);
angular.module('typeProduct').controller('typeProductController', function ($scope, $http) {
    
    $scope.typeProduct = {};
    $scope.typeProducts = {};
    
    loadTpyeProduct();
    function loadTpyeProduct() {
        $http.get('/loadtypeproduct').success(function (data) {
            $scope.typeProducts = data;
        }).error(function (data) {
        });
    }
    
    $scope.saveTpyeProduct = function () {
        $http.post('/savetypeproduct', $scope.typeProduct).success(function (data) {
            loadTpyeProduct();
            $scope.typeProduct = {};
            Materialize.toast('saveข้อมูลเรียบร้อย', 3000, 'rounded');
        }).error(function (data) {
        });
    };

    $scope.clearData = function () {
        $scope.typeProduct = {};
        $('#namedepartment').removeClass('active'); // ให้ namedepartment เด้งลง
    };
    
     $scope.actionDelete = function (tp) {
        $scope.typeProduct = tp;
        $('#modal-delete').openModal({dismissible: false});
    };

    $scope.deleteTpyeProduct = function () {
        $http.post('/deletetypeproduct', $scope.typeProduct).success(function (data) {
            loadTpyeProduct();
            $scope.typeProduct = {};
        }).error(function (data) {

        });
    };
    
    $scope.updateTpyeProduct = function (tp){
        $scope.typeProduct.id = tp.id;
        $scope.typeProduct.name = tp.name;
        $('#namedepartment').addClass('active');
        $('body,html').animate({scrollTop: 0}, "600");
    };

});

