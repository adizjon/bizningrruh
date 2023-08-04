package com.example.backend.Repository;

import com.example.backend.Entity.Teretory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface TerritoryRepo extends JpaRepository<Teretory, UUID> {
    Teretory findByActive(Boolean  active);
}
