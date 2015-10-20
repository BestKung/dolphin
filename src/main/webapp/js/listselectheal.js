angular.module('listSelectHeal', []);
angular.module('listSelectHeal').controller('listSelectHealController', function ($scope, $http) {

    $scope.listSelectHeal = {};
    $scope.listSelectHeals = {};
    $scope.row = 10;
    $scope.page = 0;
    $scope.currentPage = 1;
    var totalPage = 0;
    var totalList = 0;

    loadListSelectHeal();
    function loadListSelectHeal() {
        $http.get('/loadlistselectheal', {params: {page: $scope.page, size: $scope.row}}).success(function (data) {
            $scope.listSelectHeals = data;
        }).error(function (data) {
        });
    }
    $scope.saveListSelectHeal = function () {
        $http.post('/savelistselectheal', $scope.listSelectHeal).success(function (data) {
            loadListSelectHeal();
            $scope.listSelectHeal = {};
            Materialize.toast('saveข้อมูลเรียบร้อย', 3000, 'rounded');
            getTotalList();
        }).error(function (data) {
        });
    };

    $scope.clearData = function () {
        $scope.listSelectHeal = {};
        $('#namedepartment').removeClass('active'); // ให้ namedepartment เด้งลง
    };

    $scope.actionDelete = function (lsh) {
        $scope.listSelectHeal = lsh;
        $('#modal-delete').openModal({dismissible: false});
    };

    $scope.deleteListSelectHeal = function () {
        $http.post('/deletelistselectheal', $scope.listSelectHeal).success(function (data) {
            loadListSelectHeal();
            $scope.listSelectHeal = {};
            getTotalList();
            $scope.firstPage();
        }).error(function (data) {

        });
    };

    $scope.updateListSelectHeal = function (lsh) {
        $scope.listSelectHeal.id = lsh.id;
        $scope.listSelectHeal.name = lsh.name;
        $scope.listSelectHeal.price = lsh.price;
        $('#namedepartment').addClass('active');
        $('body,html').animate({scrollTop: 0}, "600");
    };

    // pagegin
    $scope.selectGetOrSearch = function () {
        loadListSelectHeal();
        getTotalList();
        $scope.firstPage();
        if(totalPage >= $scope.currentPage){
            $('#next-page').removeClass('disabled');
            $('#final-page').removeClass('disabled');
        }
    };

    getTotalList();
    function getTotalList() {
        $http.get('/totallistselectheal').success(function (data) {
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
            loadListSelectHeal();
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
            loadListSelectHeal();
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
            loadListSelectHeal();
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
            loadListSelectHeal();
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

