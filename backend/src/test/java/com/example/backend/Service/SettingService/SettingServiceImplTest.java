package com.example.backend.Service.SettingService;

import com.example.backend.Entity.SettingPanel;
import com.example.backend.Repository.SettingRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

public class SettingServiceImplTest {

    @Mock
    private SettingRepo settingRepo;

    @InjectMocks
    private SettingServiceImpl settingService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetSettings() {
        // Mocking the list of settings
        List<SettingPanel> settingsList = new ArrayList<>();
        settingsList.add(new SettingPanel());
        settingsList.add(new SettingPanel());

        // Mocking the SettingRepo.findAll() method
        when(settingRepo.findAll()).thenReturn(settingsList);

        // Call the method to be tested
        ResponseEntity<?> responseEntity = (ResponseEntity<?>) settingService.getSettings();

        // Verify the response status code
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

        // Verify the response body
        Object responseBody = responseEntity.getBody();
        assertEquals(List.class, responseBody.getClass());
        List<?> settingsResponse = (List<?>) responseBody;
        assertEquals(2, settingsResponse.size());

        // You can further verify the content of the settingsResponse list if needed.
        // For example, you can check if it contains the expected Setting objects.
        // Here, we are just verifying the size of the list.

        // If the Setting class has appropriate equals/hashCode methods, you can use
        // assertEquals(settingsList, settingsResponse) for more detailed verification.
    }
}
