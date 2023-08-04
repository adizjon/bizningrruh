package com.example.backend.Service.Deshboard;

import com.example.backend.DTO.DateAndPhoneDto;
import com.example.backend.Entity.User;
import com.example.backend.Repository.UserRepo;
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

public class DashboardServiceImplTest {

    @Mock
    private UserRepo userRepo;

    @InjectMocks
    private DashboardServiceImpl deshboardService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetProjecttion() {
        // Mocking the User entity
        String phoneNumber = "1234567890";
        User user = new User();
        user.setPhone(phoneNumber);

        // Mocking the UserRepo.findByRolesName() method
        List<User> roleSuperAdmin = new ArrayList<>();
        roleSuperAdmin.add(user);
        when(userRepo.findByRolesName("ROLE_SUPER_ADMIN")).thenReturn(roleSuperAdmin);

        // Call the method to be tested
        ResponseEntity<?> responseEntity = (ResponseEntity<?>) deshboardService.getProjecttion();

        // Verify the response status code
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

        // Verify the response body
        Object responseBody = responseEntity.getBody();
        assertEquals(DateAndPhoneDto.class, responseBody.getClass());
        DateAndPhoneDto dateAndPhoneDto = (DateAndPhoneDto) responseBody;
        assertEquals(phoneNumber, dateAndPhoneDto.getPhone());

        // Verify that the currentDate field is not null or empty
        assertEquals(false, dateAndPhoneDto.getCurrentDate().isEmpty());
    }
}
