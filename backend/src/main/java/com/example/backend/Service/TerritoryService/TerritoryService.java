package com.example.backend.Service.TerritoryService;


import com.example.backend.DTO.TerritoryDto;
import com.example.backend.Payload.TerritoryReq;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

public interface TerritoryService {
    HttpEntity<?> addTerritory(TerritoryReq territoryReq);

    HttpEntity<?> getTerritories(Integer page, Integer size, Boolean active, String search);

    void editTerritory(UUID id, TerritoryDto territoryDto);

    ResponseEntity<byte[]> downloadTerritoryAsExcel(Integer page, Integer size, Boolean active, String search) throws IOException;
}
