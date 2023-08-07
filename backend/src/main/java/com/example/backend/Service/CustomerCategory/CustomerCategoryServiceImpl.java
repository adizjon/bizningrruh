package com.example.backend.Service.CustomerCategory;

import com.example.backend.Entity.CustomerCategory;
import com.example.backend.Repository.CustomerCategoryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomerCategoryServiceImpl implements CustomerCategoryServices {
    private final CustomerCategoryRepo customerCategoryRepo;

    @Override
    public Object getCustomerCategory() {
        return customerCategoryRepo.findAll();
    }

    @Override
    public void addCustomerCategory(CustomerCategory customerCategory) {
        customerCategoryRepo.save(customerCategory);
    }

    @Override
    public void putCustomerCategory(Integer id, CustomerCategory customerCategory) {
        CustomerCategory customerCategory1 = new CustomerCategory(
                id,
                customerCategory.getName(),
                customerCategory.getDescription(),
                customerCategory.getCode(),
                customerCategory.isActive()
        );
        customerCategoryRepo.save(customerCategory1);
    }
}
