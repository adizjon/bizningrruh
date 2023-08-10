package com.example.backend.Payload;

import com.example.backend.Entity.CustomerCategory;
import com.example.backend.Entity.Territory;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientDto {
    private String name;
    private String address;
    private String phone;
    private String tin;
    private String companyName;
    private String longitude;
    private Boolean active;
    private String lat;
    private Integer customerCategoryId;
    private UUID territoryId;
}
