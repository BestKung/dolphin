angular.module('appointment', []);
angular.module('appointment').controller('appointmentController', function ($scope, $http) {

    $scope.appointment = {};
    $scope.startTime = "";
    $scope.endTime = "";
    $scope.warpAppointmane = {};
    $scope.patients = {};
    $scope.searchData = {};
    $scope.totalPatient = 0;
    $scope.patient = {};
    var pagePatient = 0;
    var totalPage = 0;

    $scope.saveAppointment = function () {
        console.log(moment($scope.appointment.appointDay));
        console.log(new Date($scope.appointment.appointDay));
        $scope.warpAppointmane.appointment = $scope.appointment;
        $http.post('/saveappointment', $scope.appointment).success(function (data) {
            console.log('save Success');
        });
    };

    getPatient();
    function getPatient() {
        $http.get('/getpatient', {params: {page: pagePatient, size: 10}}).success(function (data) {
            $scope.patients = data;
            console.log(data);
        });
    }


   $scope.selectPatient = function (patient){
       $scope.appointment.patient = patient;
       $scope.patient = patient;
   };
   
    $scope.searchPatient = function () {
        $http.post('/searchpatient', $scope.searchData).success(function (data) {
            $scope.patients = data;
        });
    };

    countPatient();
    function countPatient() {
        $http.get('/countpatient').success(function (data) {
            $scope.totalPatient = data;
            findTotalPage();
            console.log('total page : ' + totalPage);
        });
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

    function countSearchPatient() {
        $http.post('/countsearchpatient', $scope.search).success(function (data) {
            $scope.totalPatient = data;
            findTotalPage();
        });
    }

    function findTotalPage() {
        var totalpages = parseInt($scope.totalPatient / 10);
        if (($scope.totalPatient % $scope.size) != 0) {
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
           //getPatient();
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
            //getPatient();
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
           //getPatient();
            if (pagePatient == totalPage - 1) {
                $('#next-page').addClass('disabled');
                $('#final-page').addClass('disabled');
            }
            $('#pre-page').removeClass('disabled');
            $('#first-page').removeClass('disabled');
        }
    };

    $scope.finalPage = function () {
        if (!$('#final-page').hasClass('disabled')) {
            pagePatient = totalPage - 1;
            $scope.currentPage = pagePatient;
            selectGetOrSearch();
            //getPatient();
            if (pagePatient == totalPage - 1) {
                $('#final-page').addClass('disabled');
                $('#next-page').addClass('disabled');
            }
            $('#pre-page').removeClass('disabled');
            $('#first-page').removeClass('disabled');
        }
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
            $scope.appointment.startTime = new Date(moment(new Date($scope.appointment.appointDay + " " + $scope.startTime)).format('YYYY-MM-d HH:mm:ss'));
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
            $scope.appointment.endTime = new Date(moment(new Date($scope.appointment.appointDay + " " + $scope.endTime)).format('YYYY-MM-d HH:mm:ss'));
            console.log($scope.endTime);
            $('#label-endtime').addClass('active');
            $('#prefix-endtime').addClass('active');
        }
    });

    $scope.clickPatient = function () {
        $('#modal-patient').openModal();
    };
});