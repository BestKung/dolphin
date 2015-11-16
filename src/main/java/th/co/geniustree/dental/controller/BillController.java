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
import th.co.geniustree.dental.model.Bill;
import th.co.geniustree.dental.model.DetailHealAndTmpProduct;
import th.co.geniustree.dental.model.OrderProduct;
import th.co.geniustree.dental.model.SearchData;
import th.co.geniustree.dental.repo.BillRepo;
import th.co.geniustree.dental.repo.OrderBillRepo;
import th.co.geniustree.dental.repo.OrderProductRepo;
import th.co.geniustree.dental.service.BillService;
import th.co.geniustree.dental.spec.BillSpec;

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

    @Autowired
    private OrderProductRepo orderProductRepo;

    @Autowired
    private BillService billService;

//    @RequestMapping(value = "/loadbill")
//    public Page<Bill2> loadBill(Pageable pageable) {
//        return billRepo.findAll(pageable);
//    }
    @RequestMapping(value = "/savebill", method = RequestMethod.POST)
    public void saveBill(@RequestBody DetailHealAndTmpProduct detailHealAndTmpProduct) {
        System.out.println("-------------------------------------------------------------> detailheal"+detailHealAndTmpProduct.getDetailHeal());
        Bill bill = new Bill();
        bill.setDateBill(detailHealAndTmpProduct.getDay());
//        if(detailHealAndTmpProduct.getDetailHeal().getId() != null){
        bill.setDetailHeal(detailHealAndTmpProduct.getDetailHeal());
//        }
        bill.setSumPrice(detailHealAndTmpProduct.getSumPrice());
        bill.setId(detailHealAndTmpProduct.getId());
        billRepo.save(bill);
        for (int i = 0; i < detailHealAndTmpProduct.getTmpProducts().size(); i++) {

            OrderProduct orderProduct = new OrderProduct();
            orderProduct.setPriceAndExpireProduct(detailHealAndTmpProduct.getTmpProducts().get(i).getPriceAndExpireProduct());
            orderProduct.setValue(detailHealAndTmpProduct.getTmpProducts().get(i).getValue());
            orderProduct.setBill(bill);
            orderProductRepo.save(orderProduct);
        }

    }

    @RequestMapping(value = "/getbill", method = RequestMethod.GET)
    public Page<Bill> getBill(Pageable pageable) {
        return billRepo.findAll(pageable);
    }

    @RequestMapping(value = "/searchBill", method = RequestMethod.POST)
    public Page<Bill> serchBill(@RequestBody SearchData searchData, Pageable pageable) throws ParseException {
        String searchBy = searchData.getSearchBy();
        String keyword = searchData.getKeyword();
        Page<Bill> bills = null;
        if ("DateBill".equals(searchBy)) {
            DateFormat sim = new SimpleDateFormat("yyyy-MM-dd", Locale.US);
            Date date = sim.parse(keyword);
            bills = billService.searchByDateBill(date, pageable);
        }
        if ("SumPrice".equals(searchBy)) {
            bills = billService.searchBySumPrice(new Double(keyword), pageable);
        }
        return bills;
    }

    @RequestMapping(value = "/countbill", method = RequestMethod.GET)
    public long countBill() {
        return billRepo.count();
    }
    
    @RequestMapping(value = "/countsearchbill" , method = RequestMethod.POST)
    public long countSearchBill(@RequestBody SearchData searchData) throws ParseException{
    String searchBy = searchData.getSearchBy();
        String keyword = searchData.getKeyword();
        long count = 0;
        if ("DateBill".equals(searchBy)) {
            DateFormat sim = new SimpleDateFormat("yyyy-MM-dd", Locale.US);
            Date date = sim.parse(keyword);
            count = billRepo.count(BillSpec.dateBillLike(date));
        }
        if ("SumPrice".equals(searchBy)) {
            count = billRepo.count(BillSpec.sumPriceLike(new Double(keyword)));
        }
        return count;
    }

//    @RequestMapping(value = "/saveorderbill", method = RequestMethod.POST)
//    public void saveOrderBill(@RequestBody UpdateOrderBill updateOrderBill) {
//        OrderBill[] orderBills = updateOrderBill.getOrderBill();
//        Integer[] id = updateOrderBill.getId();
//        if (id.length != 0) {
//            for (int i = 0; i < id.length; i++) {
//                orderBillRepo.delete(id[i]);
//            }
//        }
//        for (OrderBill orderBill : orderBills) {
//            orderBill.setBill(idBill);
//            orderBillRepo.save(orderBill);
//        }
//    }
//    @RequestMapping(value = "/saveiddetailheal", method = RequestMethod.POST)
//    public void saveIdPayheal(@RequestBody OrderBill orderBill) {
//        orderBill.setBill(idBill);
//        orderBillRepo.save(orderBill);
//    }
    @RequestMapping(value = "/deletebill", method = RequestMethod.POST)
    public void deleteBill(@RequestBody Bill bill) {
        billRepo.delete(bill.getId());
    }

    @RequestMapping(value = "/totalbill", method = RequestMethod.GET)
    public Long getTotalBill() {
        return billRepo.count();
    }

}
