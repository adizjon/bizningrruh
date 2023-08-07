package com.example.backend.Service.ClientService;

import com.example.backend.Entity.Client;
import com.example.backend.Entity.CustomerCategory;
import com.example.backend.Entity.Territory;
import com.example.backend.Payload.ClientDto;
import com.example.backend.Payload.SearchDto;
import com.example.backend.Repository.ClientRepo;
import com.example.backend.Repository.CustomerCategoryRepo;
import com.example.backend.Repository.TerritoryRepo;
import jakarta.persistence.OneToOne;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ClientServiceImpl implements ClientService{
    private final ClientRepo clientRepo;
    private final CustomerCategoryRepo customerCategoryRepo;
    private final TerritoryRepo territoryRepo;
//    @Override
//    public HttpEntity<?> getClients(SearchDto searchDto) {
//
//       if (searchDto.getActive()){
//           return ResponseEntity.ok(clientRepo.findAllByNameContainsIgnoreCaseOrAddressContainsIgnoreCaseOrPhoneContainsIgnoreCaseOrTinContainsIgnoreCaseOrCompanyNameContainsIgnoreCase(searchDto.getQuickSearchValue(),searchDto.getQuickSearchValue(),searchDto.getQuickSearchValue(),searchDto.getQuickSearchValue(),searchDto.getQuickSearchValue()));
//       }else {
//           return ResponseEntity.ok(clientRepo.findAll());
//       }
//    }


    @Override
    public HttpEntity<?> postCliet(ClientDto clientDto) {
        CustomerCategory customerCategory = customerCategoryRepo.findById(clientDto.getCustomerCategoryId()).get();
        Territory territory = territoryRepo.findById(clientDto.getTerritoryId()).get();
        Client reqClient=new Client(UUID.randomUUID(), clientDto.getName(), clientDto.getAddress(), clientDto.getPhone(), clientDto.getTin(), clientDto.getCompanyName(), clientDto.getLongitude(), clientDto.getLat(), customerCategory,territory);
        Client newClient = clientRepo.save(reqClient);
        return ResponseEntity.ok(newClient);
    }

    @Override
    public void deleteClient(UUID id) {
            clientRepo.deleteById(id);
    }

    @Override
    public HttpEntity<?> putClient(ClientDto clientDto, UUID id) {
        Client editingClient = clientRepo.findById(id).get();
        editingClient.setName(clientDto.getName());
        editingClient.setAddress(clientDto.getAddress());
        editingClient.setPhone(clientDto.getPhone());
        editingClient.setTin(clientDto.getTin());
        editingClient.setCompanyName(clientDto.getCompanyName());
        editingClient.setLongitude(clientDto.getLongitude());
        editingClient.setLat(clientDto.getLat());
        editingClient.setCustomerCategory(customerCategoryRepo.findById(clientDto.getCustomerCategoryId()).get());
        editingClient.setTerritory(territoryRepo.findById(clientDto.getTerritoryId()).get());
        return ResponseEntity.ok(editingClient);

    }

    @Override
    public HttpEntity<?> getClients(Boolean active, String quickSearchValue,Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        if (active){
            return ResponseEntity.ok(clientRepo.findAllByNameContainsIgnoreCaseOrAddressContainsIgnoreCaseOrPhoneContainsIgnoreCaseOrTinContainsIgnoreCaseOrCompanyNameContainsIgnoreCase(
                    quickSearchValue, quickSearchValue, quickSearchValue, quickSearchValue, quickSearchValue, pageable));
        }else {
            return ResponseEntity.ok(clientRepo.findAll(pageable));
        }
    }

}
