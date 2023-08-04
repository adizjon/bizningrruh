package com.example.backend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "clients")
@Entity
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String name;
    private String address;
    private String phone;
    private String tin;
    private String companyName;
    private String longititude;
    private String lat;
    @ManyToOne
//    ???
    private CustomerCategory customerCategory;
    @ManyToOne
    private Territory territory;
//    ???
}
