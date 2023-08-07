package com.example.backend.Controller;

import com.example.backend.Entity.CustomerCategory;
import com.example.backend.Repository.CustomerCategoryRepo;
import com.example.backend.Service.CustomerCategory.CustomerCategoryServices;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("customerCategory")
public class CustomerCategoryController {
    private final CustomerCategoryRepo customerCategoryRepo;
    private final CustomerCategoryServices customerCategoryServices;

    @GetMapping
    public HttpEntity<?> getCustomerCategory() {
        return ResponseEntity.ok(customerCategoryServices.getCustomerCategory());
    }

    @PostMapping
    public HttpEntity<?> addCustomerCategory(@RequestBody CustomerCategory customerCategory) {
        customerCategoryServices.addCustomerCategory(customerCategory);
        return ResponseEntity.ok("qo'shildi");
    }

    @PutMapping("/put/{id}")
    public HttpEntity<?> putCustomerCategory(@RequestBody CustomerCategory customerCategory,@PathVariable Integer id) {
        System.out.println("o");
        System.out.println(customerCategory);
        System.out.println(id);
        customerCategoryServices.putCustomerCategory(id,customerCategory);
        return ResponseEntity.ok("o'zgartirildi");
    }
}
