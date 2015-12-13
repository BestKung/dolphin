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
import th.co.geniustree.dental.model.PriceAndExpireProduct;
import th.co.geniustree.dental.model.SearchData;
import th.co.geniustree.dental.repo.PriceAndExpireProductRepo;
import th.co.geniustree.dental.service.PriceAndExpireProductService;
import th.co.geniustree.dental.spec.PriceAndExpireProductSpec;

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

    @Autowired
    private PriceAndExpireProductService priceAndExpireProductService;

    @RequestMapping(value = "/loadpriceandexpireproduct/searchpriceandexpireproduct", method = RequestMethod.POST)
    public Page<PriceAndExpireProduct> searchPriceAndExpireProduct(@RequestBody SearchData searchData, Pageable pageable) throws ParseException {
        String keyword = searchData.getKeyword();
        String searchBy = searchData.getSearchBy();
        Page<PriceAndExpireProduct> priceAndExpireProducts = null;
        DateFormat df = new SimpleDateFormat("yyy-MM-dd", Locale.US);
        if ("LotIn".equals(searchBy)) {
            Date keywordDate = df.parse(keyword);
            priceAndExpireProducts = priceAndExpireProductService.searchByLot(keywordDate, pageable);
        }
        if ("NameProduct".equals(searchBy)) {
            priceAndExpireProducts = priceAndExpireProductService.searchByProduct(keyword, pageable);
        }
        if ("Expire".equals(searchBy)) {
            Date keywordDate = df.parse(keyword);
            priceAndExpireProducts = priceAndExpireProductService.searchByExpire(keywordDate, pageable);
        }
        return priceAndExpireProducts;
    }

    @RequestMapping(value = "/countsearchpriceandexpireproduct", method = RequestMethod.POST)
    public long countSearchPriceAndExpireProduct(@RequestBody SearchData searchData) throws ParseException {
        long count = 0;
        String keyword = searchData.getKeyword();
        String searchBy = searchData.getSearchBy();
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd", Locale.US);
        if ("LotIn".equals(searchBy)) {
            Date keywordDate = df.parse(keyword);
            count = priceAndExpireProductRepo.count(PriceAndExpireProductSpec.lotInBetween(keywordDate));
        }
        if ("NameProduct".equals(searchBy)) {
            count = priceAndExpireProductRepo.count(PriceAndExpireProductSpec.productLike("%" + keyword + "%"));
        }
        if ("Expire".equals(searchBy)) {
            Date keywordDate = df.parse(keyword);
            count = priceAndExpireProductRepo.count(PriceAndExpireProductSpec.expireBetween(keywordDate));
        }
        return count;
    }

    @RequestMapping(value = "/countoutproduct" , method = RequestMethod.GET)
    public Long countOutProduct() {
        long count = 0;
        long sizeAllProduct = priceAndExpireProductRepo.findAll().size();
        for (int i = 0; i < sizeAllProduct; i++) {
            PriceAndExpireProduct priceAndExpireProduct = new PriceAndExpireProduct();
            priceAndExpireProduct = priceAndExpireProductRepo.findAll().get(i);
            if ((priceAndExpireProduct.getNotificationsValue() >= priceAndExpireProduct.getValue()) && ("1".equals(priceAndExpireProduct.getStatusNontificationValue()))) {
                count++;
            }
        }
        return count;
    }
    
    @RequestMapping(value = "/getoutproduct", method = RequestMethod.GET)
    public Page<PriceAndExpireProduct> getOutProduct(Pageable pageable){
        return priceAndExpireProductService.searchByvalueLessThanOrEqualNontificationValue(pageable);
    }
    
    
}
