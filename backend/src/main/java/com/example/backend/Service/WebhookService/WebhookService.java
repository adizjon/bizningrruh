package com.example.backend.Service.WebhookService;

import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;

import java.time.format.ResolverStyle;

@Service
public class WebhookService {
    String token = "6464822111:AAELZQYi6xmrXnaoDvhkumzXQviqv8qX0Xo";

    public void execute(SendMessage sendMessage) {
        HttpEntity<SendMessage> request = new HttpEntity<>(sendMessage);
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.postForObject("https://api.telegram.org/bot" + token + "/sendMessage", request, Object.class);
    }
}
