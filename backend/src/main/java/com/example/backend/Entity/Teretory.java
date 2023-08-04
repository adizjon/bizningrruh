package com.example.backend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "teretory")
public class Teretory {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String title;
    private String region;
    private Double longitude;
    private Double latitude;
    private Boolean active;
    private String code;
    public Teretory(String title, String region, Double longitude, Double latitude, Boolean active, String code) {
        this.title = title;
        this.region = region;
        this.longitude = longitude;
        this.latitude = latitude;
        this.active = active;
        this.code = code;
    }
}
