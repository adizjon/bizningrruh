package com.example.backend.Service.TerritoryService;


import com.example.backend.DTO.TerritoryDto;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.UUID;

public interface TerritoryService {
    void addTerritory(TerritoryDto territoryDto);

    HttpEntity<?> getTerritories();

    void editTerritory(UUID id, TerritoryDto territoryDto);

    ResponseEntity<InputStreamResource> uploadEcxel(List<TerritoryDto> territoryPayload);

}
