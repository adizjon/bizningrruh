package com.example.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DateAndPhoneDto {
    private String phone;
    private String localDate;


    public Collection<Object> getCurrentDate() {
        return null;
    }
}
