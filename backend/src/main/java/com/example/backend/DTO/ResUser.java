package com.example.backend.DTO;

import com.example.backend.Entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResUser {
    private UUID id;

    private String phone;

    private String password;

    private List<Role> roles;
}
