/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.controller;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import th.co.geniustree.dental.model.DetailHeal;
import th.co.geniustree.dental.model.SearchData;
import th.co.geniustree.dental.repo.DetailHealRepo;
import th.co.geniustree.dental.service.DetailHealService;

/**
 *
 * @author Jasin007
 */
@RestController
public class DetailHealController {
    
     @Autowired
     private DetailHealRepo detailHealRepo;
    
     @RequestMapping(value = "/savedetailheal" , method = RequestMethod.POST)
     public void saveDetailHeal(@RequestBody DetailHeal detailHeal){
     detailHealRepo.save(detailHeal);
     }
     
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
    
    @Autowired
    private DetailHealService detailHealService;

    @RequestMapping(value = "/loaddetailheal/searchdetailheal", method = RequestMethod.POST)
    public Page<DetailHeal> search(@RequestBody SearchData searchData,Pageable pageable) throws ParseException{
        String keyword = searchData.getKeyword();
        String searchBy = searchData.getSearchBy();
        Page<DetailHeal> detailHeals = null;
        if("NamePatient".equals(searchBy)){
            detailHeals = detailHealService.searchByPatient(keyword, pageable);
        }
        if("NameDoctor".equals(searchBy)){
            detailHeals = detailHealService.searchByDoctor(keyword, pageable);
        }
        if("DateHeal".equals(searchBy)){
            DateFormat df = new SimpleDateFormat("yyyy-MM-dd" , Locale.US);
            Date keywordDate= df.parse(keyword);
            detailHeals = detailHealService.searchByDateHeal(keywordDate, pageable);
        }
        return detailHeals;
    }
}
