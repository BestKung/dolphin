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
import th.co.geniustree.dental.model.ListSelectHeal;
import th.co.geniustree.dental.repo.ListSelectHealRepo;

/**
 *
 * @author Jasin007
 */
@RestController
public class ListSelectHealController {

    @Autowired
    private ListSelectHealRepo listSelectHealRepo;

    @RequestMapping(value = "/loadlistselectheal")
    public Page<ListSelectHeal> loadListSelectHeal(Pageable pageable) {
        return listSelectHealRepo.findAll(pageable);
    }
    
    @RequestMapping(value = "/savelistselectheal",method = RequestMethod.POST)
    public void saveListSelectHeal(@RequestBody ListSelectHeal listSelectHeal){
        listSelectHealRepo.save(listSelectHeal);
    }
    
    
    @RequestMapping(value = "/deletelistselectheal",method = RequestMethod.POST)
    public void deleteListSelectHeal(@RequestBody ListSelectHeal listSelectHeal){
        listSelectHealRepo.delete(listSelectHeal.getId());
    }
    
     @RequestMapping(value = "/totallistselectheal", method = RequestMethod.GET)
    public Long getTotalListSelectHeal() {
        return listSelectHealRepo.count();
    }
}
