package com.example.backend.Controller;

import com.example.backend.DTO.TerritoryDto;
import com.example.backend.Service.TerritoryService.TerritoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/territory")
@RequiredArgsConstructor
public class TerritoryController {
    private final TerritoryService territoryService;

    @PostMapping
    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    public void addTerritory(@RequestBody TerritoryDto territoryDto) {
        territoryService.addTerritory(territoryDto);
    }


    @PostMapping("/upload")
    public ResponseEntity<InputStreamResource> downloadExcel(@RequestBody List<TerritoryDto> territoryPayload) {
        return territoryService.uploadEcxel(territoryPayload);
    }

    @GetMapping
    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    public HttpEntity<?> getTerritories() {
        return territoryService.getTerritories();
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    public void editTerritory(@PathVariable UUID id, @RequestBody TerritoryDto territoryDto) {
        territoryService.editTerritory(id, territoryDto);
    }
}