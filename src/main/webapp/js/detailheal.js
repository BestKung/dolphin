angular.module('detailHeal', []);
angular.module('detailHeal').controller('detailHealController', function ($scope, $http) {

    $scope.detailHeal = {};
    $scope.searchDataPatient = {};
    $scope.patient = {};
    $scope.patients = {};
    $scope.doctor = {};
    $scope.currentPage = 0;
    var totalPagePatient = 0;
    var totalPatient = 0;
    var pagePatient = 0;



    function getPatient() {
        $http.get('/getpatient',{params:{page:pagePatient , size:10}}).success(function (data) {
            $scope.patients = data;
        });
        ;
    }
    
     function selectGetOrSearchPatient() {
        if (!!$scope.searchData.keyword) {
            searchPatient();
        }
        else {
            getPatient();
        }
    }
    
    $scope.selectPatient = function (pat){
        $scope.patient = pat;
        $scope.detailHeal.patient = pat;
        $('#modal-patient').closeModal();
    };

    $scope.searchPatient = function () {
        $http.post('/searchpatient', $scope.searchDataPatient , {params:{page:pagePatient , size:10}}).success(function (data) {
            $scope.patients = data;
            countSearchPatient();
        });
    };
    
     function countSearchPatient() {
        $http.post('/countsearchpatient', $scope.searchData).success(function (data) {
            $scope.totalPatient = data;
            findTotalPagePatient();
        });
    }

    function countPatient() {
        $http.get('/countpatient').success(function (data) {
            totalPatient = data;
            findTotalPagePatient();
        });
    }

    function findTotalPagePatient() {
        var totalpages = parseInt(totalPatient / 10);
        if ((totalPatient % 10) != 0) {
            totalpages++;
        }
        totalPagePatient = totalpages;
         if (totalpages == 1) {
            $('#first-page-patient').addClass('disabled');
            $('#pre-page-patient').addClass('disabled');
            $('#next-page-patient').addClass('disabled');
            $('#final-page-patient').addClass('disabled');
        }
        if (totalpages > 1) {
            $('#first-page-patient').addClass('disabled');
            $('#pre-page-patient').addClass('disabled');
             $('#next-page-patient').removeClass('disabled');
            $('#final-page-patient').removeClass('disabled')
        }
    }
    
    $scope.firstPagePatient = function () {
        if (!$('#first-page-patient').hasClass('disabled')) {
            pagePatient = 0;
            $scope.currentPage = pagePatient;
            selectGetOrSearchPatient();
            if (pagePatient == 0) {
                $('#first-page-patient').addClass('disabled');
                $('#pre-page-patient').addClass('disabled');
            }
            $('#next-page-patient').removeClass('disabled');
            $('#final-page-patient').removeClass('disabled');
        }
    };

    $scope.prePagePatient = function () {
        if (!$('#first-page-patient').hasClass('disabled')) {
            pagePatient--;
            $scope.currentPage = pagePatient;
            selectGetOrSearchPatient();
            if (pagePatient == 0) {
                $('#first-page-patient').addClass('disabled');
                $('#pre-page-patient').addClass('disabled');
            }
            $('#next-page-patient').removeClass('disabled');
            $('#final-page-patient').removeClass('disabled');
        }
    };

    $scope.nextPagePatient = function () {
        if (!$('#final-page-patient').hasClass('disabled')) {
            pagePatient++;
            $scope.currentPage = pagePatient;
            selectGetOrSearchPatient();
            if (pagePatient == totalPagePatient - 1) {
                $('#next-page-patient').addClass('disabled');
                $('#final-page-patient').addClass('disabled');
            }
            $('#pre-page-patient').removeClass('disabled');
            $('#first-page-patient').removeClass('disabled');
         }
    };

    $scope.finalPagePatient = function () {
        if (!$('#final-page-patient').hasClass('disabled')) {
            pagePatient = totalPagePatient - 1;
            $scope.currentPage = pagePatient;
            selectGetOrSearchPatient();
            if (pagePatient == totalPagePatient - 1) {
                $('#final-page-patient').addClass('disabled');
                $('#next-page-patient').addClass('disabled');
            }
            $('#pre-page-patient').removeClass('disabled');
            $('#first-page-patient').removeClass('disabled');
        }
    };

    $scope.clickPatient = function () {
        $('#modal-patient').openModal();
        getPatient();
        countPatient();
    };
    
    $scope.clickDoctor = function (){};

    $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 200,
        format: 'yyyy-mm-dd',
        container: 'body'
    });
});