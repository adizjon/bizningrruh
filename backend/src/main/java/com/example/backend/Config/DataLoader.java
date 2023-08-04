package com.example.backend.Config;

import com.example.backend.Entity.Company;
import com.example.backend.Entity.Role;
import com.example.backend.Entity.SettingPanel;
import com.example.backend.Entity.User;
import com.example.backend.Repository.CompanyRepo;
import com.example.backend.Repository.RoleRepo;
import com.example.backend.Repository.SettingRepo;
import com.example.backend.Repository.UserRepo;
import com.example.backend.Service.Deshboard.DeshboardService;
import com.example.backend.Service.Deshboard.DeshboardServiceImpl;
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
            tempRoles.add(new Role("ROLE_SUPER_ADMIN"));
            List<Role> roles = roleRepo.saveAll(tempRoles);
            User user = new User(
                    "asadbek",
                    "998948668666",
                    encoder.encode("123"),
                    roles
            );
            SettingPanel settingPanel1 = new SettingPanel(
                    UUID.randomUUID(),
                    "Company Profile",
                    "/companyProfile"
            );

            SettingPanel settingPanel2 = new SettingPanel(
                    UUID.randomUUID(),
                    "Payment Method",
                    "/paymentMethod"
            );
            SettingPanel settingPanel3 = new SettingPanel(
                    UUID.randomUUID(),
                    "Units of measurement",
                    "/unitsOfMeasurement"
            );
            SettingPanel settingPanel4=new SettingPanel(
                    UUID.randomUUID(),
                    "Territory",
                    "/territory"
            );

            SettingPanel settingPanel5 = new SettingPanel(
                    UUID.randomUUID(),
                    "Customer Category",
                    "/customerCategory"
            );
            settingRepo.save(settingPanel5);
            SettingPanel settingPanel6 = new SettingPanel(
                    UUID.randomUUID(),
                    "Client type",
                    "/clientType"
            );
            SettingPanel settingPanel7 = new SettingPanel(
                    UUID.randomUUID(),
                    "Company Profile",
                    "/company"
            );
            SettingPanel settingPanel8 = new SettingPanel(
                    UUID.randomUUID(),
                    "Product Category",
                    "/productCategory"
            );
            SettingPanel settingPanel9 = new SettingPanel(
                    UUID.randomUUID(),
                    "Product",
                    "/product"
            );
            SettingPanel settingPanel10 = new SettingPanel(
                    UUID.randomUUID(),
                    "Price Type",
                    "/priceType"
            );
            SettingPanel settingPanel11 = new SettingPanel(
                    UUID.randomUUID(),
                    "Price",
                    "/price"
            );
            SettingPanel settingPanel12 = new SettingPanel(
                    UUID.randomUUID(),
                    "Reasons for rejection",
                    "/reasonsForRejection"
            );

            userRepo.save(user);
            settingRepo.saveAll(List.of(settingPanel1, settingPanel2, settingPanel3, settingPanel4, settingPanel5, settingPanel6, settingPanel7, settingPanel8, settingPanel9, settingPanel10, settingPanel11, settingPanel12));
            Company company = new Company("buxoro", "shiftacademy", "asadbek", "948668666", "adizjonovasadbek906@gmail.com", "buxoro kidoblar olami yonida");
            companyRepo.save(company);
        }

    }
}