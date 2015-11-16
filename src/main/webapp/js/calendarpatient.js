angular.module('calendarPatient', []);
angular.module('calendarPatient')
        .controller('calendarPatientController', function ($scope, $http) {

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
                    hiddenDays: [],
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
                    }



                });
            }
        });
