package com.example.backend.Service.TgBotService;

import com.example.backend.Entity.Status;
import com.example.backend.Entity.TgUser;
import com.example.backend.Service.WebhookService.WebhookService;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.formula.functions.T;
import org.junit.jupiter.engine.descriptor.JupiterTestDescriptor;
import org.springframework.stereotype.Service;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.ReplyKeyboard;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.ReplyKeyboardMarkup;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.KeyboardButton;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.KeyboardRow;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TgBotService {

    private final WebhookService webhookService;

    public void onUpdateReceived(Update update) {
        Long adminId = 1025298453L;
        Long chatId = update.getMessage().getChatId();
        TgUser user = new TgUser(chatId, update.getMessage().getNewChatTitle(), Status.START);
//        if (!chatId.equals(adminId)) {
//            SendMessage sendMessage = new SendMessage();
//            sendMessage.setText("Siz admin emassiz. Damizni oling!    ");
//            sendMessage.setChatId(chatId);
//            webhookService.execute(sendMessage);
//            return;
//        };
        if (update.getMessage().hasText()) {
            if (update.getMessage().getChatId().equals(1998158228L)) {
                return;
            }
            System.out.println(update.getMessage().getChatId());
            String text = update.getMessage().getText();
            if (user.getStatus().equals(Status.START) && text.equals("/start")) {
                SendMessage sendMessage = new SendMessage();
                sendMessage.setChatId(chatId);
                sendMessage.setText("Botimizga xush kelibsiz! Kerakli bo'limni tanlang");
                sendMessage.setReplyMarkup(allButton());
                webhookService.execute(sendMessage);
            }
        }
    }

    private ReplyKeyboardMarkup allButton() {
        ReplyKeyboardMarkup replyKeyboardMarkup = new ReplyKeyboardMarkup();
        KeyboardRow row = new KeyboardRow();
        KeyboardRow row2 = new KeyboardRow();
        KeyboardButton button = new KeyboardButton();
        KeyboardButton button2 = new KeyboardButton();
        KeyboardButton button3 = new KeyboardButton();
        KeyboardButton button4 = new KeyboardButton();
        button.setText("➕ Yangi mijoz qo'shish");
        button2.setText("\uD83D\uDCDD Mijozni malumotlari");
        button3.setText("✏\uFE0F Mijozni taxrirlash");
        button4.setText("\uD83D\uDD0E Mijozni qidirish");
        row.add(button);
        row.add(button2);
        row2.add(button3);
        row2.add(button4);
        List<KeyboardRow> buttons = List.of(row, row2);
        replyKeyboardMarkup.setKeyboard(buttons);
        return replyKeyboardMarkup;
    }
}
