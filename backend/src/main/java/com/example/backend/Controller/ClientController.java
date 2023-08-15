package com.example.backend.Controller;

import com.example.backend.Payload.ClientDto;
import com.example.backend.Service.ClientService.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/client")
@RequiredArgsConstructor
@CrossOrigin
public class ClientController {
    private final ClientService clientService;

    @GetMapping
    public HttpEntity<?> getClients(
            @RequestParam(defaultValue = "") List<UUID> city,
            @RequestParam(defaultValue = "") List<UUID> customerCategory,
            @RequestParam(defaultValue = "") Boolean active,
            @RequestParam(defaultValue = "") Boolean tin,
            @RequestParam(defaultValue = "") String search
    ) {
        return clientService.getClients(city, customerCategory, active, tin,search);
    }

    @GetMapping("/search")
    public HttpEntity<?> getDataInFilter() {
        return null;
    }

    @PostMapping
    public HttpEntity<?> postClient(@RequestBody ClientDto clientDto) {
        return clientService.postCliet(clientDto);
    }

    @DeleteMapping("/{id}")
    public void deleteClient(@PathVariable UUID id) {
        clientService.deleteClient(id);
    }

    @PutMapping("/{id}")
    public HttpEntity<?> editMapping(@RequestBody ClientDto clientDto, @PathVariable UUID id) {
        return clientService.putClient(clientDto, id);
    }
}