package com.example.backend.projection;

import java.util.UUID;

public interface ClientProjection {
    UUID getId();

    String getName();

    String getAddress();

    String getPhone();

    String getTin();

    String getRegistrationDate();

    String getCategoryName();

    String getTerritoryName();

    String getCompanyName();

    String getLongitude();

    String getLatitude();

    String getActive();


}