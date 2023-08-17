package com.example.backend.Payload;

import com.example.backend.Entity.CustomerCategory;
import com.example.backend.Entity.Territory;
import jakarta.persistence.Column;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientDto {
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String address;
    @Column(nullable = false)
    private String phone;
    @Column(nullable = false)
    private String tin;
    @Column(nullable = false)
    private String companyName;
    @Column(nullable = false)
    private Double longitude;
    @Column(nullable = false)
    private Boolean active;
    @Column(nullable = false)
    private Double latitude;
    @Column(nullable = false)
    private Integer customerCategoryId;
    @Column(nullable = false)
    private UUID territoryId;
    public String getValidationErrorMessage="Oops something went wrong..🤭";
    public boolean isValid() {
        return isNotNullOrEmpty(name)
                && isNotNullOrEmpty(address)
                && isNotNullOrEmpty(phone)
                && isNotNullOrEmpty(tin)
                && isNotNullOrEmpty(companyName)
                && isNotNull(active)
                && isNotNull(customerCategoryId)
                && isNotNull(territoryId);
    }

    private boolean isNotNull(UUID territoryId) {
        if (territoryId!=null){
            return true;
        }else {
            this.getValidationErrorMessage="Territory id is null🌵";
            return false;
        }
//        return territoryId != null;
    }

    private boolean isNotNullOrEmpty(String value) {
        if (value != null && !value.trim().isEmpty()){
            return true;
        }else {
            this.getValidationErrorMessage="There should be no empty string✍️";
            return false;
        }
//        return value != null && !value.trim().isEmpty();
    }

    private boolean isNotNull(Boolean value) {
        if (value != null){
            this.getValidationErrorMessage="Field Active can't be null👎";
            return true;
        }else {
            return false;
        }
//        return value != null;
    }

    private boolean isNotNull(Integer value) {
        if (value != null){
            return true;
        }else {
            return false;
        }
//        return value != null;
    }
}
