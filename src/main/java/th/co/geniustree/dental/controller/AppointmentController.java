/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.controller;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import th.co.geniustree.dental.model.Appointment;
import th.co.geniustree.dental.model.SearchData;
import th.co.geniustree.dental.repo.AppointmentRepo;
import th.co.geniustree.dental.service.AppointmentService;
import th.co.geniustree.dental.spec.AppointmentSpec;

/**
 *
 * @author Best
 */
@RestController
public class AppointmentController {

    @Autowired
    private AppointmentRepo appointmentRepo;
    @Autowired
    private AppointmentService appointmentService;

    @RequestMapping(value = "/saveappointment", method = RequestMethod.POST)
    private void saveAppointment(@RequestBody Appointment appointment, Pageable pageable) throws ParseException {
        appointment.setStatus("2");
        appointmentRepo.save(appointment);
    }

    @RequestMapping(value = "/getappointment", method = RequestMethod.GET)
    private Page<Appointment> getAppointment(Pageable pageable) {
        return appointmentRepo.findAll(pageable);
    }

    @RequestMapping(value = "/searchappointment", method = RequestMethod.POST)
    private Page<Appointment> searchAppointment(@RequestBody SearchData searchData, Pageable pageable) throws ParseException {
        Page<Appointment> appointments = null;
        String ketyword = searchData.getKeyword();
        String searchBy = searchData.getSearchBy();
        System.out.println("----------------------------------------------->Keyword" + ketyword);
        if ("ชื่อคนไข้".equals(searchBy)) {
            System.out.println("-------------------------------------------patient");
            appointments = appointmentService.searchByPatientName(ketyword, pageable);
        }
        if ("ชื่อทันคเเพทย์".equals(searchBy)) {
            System.out.println("-------------------------------------------Doctor");
            appointments = appointmentService.searchByDoctorName(ketyword, pageable);
        }
        if ("เบอร์โทรศัพท์".equals(searchBy)) {
            System.out.println("-------------------------------------------mobile");
            appointments = appointmentService.searchByMobile(ketyword, pageable);
        }
        if ("วันที่นัด".equals(searchBy)) {
            System.out.println("-------------------------------------------day");
            DateFormat sim = new SimpleDateFormat("yyyy-MM-dd", Locale.US);
            Date date = sim.parse(ketyword);
            appointments = appointmentService.searchByAppointmentDay(date, pageable);
        }
        return appointments;
    }

    @RequestMapping(value = "/countappointment", method = RequestMethod.GET)
    private long countAppointment() {
        return appointmentRepo.count();
    }

    @RequestMapping(value = "/countsearchappointment", method = RequestMethod.POST)
    private long countSearchAppointment(@RequestBody SearchData searchData) throws ParseException {
        String keyword = searchData.getKeyword();
        String searchBy = searchData.getSearchBy();
        long count = 0;
        if ("ชื่อคนไข้".equals(searchBy)) {
            System.out.println("-------------------------------------------patient");
            count = appointmentRepo.count(AppointmentSpec.namePatientLike("%" + keyword + "%"));
        }
        if ("ชื่อทันคเเพทย์".equals(searchBy)) {
            System.out.println("-------------------------------------------Doctor");
            count = appointmentRepo.count(AppointmentSpec.nameDoctorLike("%" + keyword + "%"));
        }
        if ("เบอร์โทรศัพท์".equals(searchBy)) {
            System.out.println("-------------------------------------------mobile");
            count = appointmentRepo.count(AppointmentSpec.mobileLike("%" + keyword + "%"));
        }
        if ("วันที่นัด".equals(searchBy)) {
            System.out.println("-------------------------------------------day");
            DateFormat sim = new SimpleDateFormat("yyyy-MM-dd", Locale.US);
            Date date = sim.parse(keyword);
            count = appointmentRepo.count(AppointmentSpec.appointmentDate(date));
        }
        return count;
    }

    @RequestMapping(value = "/deleteappointment", method = RequestMethod.POST)
    private void deleteAppointment(@RequestBody Integer id) {
        appointmentRepo.delete(id);
    }

    @RequestMapping(value = "/appointmentnontificationcount", method = RequestMethod.GET)
    private Long appointmentNontificationCount(Pageable pageable) {
        Long count = (long) appointmentRepo.findByStatus("1").size();
        List<Appointment> listAppointment = appointmentRepo.findByStatus("2");
        for (int i = 0; i < listAppointment.size(); i++) {
            Appointment appointment = new Appointment();
            appointment = listAppointment.get(i);
            SimpleDateFormat dateFormat = new SimpleDateFormat("D");
            System.out.println("---------------------------------------------->Date Format" + dateFormat.format(appointment.getAppointDay()));
            if (((Integer.parseInt(dateFormat.format(appointment.getAppointDay())) - Integer.parseInt(dateFormat.format(new Date()))) == 2)
                    || (Integer.parseInt(dateFormat.format(appointment.getAppointDay())) - Integer.parseInt(dateFormat.format(new Date()))) == 1) {
                appointment.setStatus("1");
                appointmentRepo.save(appointment);
                count++;
            }
        }
        return count;
    }
    
    private Page<Appointment> getAppointmentNontification(Pageable pageable){
    return null;
    }

}
