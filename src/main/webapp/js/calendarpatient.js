angular.module('calendarPatient', []);
angular.module('calendarPatient').controller('calendarPatientController', function ($scope, $http) {

    getAppointment();
    function getAppointment() {
        $http.get('/getappointment').success(function (data) {
            $scope.appointments = data;
            $(document).ready(function () {
                $('#fullcalendar').fullCalendar({
                    height: 650,
                    contentHeight: 600,
                    header: {
                        left: 'prevYear,prev,today,next,nextYear',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay'
                    },
                    businessHours: {
                        start: '00:00',
                        end: '24:00',
                        dow: [1, 2, 3, 4, 5, 6]
                    },
                    events: [
                        {
                            title: 'มีนัดนะ',
                            start: '2015-11-11T13:00',
                            end: '2015-11-11T14:00'
                        }
                    ],
                    color: 'yellow', // an option!
                    textColor: 'black' // an option!
                });
            });
        });
    }


});
