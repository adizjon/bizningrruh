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
<<<<<<< HEAD
    private String longitude;
    private String lat;
    @OneToOne
    private CustomerCategory customerCategory;
    @OneToOne
    private Territory territory;
}
=======

    private String longitude;

    private String latitude;

    @ManyToOne
    private CustomerCategory customerCategory;

    @ManyToOne
    private Territory territory;
}
>>>>>>> 2f8acbd2a2924039f92aab20941c251bf706b23b
