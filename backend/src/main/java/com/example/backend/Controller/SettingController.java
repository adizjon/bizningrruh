package com.example.backend.Controller;

import com.example.backend.Service.SettingService.SettingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/setting")
@RequiredArgsConstructor
@CrossOrigin
public class SettingController {
    private final SettingService settingService;
      @GetMapping
    public HttpEntity<?> getSettings(){
          return settingService.getSettings();
      }
}
