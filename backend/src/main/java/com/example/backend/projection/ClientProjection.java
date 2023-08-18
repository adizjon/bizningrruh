package com.example.backend.projection;

import java.time.LocalDate;
import java.util.UUID;

public interface ClientProjection {
    UUID getId();

    String getName();

    String getAddress();

    String getPhone();

    String getTin();

    LocalDate getRegistrationDate();

    String getTerritoryName();

    String getCategoryName();

    String getCompanyName();

    Double getLongitude();

    Double getLatitude();

    Boolean getActive();



}