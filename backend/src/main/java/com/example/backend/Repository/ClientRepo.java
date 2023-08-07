package com.example.backend.Repository;

import com.example.backend.Entity.Client;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ClientRepo extends JpaRepository<Client, UUID> {
//    findAllByTitleContainsIgnoreCaseOrRegionContainsIgnoreCase


    List<Client> findAllByNameContainsIgnoreCaseOrAddressContainsIgnoreCaseOrPhoneContainsIgnoreCaseOrTinContainsIgnoreCaseOrCompanyNameContainsIgnoreCase(String quickSearchValue, String quickSearchValue1, String quickSearchValue2, String quickSearchValue3, String quickSearchValue4, Pageable pageable);
}
