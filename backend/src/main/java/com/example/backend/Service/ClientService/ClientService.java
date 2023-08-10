package com.example.backend.Service.ClientService;

import com.example.backend.Payload.ClientDto;
import org.springframework.http.HttpEntity;

import java.util.List;
import java.util.UUID;

public interface ClientService {

    HttpEntity<?> postCliet(ClientDto clientDto);

    void deleteClient(UUID id);

    HttpEntity<?> putClient(ClientDto clientDto, UUID id);

    HttpEntity<?> getClients(List<UUID> city, List<UUID> customerCategory, Boolean active, Boolean tin, String search);

}
