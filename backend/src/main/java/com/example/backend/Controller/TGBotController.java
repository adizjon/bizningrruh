package com.example.backend.Controller;

import com.example.backend.Service.TgBotService.TgBotService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.telegram.telegrambots.meta.api.objects.Update;

@RestController
@RequestMapping("/api/TgBot")
@RequiredArgsConstructor
public class TGBotController {

    private final TgBotService tgBotService;

    @PostMapping
    public void onUpdateReceived(@RequestBody Update update) {
//        System.out.println(update.getMessage().getText());
//        try {
            tgBotService.onUpdateReceived(update);
//        } catch (Exception e) {
//            System.out.println("ERROR!");
//        }
    }
}

