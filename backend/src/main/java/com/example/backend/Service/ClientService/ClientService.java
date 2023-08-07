package com.example.backend.Service.ClientService;

import com.example.backend.Payload.ClientDto;
import org.springframework.http.HttpEntity;

import java.util.UUID;

public interface ClientService {
    HttpEntity<?> getClients();

    HttpEntity<?> postCliet(ClientDto clientDto);

    void deleteClient(UUID id);

    HttpEntity<?> putClient(ClientDto clientDto, UUID id);
}
