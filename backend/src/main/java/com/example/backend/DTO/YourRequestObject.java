package com.example.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class YourRequestObject {
    private List<UUID> city;
    private List<UUID> customerCategory;
    private Boolean active;
    private Boolean tin;
    private String search;

    // getters and setters
}