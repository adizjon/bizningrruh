package com.example.backend.Controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.telegram.telegrambots.meta.api.objects.Update;

@RestController
@RequestMapping("/api/TgBot")
public class TGBotController {

    @PostMapping
    public void onUpdateReceived(@RequestBody Update update) {
        System.out.println(update.getMessage().getText());
    }
}
