package com.example.backend.Service.ClientService;

import com.example.backend.Payload.ClientDto;
import com.example.backend.Payload.SearchDto;
import org.springframework.http.HttpEntity;

import java.util.UUID;

public interface ClientService {

    HttpEntity<?> postClient(ClientDto clientDto);

    void deleteClient(UUID id);

    HttpEntity<?> putClient(ClientDto clientDto, UUID id);


    HttpEntity<?> getClients(Boolean active, String quickSearchValue,Integer page,Integer size,Integer customerCategory);
}
