package com.example.backend.Repository;

import com.example.backend.Entity.Client;
import com.example.backend.projection.ClientProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface ClientRepo extends JpaRepository<Client, UUID> {
    @Query(value = """

            select cl.id as id,cl.name as name, cl.address as address,
                  cl.phone as phone, cl.tin as tin,\s
                  cc.name as categoryName,t.title as territoryName ,cl.company_name as companyName,cl.longitude as longitude,
                  cl.latitude as latitude, cl.active as active
           from clients cl
                    inner join territory t on cl.territory_id = t.id
                    inner join customer_category cc on cl.customer_category_id = cc.id
           where (:active is null or cl.active = :active)
             and (
                   (:tin = true and cl.tin is not null) or
                   (:tin = false and cl.tin is null) or
                   (:tin is null)
               )
             and (:city is null or cl.territory_id in :city)
             and (:categories is null or cl.customer_category_id in :categories)
             and (
                   :search is null
                   or LOWER(cl.name) like CONCAT(LOWER(:search), '%')
                   or LOWER(cl.address) like CONCAT(LOWER(:search), '%')
                   or LOWER(cl.phone) like CONCAT(LOWER(:search), '%')
                   or LOWER(cl.tin) like CONCAT(LOWER(:search), '%')
                   or LOWER(cc.name) like CONCAT(LOWER(:search), '%')
                   or LOWER(t.title) like CONCAT(LOWER(:search), '%')
                   or LOWER(cl.company_name) like CONCAT(LOWER(:search), '%')
                )
                
            """, nativeQuery = true)
    Page<ClientProjection> findClientsByFilters(
            Boolean tin,
            List<Integer> categories,
            Boolean active,
            List<UUID> city,
            String search,
            Pageable pageable
    );

}
