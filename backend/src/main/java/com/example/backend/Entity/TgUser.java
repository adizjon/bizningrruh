package com.example.backend.Entity;

import com.example.backend.Payload.ClientDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class TgUser {
    @Id
    private Long chatId;
    private String name;
    private String status;
    @OneToOne
    private Client client;
}
