package com.example.backend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "clients")
@Entity
@Builder
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;

    private String address;

    private String phone;

    private String tin;

    private String companyName;

    private String longitude;
    private String lat;
    private Boolean active;
    @OneToOne
    private CustomerCategory customerCategory;
    @OneToOne
    private Territory territory;
}


