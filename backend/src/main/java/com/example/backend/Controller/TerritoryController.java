package com.example.backend.Controller;

import com.example.backend.DTO.TerritoryDto;
import com.example.backend.Entity.Territory;
import com.example.backend.Payload.TerritoryReq;
import com.example.backend.Repository.TerritoryRepo;
import com.example.backend.Service.TerritoryService.TerritoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/territory")
@CrossOrigin
@RequiredArgsConstructor
public class TerritoryController {
    private final TerritoryService territoryService;
    private final TerritoryRepo territoryRepo;

    @PostMapping
    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    public void addTerritory(@RequestBody TerritoryReq territoryReq) {
        territoryService.addTerritory(territoryReq);
    }

    @GetMapping("/excel")
    @PreAuthorize("hasAnyRole('ROLE_SUPER_ADMIN')")
    public ResponseEntity<byte[]> downloadTerritoriesAsExcel(
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "5") Integer size,
            @RequestParam(defaultValue = "") Boolean active,
            @RequestParam(defaultValue = "") String search
    ) throws IOException {
        return territoryService.downloadTerritoryAsExcel(page, size, active, search);
    }

    @GetMapping
    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    public HttpEntity<?> t(
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "5") Integer size,
            @RequestParam(defaultValue = "") Boolean active,
            @RequestParam(defaultValue = "") String search
    ) throws IOException {
        return territoryService.getTerritories(page, size, active, search);
    }

    @GetMapping("/get")
    public HttpEntity<?> get() throws IOException {
        List<Territory> all = territoryRepo.findAll();
        System.out.println(all);
        return ResponseEntity.of(Optional.of(all));
    }


    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    public HttpEntity<?> editTerritory(@PathVariable UUID id, @RequestBody TerritoryReq territoryReq) {
        return territoryService.editTerritory(id, territoryReq);
    }
}