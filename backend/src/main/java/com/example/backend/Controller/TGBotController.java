package com.example.backend.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.telegram.telegrambots.meta.api.objects.Message;
import org.telegram.telegrambots.meta.api.objects.Update;

@RestController
@RequestMapping("/api/TgBot")
public class TGBotController {

    @PostMapping
    public ResponseEntity<String> onUpdateReceived(@RequestBody Update update) {
        try {
            if (update.hasMessage()) {
                Message message = update.getMessage();
                String text = message.getText();
                System.out.println("Received message: " + text);

                // Burada gelen mesaja yanıt verebilir veya diğer işlemleri yapabilirsiniz.
                // Örnek olarak gelen mesaja bir yanıt göndermek için TelegramBotService gibi bir hizmet kullanabilirsiniz.

                return new ResponseEntity<>("Message received successfully", HttpStatus.OK);
            } else {
                System.out.println("Received an update without a message.");
                return new ResponseEntity<>("No message in the update", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            System.err.println("An error occurred: " + e.getMessage());
            return new ResponseEntity<>("An error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

