package com.example.backend.Repository;

import com.example.backend.Entity.CustomerCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomerCategoryRepo extends JpaRepository<CustomerCategory, Integer> {

    List<CustomerCategory> findALlByActive(Boolean type);
}
