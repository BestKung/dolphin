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
import th.co.geniustree.dental.model.Product;
import th.co.geniustree.dental.repo.ProductRepo;

/**
 *
 * @author Jasin007
 */
@RestController
public class ProductController {

    @Autowired
    private ProductRepo productRepo;

    @RequestMapping(value = "/loadlproduct")
    public Page<Product> loadProduct(Pageable pageable) {
        return productRepo.findAll(pageable);
    }

    @RequestMapping(value = "/saveproduct", method = RequestMethod.POST)
    public void saveProduct(@RequestBody Product product) {
        productRepo.save(product);
    }

    @RequestMapping(value = "/deleteproduct", method = RequestMethod.POST)
    public void deleteProduct(@RequestBody Product product) {
        productRepo.delete(product.getId());
    }

    @RequestMapping(value = "/totalproduct", method = RequestMethod.GET)
    public Long getTotalProduct() {
        return productRepo.count();
    }
}
