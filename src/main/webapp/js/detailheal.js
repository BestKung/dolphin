angular.module('detailHeal', []);
angular.module('detailHeal').controller('detailHealController', function ($scope, $http) {

    $scope.detailHeal = {};
    $scope.searchDataPatient = {};
    $scope.searchDataDoctor = {};
    $scope.patient = {};
    $scope.patients = {};
    $scope.doctor = {};
    $scope.doctors = {};
    $scope.currentPage = 0;
    var totalPagePatient = 0;
    var totalPatient = 0;
    var pagePatient = 0;
    var totalDoctor = 0;
    var totalPageDoctor = 0;
    var pageDoctor = 0;

    $scope.saveDetailheal = function () {
        $http.post('/savedetailheal', $scope.detailHeal).success(function (data) {
            console.log('save Success');
        });
    };

    function getPatient() {
        $http.get('/getpatient', {params: {page: pagePatient, size: 10}}).success(function (data) {
            $scope.patients = data;
        });
        ;
    }

    function getDoctor() {
        $http.get('/getdoctor', {params: {page: pageDoctor, size: 10}}).success(function (data) {
            $scope.doctors = data;
        });
    }

    function selectGetOrSearchPatient() {
        if (!!$scope.searchDataPatient.keyword) {
            searchPatient();
        }
        else {
            getPatient();
        }
    }

    function selectGetOrSearchDoctor() {
        if (!!$scope.searchDataDoctor.keyword) {
            searchDoctor();
        }
        else {
            getDoctor();
        }
    }

    $scope.selectPatient = function (pat) {
        $scope.patient = pat;
        $scope.detailHeal.patient = pat;
        $('#modal-patient').closeModal();
        $('#prefix-detailheal-patient').css('color', '#00bcd4');
        $('#label-detailheal-patient').addClass('active');
    };

    $scope.selectDoctor = function (doc) {
        $scope.doctor = doc;
        $scope.detailHeal.doctor = doc;
        $('#modal-doctor').closeModal();
        $('#prefix-detailheal-doctor').css('color', '#00bcd4');
        $('#label-detailheal-doctor').addClass('active');
    };

    $scope.searchPatient = function () {
        $http.post('/searchpatient', $scope.searchDataPatient).success(function (data) {
            pagePatient = 0;
            $scope.currentPage = pagePatient;
            if (totalPagePatient > pagePatient) {
                $('#next-page-patient').removeClass('disabled');
                $('#final-page-patient').removeClass('disabled')
            }
            $scope.patients = data;
            countSearchPatient();
        });
    };

    function searchPatient() {
        $http.post('/searchpatient', $scope.searchDataPatient, {params: {page: pagePatient, size: 10}}).success(function (data) {
            $scope.patients = data;

        });
    }

    $scope.searchDoctor = function () {
        $http.post('/searchdoctor', $scope.searchDataDoctor).success(function (data) {
            pageDoctor = 0;
            $scope.currentPage = pageDoctor;
            if (totalPageDoctor > pageDoctor) {
                $('#next-page-doctor').removeClass('disabled');
                $('#final-page-doctor').removeClass('disabled')
            }
            $scope.doctors = data;
            countSearchDctor();
        });
    };

    function searchDoctor() {
        $http.post('/searchdoctor', $scope.searchDataDoctor, {params: {page: pageDoctor, size: 10}}).success(function (data) {
            $scope.doctors = data;
        });
    }

    function countSearchDctor() {
        $http.post('/countsearchdoctor', $scope.searchDataDoctor).success(function (data) {
            totalDoctor = data;
            findTotalPageDoctor();
        });
    }

    function countSearchPatient() {
        $http.post('/countsearchpatient', $scope.searchDataPatient).success(function (data) {
            totalPatient = data;
            findTotalPagePatient();
        });
    }

    function countPatient() {
        $http.get('/countpatient').success(function (data) {
            totalPatient = data;
            findTotalPagePatient();
        });
    }

    function countDoctor() {
        $http.get('/countdoctor').success(function (data) {
            totalDoctor = data;
            findTotalPageDoctor();
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
        console.log(totalpages);
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

    function findTotalPageDoctor() {
        totalPageDoctor = parseInt(totalDoctor / 10);
        if ((totalDoctor % 10) != 0) {
            totalPageDoctor++;
        }
        console.log(totalPageDoctor + 'total  Doctor');
        if (totalPageDoctor == 1) {
            $('#first-page-doctor').addClass('disabled');
            $('#pre-page-doctor').addClass('disabled');
            $('#next-page-doctor').addClass('disabled');
            $('#final-page-doctor').addClass('disabled');
        }
        if (totalPageDoctor > 1) {
            $('#first-page-doctor').addClass('disabled');
            $('#pre-page-doctor').addClass('disabled');
        }

    }

    $scope.firstPageDoctor = function () {
        pageDoctor = 0;
        $scope.currentPage = pageDoctor;
        selectGetOrSearchDoctor();
        $('#first-page-doctor').addClass('disabled');
        $('#pre-page-doctor').addClass('disabled');
        $('#next-page-doctor').removeClass('disabled');
        $('#final-page-doctor').removeClass('disabled');
    };

    $scope.prePageDoctor = function () {
        pageDoctor--;
        $scope.currentPage = pageDoctor;
        selectGetOrSearchDoctor();
        if (pageDoctor == 0) {
            $('#first-page-doctor').addClass('disabled');
            $('#pre-page-doctor').addClass('disabled');
        }
        $('#next-page-doctor').removeClass('disabled');
        $('#final-page-doctor').removeClass('disabled');
    };

    $scope.nextPageDoctor = function () {
        pageDoctor++;
        $scope.currentPage = pageDoctor;
        selectGetOrSearchDoctor();
        if (pageDoctor == totalPageDoctor - 1) {
            $('#next-page-doctor').addClass('disabled');
            $('#final-page-doctor').addClass('disabled');
        }
        $('#first-page-doctor').removeClass('disabled');
        $('#pre-page-doctor').removeClass('disabled');
    };

    $scope.finalPageDoctor = function () {
        pageDoctor = totalPageDoctor - 1;
        $scope.currentPage = pageDoctor;
        selectGetOrSearchDoctor();
        $('#next-page-doctor').addClass('disabled');
        $('#final-page-doctor').addClass('disabled');
        $('#first-page-doctor').removeClass('disabled');
        $('#pre-page-doctor').removeClass('disabled');
    };

    $scope.clickPatient = function () {
        $('#modal-patient').openModal();
        getPatient();
        countPatient();
    };

    $scope.clickDoctor = function () {
        $('#modal-doctor').openModal();
        getDoctor();
        countDoctor();
    };

    $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 200,
        format: 'yyyy-mm-dd',
        container: 'body'
    });
});