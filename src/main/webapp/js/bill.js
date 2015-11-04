angular.module('bill', []);
angular.module('bill').controller('billController', function ($scope, $http) {

    $scope.bill = {};
    $scope.detailHeals = {};
    $scope.searchDataDetailHeal = {};
    $scope.currentPageDetailHeal = 0;
    $scope.dataSelectDetailHeal = {};
    $scope.products = {};
    $scope.searchDataProduct = {};
    $scope.currentPageProduct

    var totalDetailHeal = 0;
    var totalPageDetailHeal = 0;
    var PageDetailHeal = 0;

    $scope.saveBill = function () {
        $http.post('/savebill', $scope.bill).success(function (data) {
            console.log('save success');
        });
    };
//////////////////////////////////// Start Product //////////////////////////////////////////////////////
    function getProduct(){
        $http.get('/loadpriceandexpireproduct').success(function (data){
            $scope.products = data;
            console.log(data);
        });
    }
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
    
    $scope.clickAddProduct = function (){
        $('#modal-addproduct').openModal();
        getProduct();
    };

    $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 200,
        format: 'yyyy-mm-dd',
        container: 'body'
    });
});