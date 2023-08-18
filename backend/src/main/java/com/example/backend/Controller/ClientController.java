package com.example.backend.Controller;

import com.example.backend.Payload.ClientDto;
import com.example.backend.Repository.ClientRepo;
import com.example.backend.Service.ClientService.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/client")
@RequiredArgsConstructor
@CrossOrigin
public class ClientController {
    private final ClientService clientService;


    @GetMapping
    public HttpEntity<?> getClients(
            @RequestParam(defaultValue = "") String city,
            @RequestParam(defaultValue = "") String customerCategory,
            @RequestParam(defaultValue = "") Boolean active,
            @RequestParam(defaultValue = "") Boolean tin,
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "10") Integer size
    ) {
        List<UUID> cities = city.isEmpty() ? List.of() : Arrays.stream(city.split(",")).map(UUID::fromString).toList();
        List<Integer> customerCategories = customerCategory.isEmpty() ? List.of() : Arrays.stream(city.split(",")).map(Integer::parseInt).toList();
        return clientService.getClients(cities, customerCategories, active, tin, search,page,size);
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
