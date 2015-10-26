angular.module('detailHeal', []);
angular.module('detailHeal').controller('detailHealController', function ($scope, $http) {

    $scope.detailHeals = {};
    $scope.detailHeal = {};
    $scope.orderHeals = [];
    $scope.patients = {};
    $scope.doctors = {};
    $scope.listSelectHeals = {};
    $scope.preScroll = 0;

//    $scope.deleteOrderHeal = [];
//    $scope.updateOrderHeal = {};
//    var updateDeleteOrderHeal = [];
//    var updateCount = 0;
//    var count = 0;

    $scope.row = 10;
    $scope.page = 0;
    $scope.currentPage = 1;
    var totalPage = 0;
    var totalList = 0;

    loadDetailHeal();
    function loadDetailHeal() {
        $http.get('/loaddetailheal', {params: {page: $scope.page, size: $scope.row}}).success(function (data) {
            $scope.detailHeals = data;
        }).error(function (data) {

        });
    }

    loadPatient(0);
    function loadPatient(id) {
        $http.get('/getpatient').success(function (data) {
            $scope.patients = data;
            $scope.detailHeal.patient = data.content[id];
            for (i = 0; i < data.content.length; i++) {
                if (id === data.content[i].id) {
                    $scope.detailHeal.patient = data.content[i];
                }
            }

        });
    }

    loadDoctor(0);
    function loadDoctor(id) {
        $http.get('/getdoctor').success(function (data) {
            $scope.doctors = data;
            $scope.detailHeal.doctor = data.content[id];
            for (j = 0; j < data.content.length; j++) {
                if (id === data.content[j].id) {
                    $scope.detailHeal.doctor = data.content[j];
                }
            }
        });
    }

    loadListSelectHeal();
    function loadListSelectHeal() {
        $http.get('/loadlistselectheal').success(function (data) {
            $scope.listSelectHeals = data;
            $scope.nameListOrderheal = data.content[0];
        }).error(function (data) {
        });
    }


    $scope.addSelectHeal = function (name) {
        if (!$scope.amountListSelectHeal || $scope.amountListSelectHeal === 0 || $scope.amountListSelectHeal < 0) {
            Materialize.toast('การุณากรอกจำนวนให้ถูกต้องด้วยครับ', 3000, 'rounded');
        } else {
            if ($scope.orderHeals.length === 0) {
                $scope.orderHeals.push({'listSelectHeal': $scope.nameListOrderheal,
                    'value': $scope.amountListSelectHeal});
                $scope.nameListOrderheal = '';
                $scope.amountListSelectHeal = '';
            } else {
                var flag = false;
                var temp = 0;
                for (var i = 0; i < $scope.orderHeals.length; i++) {
                    if ($scope.orderHeals[i].listSelectHeal.name === name.name) {
//                        updateDeleteOrderHeal[updateCount] = $scope.orderHeals[i];
                        temp = Number($scope.orderHeals[i].value) + Number($scope.amountListSelectHeal);
                        $scope.orderHeals[i] = {'listSelectHeal': $scope.nameListOrderheal,
                            'value': temp};
                        $scope.nameListOrderheal = '';
                        $scope.amountListSelectHeal = '';
                        flag = true;
//                        updateCount++;
                        break;
                    }
                }
                if (flag === false) {
                    $scope.orderHeals.push({'listSelectHeal': $scope.nameListOrderheal,
                        'value': $scope.amountListSelectHeal});
                    $scope.nameListOrderheal = '';
                    $scope.amountListSelectHeal = '';
                }
            }

        }
        loadListSelectHeal();
    };
    $scope.removeSelectHeal = function (name, id) {
        var index = -1;
        for (var i = 0; i < $scope.orderHeals.length; i++) {
            if ($scope.orderHeals[i].listSelectHeal.name === name) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            Materialize.toast('บางอย่างผิดพลาด', 3000, 'rounded');
        }
        $scope.orderHeals.splice(index, 1);
//        $scope.deleteOrderHeal[count] = id;
//        count++;
    };

    $scope.saveDetailheal = function () {
//        $scope.updateOrderHeal.deleteOrderHeal = updateDeleteOrderHeal;
//        console.log(updateDeleteOrderHeal);
//        $scope.updateOrderHeal.orderHeal = $scope.orderHeals;
//        $scope.updateOrderHeal.id = $scope.deleteOrderHeal;
//        updateCount = 0;
//        count = 0;
        $http.post('/savedetailheal', $scope.detailHeal).success(function (data) {
            $http.post('/saveorderheal', $scope.orderHeals).success(function (data) {
                Materialize.toast('บันทึกข้อมูลเรียบร้อย', 3000, 'rounded');
                loadDetailHeal();
//                $scope.updateOrderHeal = {};
                $scope.detailHeal = {};
                $scope.orderHeals = [];
                $scope.nameListPayHeal = '';
                $scope.amountListPayHeal = '';
                getTotalList();
                loadListSelectHeal(0);
                loadPatient(0);
                loadDoctor(0);


            }).error(function (data, status, header, cofig) {
                Materialize.toast('ผิดพลาดsavedetailHeal', 3000, 'rounded');
            });
        }).error(function (data, status, header, cofig) {

        });

    };

    $scope.clearData = function () {
        $scope.detailHeal = {};
        $scope.orderHeals = [];
        $scope.nameListPayHeal = '';
        $scope.amountListPayHeal = '';
        loadListSelectHeal();
        loadPatient();
        loadDoctor();
        $('#namedepartment').removeClass('active');
    };

    $scope.seeDetail = {};
    $scope.seeDatailHeal = function (dh) {
        $scope.preScroll = $(window).scrollTop();
        $scope.seeDetail = dh;
    };

    $scope.deleteDetailHeal = function () {
        $http.post('/deletedetailheal', $scope.seeDetail).success(function (data) {
            Materialize.toast('ลบข้อมูลเรียบร้อย', 3000, 'rounded');
            loadDetailHeal();
            getTotalList();
            $scope.firstPage();
            $('span#close-card').trigger('click');
        }).error(function (data) {

        });
    };


    $scope.actionUpdate = function (seeDetail) {
        $('body,html').animate({scrollTop: 0}, "600");
        $scope.detailHeal.id = seeDetail.id;
        $scope.detailHeal.dateHeal = new Date(seeDetail.dateHeal);
        loadPatient(seeDetail.patient.id);
        loadDoctor(seeDetail.doctor.id);
        $scope.detailHeal.detail = seeDetail.detail;

        $scope.orderHeals = seeDetail.orderHealDetailHeals;
        $('#namedate').addClass('active');
        $('#namedatail').addClass('active');
    };



    $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 200,
        format: 'yyyy-mm-dd',
        container: 'body'
    });

    $(document).ready(function () {
        $('.modal-trigger').leanModal();
    });

    function toPreScroll() {
        $('body,html').animate({scrollTop: $scope.preScroll}, "0");
    }

    $scope.toPreScroll = function () {
        toPreScroll();
    };

    $scope.cancel = function () {
        toPreScroll();
        $('span#close-card').trigger('click');
    };

    // pagegin
    $scope.selectGetOrSearch = function () {
        loadDetailHeal();
        getTotalList();
        $scope.firstPage();
        if (totalPage >= $scope.currentPage) {
            $('#next-page').removeClass('disabled');
            $('#final-page').removeClass('disabled');
        }
    };

    getTotalList();
    function getTotalList() {
        $http.get('/totaldetailheal').success(function (data) {
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
            loadDetailHeal();
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
            loadDetailHeal();
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
            loadDetailHeal();
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
            loadDetailHeal();
            $scope.currentPage = $scope.page + 1;
            if ($scope.page === totalPage - 1) {
                $('#next-page').addClass('disabled');
                $('#final-page').addClass('disabled');
            }
            $('#first-page').removeClass('disabled');
            $('#pre-page').removeClass('disabled');
        }

    };

    $scope.searchData = {};
    $scope.searcDataContent = function () {
        if (!$scope.searchData.keyword) {
            loadDetailHeal();
        }
        else {
            $http.post('/loaddetailheal/searchdetailheal', $scope.searchData, {params: {page: $scope.page, size: $scope.row}}).success(function (data) {
                $scope.detailHeals = data;
            }).error(function (data) {

            });
        }
    };

});

