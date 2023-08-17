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
    @Column(unique = true)
    private String phone;

    private String tin;

    private String companyName;

    private Double longitude;

    private Double latitude;

    private Boolean active;

    @ManyToOne
    private CustomerCategory customerCategory;

    @ManyToOne
    private Territory territory;
}


