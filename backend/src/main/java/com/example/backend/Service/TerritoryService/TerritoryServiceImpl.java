package com.example.backend.Service.TerritoryService;

import com.example.backend.DTO.TerritoryDto;
import com.example.backend.Entity.Territory;
import com.example.backend.Repository.TerritoryRepo;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TerritoryServiceImpl implements TerritoryService {
    private final TerritoryRepo territoryRepo;

    @Override
    public void addTerritory(TerritoryDto territoryDto) {
        String title = territoryDto.getTitle();
        String region = territoryDto.getRegion();
        Double longitude = territoryDto.getLongitude();
        Double latitude = territoryDto.getLatitude();
        boolean active = territoryDto.getActive();
        String code = territoryDto.getCode();
        territoryRepo.save(new Territory(title, region, longitude, latitude, active, code));
    }

    @Override
    public HttpEntity<?> getTerritories() {
        return ResponseEntity.ok(territoryRepo.findAll());
    }

    @Override
    public void editTerritory(UUID id, TerritoryDto territoryDto) {
        Territory territory = territoryRepo.findById(id).get();
        territory.setTitle(territoryDto.getTitle());
        territory.setRegion(territoryDto.getRegion());
        territory.setLongitude(territoryDto.getLongitude());
        territory.setLatitude(territoryDto.getLatitude());
        territory.setActive(territoryDto.getActive());
        territory.setCode(territoryDto.getCode());
        territoryRepo.save(territory);
    }

    @Override
    public ResponseEntity<InputStreamResource> uploadEcxel(List<TerritoryDto> territoryPayload) {
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Territory Data");
            int rowIdx = 0;
            // Create a header row
            Row headerRow = sheet.createRow(rowIdx++);
            headerRow.createCell(0).setCellValue("title");
            headerRow.createCell(1).setCellValue("region");
            headerRow.createCell(2).setCellValue("active");
            headerRow.createCell(3).setCellValue("code");
            headerRow.createCell(4).setCellValue("longitude");
            headerRow.createCell(5).setCellValue("latitude");
            // Add other headers as needed

            // Fill in data rows
            for (TerritoryDto territory : territoryPayload) {
                Row dataRow = sheet.createRow(rowIdx++);
                dataRow.createCell(0).setCellValue(territory.getTitle());
                dataRow.createCell(1).setCellValue(territory.getRegion());
                dataRow.createCell(2).setCellValue(territory.getActive());
                dataRow.createCell(3).setCellValue(territory.getCode());
                dataRow.createCell(4).setCellValue(territory.getLongitude());
                dataRow.createCell(5).setCellValue(territory.getLatitude());
                // Add other data as needed
            }

            // Convert the workbook to a byte array
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            workbook.write(baos);
            byte[] bytes = baos.toByteArray();

            // Prepare the response for download
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Disposition", "attachment; filename=territory.xlsx");

            // Create an InputStreamResource from the byte array
            InputStreamResource inputStreamResource = new InputStreamResource(new ByteArrayInputStream(bytes));

            return ResponseEntity
                    .ok()
                    .headers(headers)
                    .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                    .body(inputStreamResource);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

}