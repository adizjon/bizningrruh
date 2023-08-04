package com.example.backend.Service.SettingService;

import com.example.backend.Repository.SettingRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SettingServiceImpl implements SettingService{
     private final SettingRepo settingRepo;
    @Override
    public HttpEntity<?> getSettings() {
        return ResponseEntity.ok(settingRepo.findAll());
    }

}
