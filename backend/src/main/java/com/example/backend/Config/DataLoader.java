package com.example.backend.Config;

import com.example.backend.Entity.*;
import com.example.backend.Repository.CompanyRepo;
import com.example.backend.Repository.RoleRepo;
import com.example.backend.Repository.SettingRepo;
import com.example.backend.Repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Configuration
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {
    private final RoleRepo roleRepo;
    private final UserRepo userRepo;
    private final PasswordEncoder encoder;
    private final CompanyRepo companyRepo;
    private final SettingRepo settingRepo;

    @Override
    public void run(String... args) throws Exception {
        List<Role> all = roleRepo.findAll();
        if (all.size() == 0) {
            List<Role> tempRoles = new ArrayList<>();
            tempRoles.add(new Role(RoleEnum.ROLE_SUPER_ADMIN));
            List<Role> roles = roleRepo.saveAll(tempRoles);
            User user = new User(
                    "asadbek",
                    "998948668666",
                    encoder.encode("12345678"),
                    roles
            );
            userRepo.save(user);
        }

        List<SettingPanel> settingPanel = new ArrayList<>(
                List.of(
                        new SettingPanel("Company Profile", "/companyProfile"),
                        new SettingPanel("Payment Method", "/paymentMethod"),
                        new SettingPanel("Territory", "/territory"),
                        new SettingPanel("Units of measurement", "/unitsOfMeasurement"),
                        new SettingPanel("Customer Category", "/customerCategory"),
                        new SettingPanel("Client type", "/clientType"),
                        new SettingPanel("Company Profile", "/company"),
                        new SettingPanel("Product Category", "/productCategory"),
                        new SettingPanel("Product", "/product"),
                        new SettingPanel("Price Type", "/priceType"),
                        new SettingPanel("Price", "/price"),
                        new SettingPanel("Reasons for rejection", "/reasonsForRejection")
                )
        );
        if (settingRepo.findAll().size() == 0) {
            settingRepo.saveAll(settingPanel);
        }

        if (companyRepo.findAll().size() == 0) {
            Company company = new Company(
                    "buxoro",
                    "shiftacademy",
                    "asadbek",
                    "948668666",
                    "adizjonovasadbek906@gmail.com",
                    "buxoro kidoblar olami yonida"
            );
            companyRepo.save(company);
        }
    }
}