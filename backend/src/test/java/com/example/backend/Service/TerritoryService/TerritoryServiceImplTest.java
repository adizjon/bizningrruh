package com.example.backend.Service.TerritoryService;

import com.example.backend.DTO.TerritoryDto;
import com.example.backend.Entity.Teretory;
import com.example.backend.Repository.TerritoryRepo;
import com.example.backend.Service.TerritoryService.TerritoryServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.core.io.InputStreamResource;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class TerritoryServiceImplTest {
    @Mock
    private TerritoryRepo territoryRepo;
    @InjectMocks
    private TerritoryServiceImpl territoryService;
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }
    @Test
    void testAddTerritory() {
        TerritoryDto territoryDto = new TerritoryDto();
        territoryDto.setActive(true);
        territoryDto.setCode("lala");
        territoryDto.setTitle("blablabla");
        territoryDto.setRegion("nonono");
        territoryDto.setLatitude(1.32);
        territoryDto.setLongitude(1.35);
        territoryService.addTerritory(territoryDto);
        verify(territoryRepo, times(1)).save(any(Teretory.class));
    }
    @Test
    void testGetTerritories() {
        // Mock the behavior of territoryRepo.findAll()
        List<Teretory> territories = new ArrayList<>();
        // Add some territories to the list
        when(territoryRepo.findAll()).thenReturn(territories);

        HttpEntity<?> response = territoryService.getTerritories();

        // Assert that the response is not null and contains the expected data
        // Add relevant assertions here
    }
    @Test
    void testEditTerritory() {
        UUID territoryId = UUID.randomUUID();
        TerritoryDto territoryDto = new TerritoryDto();
        // Set the properties of territoryDto
        Teretory territory = new Teretory();
        // Set the properties of territory
        when(territoryRepo.findById(territoryId)).thenReturn(Optional.of(territory));
        territoryService.editTerritory(territoryId, territoryDto);
        // Verify that the territoryRepo.save() method was called with the updated territory
        verify(territoryRepo, times(1)).save(territory);
    }
}