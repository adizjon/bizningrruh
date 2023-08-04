package com.example.backend.Service.SettingService;

import org.springframework.http.HttpEntity;

public interface SettingService {
    HttpEntity<?> getSettings();
}
