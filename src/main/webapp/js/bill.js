angular.module('bill', []);
angular.module('bill').controller('billController', function ($scope, $http) {

    $scope.bill = {};
    $scope.detailHeals = {};
    $scope.searchDataDetailHeal = {};
    $scope.currentPageDetailHeal = 0;
    $scope.dataSelectDetailHeal = {};
    $scope.products = {};
    $scope.searchDataProduct = {};
    $scope.currentPageProduct = 0;

    var totalDetailHeal = 0;
    var totalPageDetailHeal = 0;
    var PageDetailHeal = 0;
    var totalProduct = 0;
    var totalPageProduct = 0;
    var pageProduct = 0;

    $scope.saveBill = function () {
        $http.post('/savebill', $scope.bill).success(function (data) {
            console.log('save success');
        });
    };
//////////////////////////////////// Start Product //////////////////////////////////////////////////////
    function getProduct() {
        $http.get('/loadpriceandexpireproduct', {params: {page: pageProduct, size: 10}}).success(function (data) {
            $scope.products = data;
            console.log(data);
        });
    }

    function countProduct() {
        $http.get('/totalpriceandexpireproduct').success(function (data) {
            totalProduct = data;
            findTotalPageProduct();
        });
    }

    $scope.searchProduct = function () {
        pageProduct = 0;
        $scope.currentPageProduct = pageProduct;
        searchProduct();
        countSearchProduct();
    };

    function searchProduct() {
        $scope.searchDataProduct.searchBy = 'NameProduct';
        $http.post('/loadpriceandexpireproduct/searchpriceandexpireproduct', $scope.searchDataProduct, {params: {page: pageProduct, size: 10}}).success(function (data) {
            $scope.products = data;
        });
    }

    function countSearchProduct() {
        $scope.searchDataProduct.searchBy = 'NameProduct';
        $http.post('/countsearchpriceandexpireproduct', $scope.searchDataProduct).success(function (data) {
            totalProduct = data;
            findTotalPageProduct();
        });
    }

    function selectGetOrSearchProduct() {
        if (!!$scope.searchDataProduct.keyword) {
            searchProduct();
        }
        else{
            getProduct();
        }
    }

    function findTotalPageProduct() {
        var totalpages = parseInt(totalProduct / 10);
        if ((totalProduct % 10) != 0) {
            totalpages++;
        }
        totalPageProduct = totalpages;
        if (totalPageProduct == 1) {
            $('#first-page-product').addClass('disabled');
            $('#pre-page-product').addClass('disabled');
            $('#next-page-product').addClass('disabled');
            $('#final-page-product').addClass('disabled');
        }
        if (totalPageProduct > 1) {
            $('#first-page-product').addClass('disabled');
            $('#pre-page-product').addClass('disabled');
            $('#next-page-product').removeClass('disabled');
            $('#final-page-product').removeClass('disabled');
        }
        console.log(totalPageProduct);
    }

    $scope.firstPageProduct = function () {
        if (!$('#first-page-product').hasClass('disabled')) {
            pageProduct = 0;
            $scope.currentPageProduct = pageProduct;
            selectGetOrSearchProduct()
            if (pageProduct == 0) {
                $('#first-page-product').addClass('disabled');
                $('#pre-page-product').addClass('disabled');
            }
            $('#next-page-product').removeClass('disabled');
            $('#final-page-product').removeClass('disabled');
        }
    };

    $scope.prePageProduct = function () {
        if (!$('#first-page-product').hasClass('disabled')) {
            pageProduct--;
            $scope.currentPageProduct = pageProduct;
            selectGetOrSearchProduct()
            if (pageProduct == 0) {
                $('#first-page-product').addClass('disabled');
                $('#pre-page-product').addClass('disabled');
            }
            $('#next-page-product').removeClass('disabled');
            $('#final-page-product').removeClass('disabled');
        }
    };

    $scope.nextPageProduct = function () {
        if (!$('#final-page-product').hasClass('disabled')) {
            pageProduct++;
            $scope.currentPageProduct = pageProduct;
            selectGetOrSearchProduct()
            if (pageProduct == totalPageProduct - 1) {
                $('#next-page-product').addClass('disabled');
                $('#final-page-product').addClass('disabled');
            }
            $('#pre-page-product').removeClass('disabled');
            $('#first-page-product').removeClass('disabled');
        }
    };

    $scope.finalPageProduct = function () {
        if (!$('#final-page-product').hasClass('disabled')) {
            pageProduct = totalPageProduct - 1;
            $scope.currentPageProduct = pageProduct;
            selectGetOrSearchProduct()
            if (pageProduct == totalPageProduct - 1) {
                $('#final-page-product').addClass('disabled');
                $('#next-page-product').addClass('disabled');
            }
            $('#pre-page-product').removeClass('disabled');
            $('#first-page-product').removeClass('disabled');
        }
    };
//////////////////////////////////// End Product //////////////////////////////////////////////////////

//////////////////////////////////// Start DetailHeal //////////////////////////////////////////////////////
    function getDetailHeal() {
        $http.get('/loaddetailheal', {params: {page: PageDetailHeal, size: 10}}).success(function (data) {
            $scope.detailHeals = data;
            console.log();
        });
    }

    $scope.selectDetailHeal = function (det) {
        $scope.dataSelectDetailHeal = det;
        $scope.bill.detailHeal = det;
        console.log(det);
        $('#modal-detailheal').closeModal();
    };

    function countDetailHeal() {
        $http.get('/countdetailheal').success(function (data) {
            totalDetailHeal = data;
            findTotalPageDetailHeal();
        });
    }

    $scope.searchDetailHeal = function () {
        PageDetailHeal = 0;
        $scope.currentPageDetailHeal = PageDetailHeal;
        searchDetailHeal();
        countSearchDetailHeal();
    };

    function searchDetailHeal() {
        $http.post('/loaddetailheal/searchdetailheal', $scope.searchDataDetailHeal, {params: {page: PageDetailHeal, size: 10}}).success(function (data) {
            $scope.detailHeals = data;
            console.log('do');
        });
    }

    function countSearchDetailHeal() {
        $http.post('/countsearchdetailheal', $scope.searchDataDetailHeal).success(function (data) {
            totalDetailHeal = data;
            console.log(data);
            findTotalPageDetailHeal();
        });
    }

    function selectGetOrSearchDetailHeal() {
        if (!!$scope.searchDataDetailHeal.keyword) {
            searchDetailHeal();
            console.log('true');
        }
        else {
            getDetailHeal();
            console.log('false');
        }
    }

    function findTotalPageDetailHeal() {
        var totalpages = parseInt(totalDetailHeal / 10);
        if ((totalDetailHeal % 10) != 0) {
            totalpages++;
        }
        totalPageDetailHeal = totalpages;
        if (totalPageDetailHeal == 1) {
            $('#first-page-detailheal').addClass('disabled');
            $('#pre-page-detailheal').addClass('disabled');
            $('#next-page-detailheal').addClass('disabled');
            $('#final-page-detailheal').addClass('disabled');
        }
        if (totalPageDetailHeal > 1) {
            $('#first-page-detailheal').addClass('disabled');
            $('#pre-page-detailheal').addClass('disabled');
            $('#next-page-detailheal').removeClass('disabled');
            $('#final-page-detailheal').removeClass('disabled');
        }
        console.log(totalPageDetailHeal);
    }

    $scope.firstPageDetailHeal = function () {
        if (!$('#first-page-detailheal').hasClass('disabled')) {
            PageDetailHeal = 0;
            $scope.currentPageDetailHeal = PageDetailHeal;
            selectGetOrSearchDetailHeal();
            if (PageDetailHeal == 0) {
                $('#first-page-detailheal').addClass('disabled');
                $('#pre-page-detailheal').addClass('disabled');
            }
            $('#next-page-detailheal').removeClass('disabled');
            $('#final-page-detailheal').removeClass('disabled');
        }
    };

    $scope.prePageDetailHeal = function () {
        if (!$('#first-page-detailheal').hasClass('disabled')) {
            PageDetailHeal--;
            $scope.currentPageDetailHeal = PageDetailHeal;
            selectGetOrSearchDetailHeal();
            if (PageDetailHeal == 0) {
                $('#first-page-detailheal').addClass('disabled');
                $('#pre-page-detailheal').addClass('disabled');
            }
            $('#next-page-detailheal').removeClass('disabled');
            $('#final-page-detailheal').removeClass('disabled');
        }
    };

    $scope.nextPageDetailHeal = function () {
        if (!$('#final-page-detailheal').hasClass('disabled')) {
            PageDetailHeal++;
            $scope.currentPageDetailHeal = PageDetailHeal;
            selectGetOrSearchDetailHeal();
            if (PageDetailHeal == totalPageDetailHeal - 1) {
                $('#next-page-detailheal').addClass('disabled');
                $('#final-page-detailheal').addClass('disabled');
            }
            $('#pre-page-detailheal').removeClass('disabled');
            $('#first-page-detailheal').removeClass('disabled');
        }
    };

    $scope.finalPageDetailHeal = function () {
        if (!$('#final-page-detailheal').hasClass('disabled')) {
            PageDetailHeal = totalPageDetailHeal - 1;
            $scope.currentPageDetailHeal = PageDetailHeal;
            selectGetOrSearchDetailHeal();
            if (PageDetailHeal == totalPageDetailHeal - 1) {
                $('#final-page-detailheal').addClass('disabled');
                $('#next-page-detailheal').addClass('disabled');
            }
            $('#pre-page-detailheal').removeClass('disabled');
            $('#first-page-detailheal').removeClass('disabled');
        }
    };
    //////////////////////////////////////// End DetailHeal //////////////////////////////////////////////////

    $scope.clickOrderHeal = function () {
        $('#modal-detailheal').openModal();
        getDetailHeal();
        countDetailHeal();
    };

    $scope.clickAddProduct = function () {
        $('#modal-addproduct').openModal();
        getProduct();
        countProduct();
    };

    $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 200,
        format: 'yyyy-mm-dd',
        container: 'body'
    });
});