package com.example.backend.Service.TerritoryService;

import com.example.backend.Entity.Territory;
import com.example.backend.Payload.TerritoryReq;
import com.example.backend.Repository.TerritoryRepo;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.*;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TerritoryServiceImpl implements TerritoryService {
    private final TerritoryRepo territoryRepo;

    @Override
    public HttpEntity<?> addTerritory(TerritoryReq territoryReq) {
        Territory save = territoryRepo.save(
                new Territory(
                        territoryReq.getTitle(),
                        territoryReq.getRegion(),
                        territoryReq.getLongitude(),
                        territoryReq.getLatitude(),
                        territoryReq.getActive(),
                        territoryReq.getCode()
                )
        );
        return ResponseEntity.ok(save);
    }

    @Override
    public ResponseEntity<byte[]> downloadTerritoryAsExcel(Integer page, Integer size, Boolean active, String search) throws IOException {
        Pageable pageable = PageRequest.of(page - 1, size);

        Page<Territory> territories;
        if (active == null) {
            territories = territoryRepo.findAllByTitleContainsIgnoreCaseOrRegionContainsIgnoreCase(search, search, pageable);
        } else {
            territories = territoryRepo.findAllByActiveAndTitleContainsIgnoreCaseOrRegionContainsIgnoreCase(active, search, search, pageable);
        }
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Territories");
        List<Territory> territoryList = territories.getContent();

        Row headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("ID");
        headerRow.createCell(1).setCellValue("Title");
        headerRow.createCell(2).setCellValue("Region");

        for (int i = 0; i < territoryList.size(); i++) {
            Territory territory = territoryList.get(i);
            Row dataRow = sheet.createRow(i + 1);
            dataRow.createCell(0).setCellValue(territory.getId().toString());
            dataRow.createCell(1).setCellValue(territory.getTitle());
            dataRow.createCell(2).setCellValue(territory.getRegion());
        }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        workbook.close();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "territories.xlsx");
        return new ResponseEntity<>(outputStream.toByteArray(), headers, HttpStatus.OK);
    }

    @Override
    public HttpEntity<?> getTerritories(Integer page, Integer size, Boolean active, String search) {
        Pageable pageable = PageRequest.of(page - 1, size);
        if (active == null) {
            Page<Territory> all = territoryRepo.findAllByTitleContainsIgnoreCaseOrRegionContainsIgnoreCase(search, search, pageable);
            return ResponseEntity.ok(all);
        }
        Page<Territory> all = territoryRepo.findAllByActiveAndTitleContainsIgnoreCaseOrRegionContainsIgnoreCase(active, search, search, pageable);
        return ResponseEntity.ok(all);
    }

    @Override
    public HttpEntity<?> editTerritory(UUID id, TerritoryReq territoryReq) {
        Optional<Territory> optionalTerritory = territoryRepo.findById(id);
        if (optionalTerritory.isPresent()) {
            Territory territory = optionalTerritory.get();
            territory.setTitle(territoryReq.getTitle());
            territory.setRegion(territoryReq.getRegion());
            territory.setLongitude(territoryReq.getLongitude());
            territory.setLatitude(territoryReq.getLatitude());
            territory.setActive(territoryReq.getActive());
            territory.setCode(territoryReq.getCode());
            Territory save = territoryRepo.save(territory);
            return ResponseEntity.ok(save);
        }
        return ResponseEntity.notFound().build();
    }
}