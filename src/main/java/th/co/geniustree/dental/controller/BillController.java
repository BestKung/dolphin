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
import th.co.geniustree.dental.model.Bill;
import th.co.geniustree.dental.model.OrderBill;
import th.co.geniustree.dental.model.OrderHeal;
import th.co.geniustree.dental.model.UpdateOrderBill;
import th.co.geniustree.dental.repo.BillRepo;
import th.co.geniustree.dental.repo.OrderBillRepo;
import th.co.geniustree.dental.repo.OrderHealRepo;
import th.co.geniustree.dental.repo.PriceAndExpireProductRepo;

/**
 *
 * @author Jasin007
 */
@RestController
public class BillController {

    @Autowired
    private BillRepo billRepo;

    @Autowired
    private OrderBillRepo orderBillRepo;

    private Bill idBill;

    @RequestMapping(value = "/loadbill")
    public Page<Bill> loadBill(Pageable pageable) {
        return billRepo.findAll(pageable);
    }

    @RequestMapping(value = "/savebill", method = RequestMethod.POST)
    public void saveBill(@RequestBody Bill bill) {
        billRepo.save(bill);
        idBill = bill;
    }

    @RequestMapping(value = "/saveorderbill", method = RequestMethod.POST)
    public void saveOrderBill(@RequestBody UpdateOrderBill updateOrderBill) {
        OrderBill[] orderBills = updateOrderBill.getOrderBill();
        Integer[] id = updateOrderBill.getId();
        if (id.length != 0) {
            for (int i = 0; i < id.length; i++) {
                orderBillRepo.delete(id[i]);
            }
        }
        for (OrderBill orderBill : orderBills) {
            orderBill.setBill(idBill);
            orderBillRepo.save(orderBill);
        }
    }

    @RequestMapping(value = "/saveiddetailheal", method = RequestMethod.POST)
    public void saveIdPayheal(@RequestBody OrderBill orderBill) {
        orderBill.setBill(idBill);
        orderBillRepo.save(orderBill);
    }

    @RequestMapping(value = "/deletebill", method = RequestMethod.POST)
    public void deleteBill(@RequestBody Bill bill) {
        billRepo.delete(bill.getId());
    }

    @RequestMapping(value = "/totalbill", method = RequestMethod.GET)
    public Long getTotalBill() {
        return billRepo.count();
    }

}
