/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.spec;

import java.util.Date;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;
import th.co.geniustree.dental.model.Lot_;
import th.co.geniustree.dental.model.PriceAndExpireProduct;
import th.co.geniustree.dental.model.PriceAndExpireProduct_;
import th.co.geniustree.dental.model.Product_;

/**
 *
 * @author Jasin007
 */
public class PriceAndExpireProductSpec {
    
    public static Specification<PriceAndExpireProduct> productLike(final String keyword){
        return new Specification<PriceAndExpireProduct>() {

            @Override
            public Predicate toPredicate(Root<PriceAndExpireProduct> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                return cb.like(cb.upper(root.get(PriceAndExpireProduct_.product).get(Product_.name)), keyword.toUpperCase());
            }
        };
    }
    
    public static Specification<PriceAndExpireProduct> expireLike(final Date keyword){
        return new Specification<PriceAndExpireProduct>() {

            @Override
            public Predicate toPredicate(Root<PriceAndExpireProduct> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
               return cb.between(root.get(PriceAndExpireProduct_.expire), keyword, keyword);
            }
        };
    }
    
    public static Specification<PriceAndExpireProduct> lotLike(final Date keyword){
        return new Specification<PriceAndExpireProduct>() {

            @Override
            public Predicate toPredicate(Root<PriceAndExpireProduct> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
               return cb.between(root.get(PriceAndExpireProduct_.lot).get(Lot_.dateIn), keyword, keyword);
            }
        };
    }
    
  
}
