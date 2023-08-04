package com.example.backend.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class SettingPanel {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String settingCategory;
    private String navigation;

    public SettingPanel(String settingCategory, String navigation) {
        this.settingCategory = settingCategory;
        this.navigation = navigation;
    }
}
