/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.validator;

import com.google.common.base.Strings;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;
import th.co.geniustree.dental.model.Employee;
import th.co.geniustree.dental.repo.EmployeeRepo;

/**
 *
 * @author BestKung
 */
public class EmailUniqueValidator implements ConstraintValidator<EmailUnique, String> {

    @Autowired
    private EmployeeRepo employeeRepo;

    @Override
    public void initialize(EmailUnique a) {

    }

    @Override
    public boolean isValid(String t, ConstraintValidatorContext cvc) {
        System.out.println("----------------------------------------------------------------------------------------->Hello");
        if (Strings.isNullOrEmpty(t)) {
            return true;
        }
        Employee findByEmailIgnoreCase = employeeRepo.findByEmailIgnoreCase(t);
        return findByEmailIgnoreCase == null;
    }
}
