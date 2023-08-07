package com.example.backend.Service.CustomerCategory;

import com.example.backend.Entity.CustomerCategory;
import org.springframework.stereotype.Service;

public interface CustomerCategoryServices {

    Object getCustomerCategory();

    void addCustomerCategory(CustomerCategory customerCategory);

    void putCustomerCategory(Integer id, CustomerCategory customerCategory);
}
