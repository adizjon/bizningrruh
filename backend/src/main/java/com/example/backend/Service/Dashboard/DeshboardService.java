package com.example.backend.Service.Dashboard;

import org.springframework.http.HttpEntity;

public interface DeshboardService {
    HttpEntity<?> getDashboardInfo();
}
