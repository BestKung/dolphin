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
import th.co.geniustree.dental.model.PriceAndExpireProduct;
import th.co.geniustree.dental.repo.PriceAndExpireProductRepo;

/**
 *
 * @author Jasin007
 */
@RestController
public class PriceAndExpireProductController {

    @Autowired
    PriceAndExpireProductRepo priceAndExpireProductRepo;

    @RequestMapping(value = "/loadpriceandexpireproduct")
    public Page<PriceAndExpireProduct> loadPriceAndExpireProduct(Pageable pageable) {
        return priceAndExpireProductRepo.findAll(pageable);
    }

    @RequestMapping(value = "/savepriceandexpireproduct", method = RequestMethod.POST)
    public void savePriceAndExpireProduct(@RequestBody PriceAndExpireProduct priceAndExpireProduct) {
        priceAndExpireProductRepo.save(priceAndExpireProduct);
    }

    @RequestMapping(value = "/deletepriceandexpireproduct", method = RequestMethod.POST)
    public void deletePriceAndExpireProduct(@RequestBody PriceAndExpireProduct priceAndExpireProduct) {
        priceAndExpireProductRepo.delete(priceAndExpireProduct.getId());
    }

    @RequestMapping(value = "/totalpriceandexpireproduct", method = RequestMethod.GET)
    public Long getTotalPriceAndExpireProduct() {
        return priceAndExpireProductRepo.count();
    }
}
