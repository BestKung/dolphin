angular.module('calendarPatient', []);
angular.module('calendarPatient')
        .controller('calendarPatientController', function ($scope, $http) {


            $scope.title = '';
            $scope.start = '';
            $scope.end = '';

            $scope.dateClick = '';

            setAppointment();
            function setAppointment() {
                var events = [];
                $http.get('/getappointment').success(function (data) {
                    for (var i = 0; i < data.content.length; i++) {
                        events.push({title: data.content[i].patient.name
//                                    +" \nนัดกับหมอ \n "+
//                                    +" \n "+data.content[i].doctor.nameTh 
                                    + " \n " + data.content[i].patient.mobile,
                            start: data.content[i].appointDay + 'T' + data.content[i].startTime,
                            end: data.content[i].appointDay + 'T' + data.content[i].endTime
                        });
                    }
                    getAppointment(events);
                });
            }

            function getAppointment(events) {
                $('#fullcalendar').fullCalendar({
                    height: 650,
                    contentHeight: 600,
                    header: {
                        left: 'prevYear,prev,today,next,nextYear',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay'
                    },
                    //กำหนดสีเข้ม ทั้งแถบวันและเวลา
                    businessHours: {
                        start: '00:00',
                        end: '24:00',
                        dow: [1, 2, 3, 4, 5, 6]
                    },
                    events: events,
                    //ซ่อนวันคอลัม ที่ จะไม่เอา
                    hiddenDays: [0],
                    //จัดการ format ปุ่มที่ math หน้า
                    views: {
                        month: {
                            titleFormat: 'YYYY-MM,DD'
                        },
                        agendaWeek: {
                            titleFormat: 'YYYY-MM,DD'
                        },
                        agendaDay: {
                            titleFormat: 'YYYY-MM-DD'
                        }
                    },
                    eventClick: function (calEvent) {
                        $scope.title = calEvent.title;
                        $scope.start = moment(new Date(new Date(calEvent.start).getFullYear(), new Date(calEvent.start).getMonth(), new Date(calEvent.start).getDate()
                                , new Date(calEvent.start).getHours() - 7)).format('YYYY-MM-D เวลา hh:mm a');
                        $scope.end = moment(new Date(new Date(calEvent.end).getFullYear(), new Date(calEvent.end).getMonth(), new Date(calEvent.end).getDate()
                                , new Date(calEvent.end).getHours() - 7)).format('YYYY-MM-D เวลา hh:mm a');
                        setAppointment();
                        $('#modal-showDataEvent').openModal();
                    },
                    dayClick: function (date) {
                        $scope.dateClick = date.format();
                        setAppointment();
                        $('#modal-showDataDay').openModal();
                    }
                });
            }
        });
