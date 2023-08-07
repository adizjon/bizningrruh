package com.example.backend.Service.CustomerCategory;

import com.example.backend.Entity.CustomerCategory;

import java.util.List;

public interface CustomerCategoryServices {

    Object getCustomerCategory();

    void addCustomerCategory(CustomerCategory customerCategory);

    void putCustomerCategory(Integer id, CustomerCategory customerCategory);

    List<CustomerCategory> getInType(Boolean type);
}
