package com.example.backend.Repository;

import com.example.backend.Entity.Territory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TerritoryRepo extends JpaRepository<Territory, UUID> {
    Territory findByActive(Boolean  active);
}
