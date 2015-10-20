var app = angular.module('app', ['checklist-model', 'ngRoute', 'employee', 'department'
            , 'employee-information', 'doctor', 'doctor-information', 'patient'
            , 'bill', 'detailHeal', 'listSelectHeal', 'priceAndExpireProduct', 'product', 'typeProduct', 'unitProduct', 'lot',
    'patient-information', 'appointment']);
var app = angular.module('app');
app.controller('homeController', function ($scope, $http) {
    $scope.login = {};
    checkMobile();
    function  checkMobile() {
        var $mobile = $(window).outerWidth() < 995;
        if ($mobile) {
            $('#nav-topic').css('display', 'none');
            $('body').css('overflow-y', 'hidden');
            $('#view').removeAttr('style').addClass('.margin-top');
            console.log('mobile');
        }
    }

    startPageStaff();
    function startPageStaff() {
        $http.get('/startpagestaff').success(function (data) {
            $scope.login = data;
            hasLogin();
        });
    }

    $scope.changcolor = function () {
        $('.color1').toggleClass('color2');
        $('.text-sky').toggleClass('text-sky-grann');
    };


    function hasLogin() {
        if (!!$scope.login.id) {
            $('#login').removeClass('btn-blue').addClass('btn-red').html('Logout');
        }
    }

    $scope.clickLogout = function () {
        console.log(!!$('#logout').hasClass('.btn-red'));
        if (!!$scope.login.id) {
            location.href = "/logout";
            console.log('logout');
        }
    };


});

app.factory('employeeService', function () {
    return {
        employeeUpdate: {}, doctorUpdate: {}
    };
});

app.factory('patientService', function () {
    return {
        patienUpdate: {}
    };
});

app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        controller: 'homeController',
        templateUrl: 'pages/home.html'

    }).when('/employee', {
        controller: 'employeeController',
        templateUrl: 'pages/employee.html'

    }).when('/department', {
        controller: 'departmentController',
        templateUrl: 'pages/department.html'
    }).when('/employee/information', {
        controller: 'employeeInformationController',
        templateUrl: 'pages/employee-information.html'
    }).when('/doctor', {
        controller: 'doctorController',
        templateUrl: 'pages/doctor.html'
    }).when('/doctor/information', {
        controller: 'doctorInformationController',
        templateUrl: 'pages/doctor-information.html'
    }).when('/patient', {
        controller: 'patientController',
        templateUrl: 'pages/patient.html'
    }).when('/listselectheal', {
        controller: 'listSelectHealController',
        templateUrl: 'pages/listselectheal.html'
    }).when('/detailheal', {
        controller: 'detailHealController',
        templateUrl: 'pages/detailheal.html'
    }).when('/unitproduct', {
        controller: 'unitProductController',
        templateUrl: 'pages/unitproduct.html'
    }).when('/typeproduct', {
        controller: 'typeProductController',
        templateUrl: 'pages/typeproduct.html'
    }).when('/lot', {
        controller: 'lotController',
        templateUrl: 'pages/lot.html'
    }).when('/product', {
        controller: 'productController',
        templateUrl: 'pages/product.html'
    }).when('/price-and-expire-prooduct', {
        controller: 'priceAndExpireProductController',
        templateUrl: 'pages/price-and-expire-prooduct.html'
    }).when('/bill', {
        controller: 'billController',
        templateUrl: 'pages/bill.html'
    }).when('/patient/information', {
        controller: 'patientInformationController',
        templateUrl: 'pages/patient-information.html'
    }).when('/appointment', {
        controller: 'appointmentController',
        templateUrl:'pages/appointment.html'
    }).otherwise({
        redirectTo: '/'
    });
});