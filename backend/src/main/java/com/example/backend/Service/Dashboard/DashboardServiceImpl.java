package com.example.backend.Service.Dashboard;

import com.example.backend.DTO.DateAndPhoneDto;
import com.example.backend.Entity.User;
import com.example.backend.Repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DeshboardService {
    private final UserRepo userRepo;
    @Override
    public HttpEntity<?> getProjecttion() {
        List<User> roleSuperAdmin = userRepo.findByRolesName("ROLE_SUPER_ADMIN");
        LocalDate localDate = LocalDate.now();
        String currentDate = localDate.getDayOfMonth() +", " +localDate.getMonth().name();
        DateAndPhoneDto dateAndPhoneDto = new DateAndPhoneDto(
                roleSuperAdmin.get(0).getPhone(),
                currentDate
        );
        System.out.println(dateAndPhoneDto);
        return ResponseEntity.ok(dateAndPhoneDto);
    }

}
