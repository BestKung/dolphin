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
import th.co.geniustree.dental.model.DetailHeal;
import th.co.geniustree.dental.repo.DetailHealRepo;

/**
 *
 * @author Jasin007
 */
@RestController
public class DetailHealController {
    
     @Autowired
     private DetailHealRepo detailHealRepo;
    
    @RequestMapping(value = "/loaddetailheal")
    public Page<DetailHeal> loadOrderHeal(Pageable pageable){
        return detailHealRepo.findAll(pageable);
    }
    
    @RequestMapping(value = "/deletedetailheal",method = RequestMethod.POST)
    public void deleteDetailHeal(@RequestBody DetailHeal detailHeal){
        detailHealRepo.delete(detailHeal.getId());
    }
    
    @RequestMapping(value = "/totaldetailheal", method = RequestMethod.GET)
    public Long getTotalDetailHeal() {
        return detailHealRepo.count();
    }
}
