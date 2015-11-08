/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import th.co.geniustree.dental.model.Department;
import th.co.geniustree.dental.repo.DepartmentRepo;

/**
 *
 * @author Best
 */
@RestController
public class DepartmentController {
    
    @Autowired
    private DepartmentRepo departmentRepo;
    
    @RequestMapping(value = "/savedepartment", method = RequestMethod.POST)
    public void saveDepartment(@RequestBody Department department) {
        departmentRepo.save(department);
    }
    
    @RequestMapping(value = "/getdepartment", method = RequestMethod.GET)
    public Page<Department> getDepartment(Pageable pageable) {
        return departmentRepo.findAll(pageable);
    }
    
    @RequestMapping(value = "/deletedepartment", method = RequestMethod.POST)
    public void deleteDepartment(@RequestBody Department department) {
        departmentRepo.delete(department.getId());
    }
    
}
