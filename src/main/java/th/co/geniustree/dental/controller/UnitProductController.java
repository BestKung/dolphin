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
import th.co.geniustree.dental.model.UnitProduct;
import th.co.geniustree.dental.repo.UnitProductRepo;

/**
 *
 * @author Jasin007
 */
@RestController
public class UnitProductController {

    @Autowired
    private UnitProductRepo unitProductRepo;

    @RequestMapping(value = "/loadunitproduct")
    public Page<UnitProduct> loadUnitProduct(Pageable pageable) {
        return unitProductRepo.findAll(pageable);
    }

    @RequestMapping(value = "/saveunitproduct", method = RequestMethod.POST)
    public void saveUnitProduct(@RequestBody UnitProduct unitProduct) {
        unitProductRepo.save(unitProduct);
    }

    @RequestMapping(value = "/deleteunitproduct", method = RequestMethod.POST)
    public void deleteUnitProduct(@RequestBody UnitProduct unitProduct) {
        unitProductRepo.delete(unitProduct.getId());
    }

    @RequestMapping(value = "/totalunitproduct", method = RequestMethod.GET)
    public Long getTotalUnitProduct() {
        return unitProductRepo.count();
    }
}
