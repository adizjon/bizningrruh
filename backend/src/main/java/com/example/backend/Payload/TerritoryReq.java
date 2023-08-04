package com.example.backend.Payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TerritoryReq {
    private String title;

    private String region;

    private Double longitude;

    private Double latitude;

    private Boolean active;

    private String code;
}
