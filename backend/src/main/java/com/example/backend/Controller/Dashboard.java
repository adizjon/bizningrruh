package com.example.backend.Controller;

import com.example.backend.Service.Dashboard.DeshboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/dashboard")
@CrossOrigin
public class Dashboard {
    private final DeshboardService deshboardService;
    @GetMapping
    public HttpEntity<?> getDashboard() {
        return ResponseEntity.ok(deshboardService.getDashboardInfo());
    }
}
