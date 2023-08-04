package com.example.backend.Repository;

import com.example.backend.Entity.Territory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TerritoryRepo extends JpaRepository<Territory, UUID> {
    Territory findByActive(Boolean  active);

    Page<Territory> findAllByTitleContainsIgnoreCaseOrRegionContainsIgnoreCase(String search, String search1, Pageable pageable);

    Page<Territory> findAllByActiveAndTitleContainsIgnoreCaseOrRegionContainsIgnoreCase(Boolean active, String search, String search1, Pageable pageable);
}
