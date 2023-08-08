package com.example.backend.Controller;

import com.example.backend.Payload.ClientDto;
import com.example.backend.Payload.SearchDto;
import com.example.backend.Service.ClientService.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/client")
@RequiredArgsConstructor
public class ClientController {
    private final ClientService clientService;
    @GetMapping
    public HttpEntity<?> getClients(@RequestParam(required = false,defaultValue = "false") Boolean active,@RequestParam(required = false) String quickSearchValue,@RequestParam(required = false,defaultValue = "") Integer page,@RequestParam(required = false,defaultValue = "") Integer size,@RequestParam(required = false) Integer customerCategory){
        return clientService.getClients(active,quickSearchValue,page,size,customerCategory);
    }
    @PostMapping
    public HttpEntity<?> postClient(@RequestBody ClientDto clientDto){
        return clientService.postClient(clientDto);
    }
    @DeleteMapping("/{id}")
    public void deleteClient(@PathVariable UUID id){
        clientService.deleteClient(id);
    }
    @PutMapping("/{id}")
    public HttpEntity<?> editMapping(@RequestBody ClientDto clientDto,@PathVariable UUID id){
       return clientService.putClient(clientDto,id);
    }
}
