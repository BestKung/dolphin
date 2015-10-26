/* global moment */

angular.module('appointment', []);
angular.module('appointment').controller('appointmentController', function ($scope, $http) {

    $scope.appointment = {};
    $scope.appointments = {};
    $scope.appointmentDetail = {};
    $scope.startTime = "";
    $scope.endTime = "";
    $scope.warpAppointmane = {};
    $scope.patients = {};
    $scope.searchData = {};
    $scope.searchDataDoctor = {};
    $scope.searchDataAppointment = {};
    $scope.currentPage = 0;
    $scope.currentPageDoctor = 0;
    $scope.totalPatient = 0;
    $scope.patient = {};
    $scope.doctor = {};
    $scope.doctors = {};
    $scope.preScroll = 0;
    $scope.sizeAppointment = 10;
    var totalDoctor = 0;
    var totalPageDoctor = 0;
    var pageDoctor = 0;
    var pagePatient = 0;
    var totalPage = 0;
    var totalAppointment = 0;
    var totalPageAppointment = 0;
    var pageAppointment = 0;


    $scope.saveAppointment = function () {
        $scope.appointment.startTime = new Date(moment(new Date($scope.appointment.appointDay + " " + $scope.startTime)).format('YYYY-MM-d HH:mm:ss'));
        $scope.appointment.endTime = new Date(moment(new Date($scope.appointment.appointDay + " " + $scope.endTime)).format('YYYY-MM-d HH:mm:ss'));
        $http.post('/saveappointment', $scope.appointment).success(function (data) {
            console.log('save Success');
            selectGetOrSearchAppointment();
            $scope.clearData();
            countAppointment();
            console.log(data);
        });
    };

    getAppointment();
    function getAppointment() {
        $http.get('/getappointment', {params: {page: pageAppointment, size: $scope.sizeAppointment}}).success(function (data) {
            $scope.appointments = data;
        });
    }

    $scope.deleteAppointment = function (app) {
        $http.post('/deleteappointment', app.id).success(function (data) {
            selectGetOrSearchAppointment();
            toPreScroll();
            $('span#close-card').trigger('click');
        });
    };

    $scope.updateAppointment = function (app) {
        $scope.appointment = app;
        $scope.startTime = app.startTime;
        $scope.endTime = app.endTime;
        $scope.doctor = app.doctor;
        $scope.patient = app.patient;
        $('.update').addClass('active');
        $('#prefix-appointment-id , .treatmentlist , #prefix-appointment-appointday , #prefix-appointment-doctor , #prefix-appointment-mobile , #prefix-appointment-patient , #prefix-endtime , #prefix-starttime').css('color', '#00bcd4');
        $('body,html').animate({scrollTop: 0}, "600");
        $('span#close-card').trigger('click');
    };

    $scope.getAppointment = function () {
        pageAppointment = 0;
        getAppointment();
        $scope.currentPage = pageAppointment;
        countAppointment();
        findTotalPageAppointment();
    };

    $scope.searchAppointment = function () {
        searchAppointment();
        countSearchAppointment();
        console.log('search count : ' + totalPage);
    };

    function searchAppointment() {
        $http.post('/searchappointment', $scope.searchDataAppointment, {params: {page: pageAppointment, size: $scope.sizeAppointment}}).success(function (data) {
            $scope.appointments = data;
        });
    }

    $scope.clearData = function () {
        $scope.appointment = {};
        $scope.startTime = "";
        $scope.endTime = "";
        $scope.patient = {};
        $scope.doctor = {};
        $('.update').removeClass('active');
        $('.clear-prefix').css('color', 'black');

    };

    countAppointment();
    function countAppointment() {
        $http.get('/countappointment').success(function (data) {
            totalAppointment = data;
            findTotalPageAppointment();
        });
    }

    function countSearchAppointment() {
        $http.post('/countsearchappointment', $scope.searchDataAppointment).success(function (data) {
            totalAppointment = data;
            findTotalPageAppointment();
        });
    }

    function findTotalPageAppointment() {
        totalPageAppointment = parseInt(totalAppointment / $scope.sizeAppointment);
        if ((totalAppointment % $scope.sizeAppointment) != 0) {
            totalPageAppointment++;
        }
        console.log(totalAppointment + 'total  Appointment');
        console.log(totalPageAppointment);
        if (totalPageAppointment == 1 || totalPageAppointment == 0) {
            $('#first-page-appointment').addClass('disabled');
            $('#pre-page-appointment').addClass('disabled');
            $('#next-page-appointment').addClass('disabled');
            $('#final-page-appointment').addClass('disabled');
            console.log('true1');
        }
        if (totalPageAppointment > 1) {
            $('#first-page-appointment').addClass('disabled');
            $('#pre-page-appointment').addClass('disabled');
            $('#next-page-appointment').removeClass('disabled');
            $('#final-page-appointment').removeClass('disabled');
            console.log('true2');
        }

    }

    $scope.selectGetOrSearchAppointment = function () {
        pageAppointment = 0;
        $scope.currentPage = pageAppointment;
        if (!!$scope.searchDataAppointment.keyword) {
            searchAppointment();
            countSearchAppointment();
        }
        else {
            getAppointment();
            countAppointment();
        }
    };

    function selectGetOrSearchAppointment() {
        if (!!$scope.searchDataAppointment.keyword) {
            searchAppointment();
        }
        else {
            getAppointment();
        }
    }

    $scope.firstPageAppointment = function () {
        if (!$('#first-page-appointment').hasClass('disabled')) {
            pageAppointment = 0;
            $scope.currentPage = pageAppointment;
            selectGetOrSearchAppointment();
            if (pageAppointment == 0) {
                $('#first-page-appointment').addClass('disabled');
                $('#pre-page-appointment').addClass('disabled');
            }
            $('#next-page-appointment').removeClass('disabled');
            $('#final-page-appointment').removeClass('disabled');
        }
    };

    $scope.prePageAppointment = function () {
        if (!$('#first-page-appointment').hasClass('disabled')) {
            pageAppointment--;
            $scope.currentPage = pageAppointment;
            selectGetOrSearchAppointment();
            if (pageAppointment == 0) {
                $('#first-page-appointment').addClass('disabled');
                $('#pre-page-appointment').addClass('disabled');
            }
            $('#next-page-appointment').removeClass('disabled');
            $('#final-page-appointment').removeClass('disabled');
        }
    };

    $scope.nextPageAppointment = function () {
        if (!$('#final-page-appointment').hasClass('disabled')) {
            pageAppointment++;
            $scope.currentPage = pageAppointment;
            selectGetOrSearchAppointment();
            if (pageAppointment == totalPageAppointment - 1) {
                $('#next-page-appointment').addClass('disabled');
                $('#final-page-appointment').addClass('disabled');
            }
            $('#pre-page-appointment').removeClass('disabled');
            $('#first-page-appointment').removeClass('disabled');
            console.log('next');
        }
    };

    $scope.finalPageAppointment = function () {
        if (!$('#final-page-appointment').hasClass('disabled')) {
            pageAppointment = totalPageAppointment - 1;
            $scope.currentPage = pageAppointment;
            selectGetOrSearchAppointment();
            if (pageAppointment == totalPageAppointment - 1) {
                $('#final-page-appointment').addClass('disabled');
                $('#next-page-appointment').addClass('disabled');
            }
            $('#pre-page-appointment').removeClass('disabled');
            $('#first-page-appointment').removeClass('disabled');
        }
    };

    function getPatient() {
        $http.get('/getpatient', {params: {page: pagePatient, size: 10}}).success(function (data) {
            $scope.patients = data;
        });
    }

    $scope.moreDetail = function (app) {
        $scope.preScroll = $(window).scrollTop();
        $('body,html').animate({scrollTop: 400}, "400");
        $scope.appointmentDetail = app;
        $scope.appointmentDetail.startTime = moment(new Date(app.appointDay + " " + app.startTime)).format('hh:mm a');
        $scope.appointmentDetail.endTime = moment(new Date(app.appointDay + " " + app.endTime)).format('hh:mm a');
        var topic = document.getElementsByClassName('topic-detail');
        for (var i = 0; i < topic.length; i++) {
            if (topic[i].innerHTML == "") {
                topic[i].innerHTML = '-';
            }
        }
    };

    $scope.cancel = function () {
        toPreScroll();
        $('span#close-card').trigger('click');
    };

    function toPreScroll() {
        $('body,html').animate({scrollTop: $scope.preScroll}, "0");
    }

    $scope.toPreScroll = function () {
        toPreScroll();
    };

    function getDoctor() {
        $http.get('getdoctor', {params: {page: pageDoctor, size: 10}}).success(function (data) {
            $scope.doctors = data;
        });
    }

    $scope.selectPatient = function (patient) {
        $scope.appointment.patient = patient;
        $scope.patient = $scope.appointment.patient;
        $('#modal-patient').closeModal();
        $('#label-appointment-patient').addClass('active');
        $('#prefix-appointment-patient').css('color', '#00bcd4');
    };

    $scope.selectDoctor = function (doctor) {
        $scope.appointment.doctor = doctor;
        $scope.doctor = $scope.appointment.doctor;
        $('#modal-doctor').closeModal();
        $('#label-appointment-doctor').addClass('active');
        $('#prefix-appointment-doctor').css('color', '#00bcd4');
    };

    $scope.searchPatient = function () {
        $http.post('/searchpatient', $scope.searchData, {params: {page: pagePatient, size: 10}}).success(function (data) {
            $scope.patients = data;
            countSearchPatient();
            console.log(totalPage);
        });
    };

    function searchPatient() {
        $http.post('/searchpatient', $scope.searchData, {params: {page: pagePatient, size: 10}}).success(function (data) {
            $scope.patients = data;
            console.log(totalPage);
        });
    }

    $scope.searchDoctor = function () {
        $http.post('/searchdoctor', $scope.searchDataDoctor, {params: {page: pageDoctor, size: 10}}).success(function (data) {
            $scope.doctors = data;
            countSearchDctor();
        });
    };

    function searchDoctor() {
        $http.post('/searchdoctor', $scope.searchDataDoctor, {params: {page: pageDoctor, size: 10}}).success(function (data) {
            $scope.doctors = data;
        });
    }

    function countPatient() {
        $http.get('/countpatient').success(function (data) {
            $scope.totalPatient = data;
            findTotalPage();
            console.log('total page : ' + totalPage);
        });
    }

    function countDoctor() {
        $http.get('/countdoctor').success(function (data) {
            totalDoctor = data;
            findTotalPageDoctor();
        });
    }

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

    function selectGetOrSearch() {
        if (!!$scope.searchData.keyword) {
            searchPatient();
            console.log('true');
        }
        else {
            getPatient();
            console.log('false');
        }
    }

    function selectGetOrSearchDoctor() {
        if (!!$scope.searchDataDoctor.keyword) {
            searchDoctor();
            console.log('true');
        }
        else {
            getDoctor();
            console.log('false');
        }
    }

    function countSearchPatient() {
        $http.post('/countsearchpatient', $scope.searchData).success(function (data) {
            $scope.totalPatient = data;
            findTotalPage();
        });
    }

    function countSearchDctor() {
        $http.post('/countsearchdoctor', $scope.searchDataDoctor).success(function (data) {
            totalDoctor = data;
            findTotalPageDoctor();
        });
    }

    function findTotalPage() {
        var totalpages = parseInt($scope.totalPatient / 10);
        if (($scope.totalPatient % 10) != 0) {
            totalpages++;
        }
        totalPage = totalpages;
        console.log(totalPage);
        if (totalpages == 1) {
            $('#first-page').addClass('disabled');
            $('#pre-page').addClass('disabled');
            $('#next-page').addClass('disabled');
            $('#final-page').addClass('disabled');
        }
        if (totalpages > 1) {
            $('#first-page').addClass('disabled');
            $('#pre-page').addClass('disabled');
        }
    }

    $scope.firstPage = function () {
        if (!$('#first-page').hasClass('disabled')) {
            pagePatient = 0;
            $scope.currentPage = pagePatient;
            selectGetOrSearch();
            if (pagePatient == 0) {
                $('#first-page').addClass('disabled');
                $('#pre-page').addClass('disabled');
            }
            $('#next-page').removeClass('disabled');
            $('#final-page').removeClass('disabled');
        }
    };

    $scope.prePage = function () {
        if (!$('#first-page').hasClass('disabled')) {
            pagePatient--;
            $scope.currentPage = pagePatient;
            selectGetOrSearch();
            if (pagePatient == 0) {
                $('#first-page').addClass('disabled');
                $('#pre-page').addClass('disabled');
            }
            $('#next-page').removeClass('disabled');
            $('#final-page').removeClass('disabled');
        }
    };

    $scope.nextPage = function () {
        if (!$('#final-page').hasClass('disabled')) {
            pagePatient++;
            $scope.currentPage = pagePatient;
            selectGetOrSearch();
            if (pagePatient == totalPage - 1) {
                $('#next-page').addClass('disabled');
                $('#final-page').addClass('disabled');
            }
            $('#pre-page').removeClass('disabled');
            $('#first-page').removeClass('disabled');
            console.log('next');
        }
    };

    $scope.finalPage = function () {
        if (!$('#final-page').hasClass('disabled')) {
            pagePatient = totalPage - 1;
            $scope.currentPage = pagePatient;
            selectGetOrSearch();
            if (pagePatient == totalPage - 1) {
                $('#final-page').addClass('disabled');
                $('#next-page').addClass('disabled');
            }
            $('#pre-page').removeClass('disabled');
            $('#first-page').removeClass('disabled');
        }
    };

    $scope.firstPageDoctor = function () {
        pageDoctor = 0;
        $scope.currentPageDoctor = pageDoctor;
        selectGetOrSearchDoctor();
        $('#first-page-doctor').addClass('disabled');
        $('#pre-page-doctor').addClass('disabled');
        $('#next-page-doctor').removeClass('disabled');
        $('#final-page-doctor').removeClass('disabled');
    };

    $scope.prePageDoctor = function () {
        pageDoctor--;
        $scope.currentPageDoctor = pageDoctor;
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
        $scope.currentPageDoctor = pageDoctor;
        selectGetOrSearchDoctor();
        console.log(totalDoctor - 1);
        if (pageDoctor == totalPageDoctor - 1) {
            $('#next-page-doctor').addClass('disabled');
            $('#final-page-doctor').addClass('disabled');
        }
        $('#first-page-doctor').removeClass('disabled');
        $('#pre-page-doctor').removeClass('disabled');
    };

    $scope.finalPageDoctor = function () {
        pageDoctor = totalPageDoctor - 1;
        $scope.currentPageDoctor = pageDoctor;
        selectGetOrSearchDoctor();
        $('#next-page-doctor').addClass('disabled');
        $('#final-page-doctor').addClass('disabled');
        $('#first-page-doctor').removeClass('disabled');
        $('#pre-page-doctor').removeClass('disabled');
    };

    $scope.setBackgroundPrefixIdAppointment = function () {
        $('#label-appointment-id').addClass('active');
        $('#prefix-appointment-id').addClass('active');
    };

    $scope.changePrefix = function (my) {
        $(my).css('color', '#00bcd4');
    };

    $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 200,
        format: 'yyyy-mm-dd',
        container: 'body'
    });

    $('#time-starttime input').ptTimeSelect({
        onClose: function (i) {
            $scope.startTime = $(i).val() + "";
            var m = moment(new Date($scope.appointment.appointDay + " " + $scope.startTime)).format('YYYY-MM-dd HH:mm:ss') + "";
            var dd = new Date(moment(new Date('2015-10-09 11:13 PM')).format('EEE, dd MMM YYYY HH:mm:ss zzz'));
            console.log(moment(new Date('2015-10-09 11:23 PM')).format('YYYY-MM-d HH:mm:ss') + ',,,,,,,,,,,,,,,,,,,,,,,');

            $('#label-starttime').addClass('active');
            $('#prefix-starttime').addClass('active');
        }
    });

    $('#time-endtime input').ptTimeSelect({
        onClose: function (i) {
            $scope.endTime = $(i).val() + "";
            console.log($scope.endTime);
            $('#label-endtime').addClass('active');
            $('#prefix-endtime').addClass('active');
        }
    });

    $scope.clickDelete = function () {
        $('#modal-delete-appointment').openModal();
    };

    $scope.clickPatient = function () {
        getPatient();
        countPatient();
        $('#modal-patient').openModal();
    };

    $scope.clickDoctor = function () {
        getDoctor();
        countDoctor();
        $('#modal-doctor').openModal();
    };
});