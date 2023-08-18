    package com.example.backend.Service.TgBotService;

    import com.example.backend.Entity.*;
    import com.example.backend.Payload.ClientDto;
    import com.example.backend.Repository.ClientRepo;
    import com.example.backend.Repository.CustomerCategoryRepo;
    import com.example.backend.Repository.TerritoryRepo;
    import com.example.backend.Repository.TgUserRepo;
    import com.example.backend.Service.WebhookService.WebhookService;
    import jdk.jfr.Category;
    import lombok.RequiredArgsConstructor;
    import org.springframework.stereotype.Service;
    import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
    import org.telegram.telegrambots.meta.api.objects.Update;
    import org.telegram.telegrambots.meta.api.objects.replykeyboard.InlineKeyboardMarkup;
    import org.telegram.telegrambots.meta.api.objects.replykeyboard.ReplyKeyboard;
    import org.telegram.telegrambots.meta.api.objects.replykeyboard.ReplyKeyboardMarkup;
    import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.InlineKeyboardButton;
    import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.KeyboardButton;
    import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.KeyboardRow;

    import java.util.ArrayList;
    import java.util.List;
    import java.util.UUID;

    @Service
    @RequiredArgsConstructor
    public class TgBotService {

        private final WebhookService webhookService;
        private final TgUserRepo tgUserRepo;
        private final ClientRepo clientRepo;
        private final TerritoryRepo territoryRepo;
        private final CustomerCategoryRepo categoryRepo;

        public void onUpdateReceived(Update update) {
            if (update.hasMessage()) {
                Long chatId = update.getMessage().getChatId();
//            TgUser user = tgUserRepo.findById(chatId).orElseGet(() -> new TgUser(chatId, "Name bor", Status.START, null));
                TgUser user;
                if (tgUserRepo.findById(chatId).isEmpty()) {
                    user = TgUser.builder()
                            .chatId(chatId)
                            .name("test name")
                            .status(Status.START.name())
                            .build();
                } else {
                    user = tgUserRepo.findById(chatId).get();
                }
                if (update.getMessage().hasText()) {
                    String text = update.getMessage().getText();
                    if (text.equals("/start")) {
                        sendWelcomeMessage(chatId);
                        user.setStatus(Status.START.name());
                    } else {
                        handleUserStatus(user, text, chatId);
                    }
                } else if (update.getMessage().hasContact() && Status.valueOf(user.getStatus()).equals(Status.CLIENT_PHONE)) {
                    user.getClient().setPhone(update.getMessage().getContact().getPhoneNumber());
                    user.setStatus(Status.CLIENT_INN.name());
                    sendTextMessage(chatId,"Mijoz INN  yozing:" +
                            "Namuna:12323");
                }
                else if (update.getMessage().hasLocation() && Status.valueOf(user.getStatus()).equals(Status.CLIENT_LOCATION)) {
                    user.getClient().setLatitude(update.getMessage().getLocation().getLatitude());
                    user.getClient().setLongitude(update.getMessage().getLocation().getLongitude());
//                Client clientDto = user.getClient();
//                clientRepo.save(Client.builder()
//                                .latitude(clientDto.getLatitude())
//                                .longitude(clientDto.getLongitude())
//                                .active(true)
//                                .address(clientDto.getAddress())
//                                .name(clientDto.getName())
//                                .tin(clientDto.getTin())
//                                .phone(clientDto.getPhone())
//                                .customerCategory()
//                                .build());
                    SendMessage sendMessage = new SendMessage();
                    sendMessage.setText("Kompaniyangiz nomini kiriting.");
//                sendMessage.setText("✔ Mijoz muvaffaqiyatli qo'shildi");
//                sendMessage.setReplyMarkup(createReplyKeyboard());
                    sendMessage.setChatId(chatId);
                    user.setStatus(Status.CLIENT_COMPANY_NAME.name());
                    webhookService.execute(sendMessage);
                }
                tgUserRepo.save(user);
            } else if (update.hasCallbackQuery()) {
                String callbackData = update.getCallbackQuery().getData();
                TgUser user;
                Long chatId = update.getCallbackQuery().getMessage().getChatId();
                if (tgUserRepo.findById(chatId).isEmpty()) {
                    user = TgUser.builder()
                            .chatId(chatId)
                            .name("test name")
                            .status(Status.START.name())
                            .build();
                } else {
                    user = tgUserRepo.findById(chatId).get();
                }
                if (callbackData.startsWith("territory_")) {
                    UUID id = UUID.fromString(callbackData.replaceFirst("territory_", ""));
                    user.getClient().setTerritory(territoryRepo.findById(id).get());
                    SendMessage sendMessage = new SendMessage();
                    sendMessage.setText("Mijoz turini tanlang");
                    sendMessage.setChatId(chatId);
                    sendMessage.setReplyMarkup(generateCategoryButtons());
                    webhookService.execute(sendMessage);
                    user.setStatus(Status.CLIENT_CATEGORY.name());
                } else if (callbackData.startsWith("category_")) {
                    UUID id = UUID.fromString(callbackData.replaceFirst("category_", ""));
                    user.getClient().setTerritory(territoryRepo.findById(id).get());
                }
                tgUserRepo.save(user);

            }
        }

        private void handleUserStatus(TgUser user, String text, Long chatId) {
            switch (Status.valueOf(user.getStatus())) {
                case START:
                    if (text.equals("➕ Yangi mijoz qo'shish")) {
                        user.setClient(clientRepo.save(new Client()));
                        sendTextMessage(chatId, "Ismni kiriting");
                        user.setStatus(Status.CLIENT_NAME.name());
                    }
                    break;
                case CLIENT_NAME:
                    user.getClient().setName(text);
                    sendTextMessage(chatId,"Mijoz addresini yozing:" +
                            "Namuna:Qayerdir qayer 47");
                    user.setStatus(Status.CLIENT_ADDRESS.name());
                    break;
                case CLIENT_ADDRESS:
                    user.getClient().setAddress(text);
                    SendMessage sendMessage = new SendMessage();
                    sendMessage.setChatId(chatId);
                    sendMessage.setText("Oka kontaktni jonatvoring");
                    sendMessage.setReplyMarkup(contactButton());
                    user.setStatus(Status.CLIENT_PHONE.name());
                    webhookService.execute(sendMessage);
                    break;
                case CLIENT_PHONE:
                    sendTextMessage(chatId,"Mijoz INN  yozing:" +
                            "Namuna:12323");
                    user.setStatus(Status.CLIENT_INN.name());
                    break;
                case CLIENT_INN:
                    user.getClient().setTin(text);
                    SendMessage sendMessage1=new SendMessage();
                    sendMessage1.setChatId(chatId);
                    sendMessage1.setText("Xexe");
                    sendMessage1.setReplyMarkup(locationButton());
                    user.setStatus(Status.CLIENT_LOCATION.name());
                    webhookService.execute(sendMessage1);
                    break;
                case CLIENT_COMPANY_NAME:
                    user.getClient().setCompanyName(text);
                    SendMessage sendMessage2 = new SendMessage();
                    sendMessage2.setText("Hududni tanlang");
                    sendMessage2.setChatId(chatId);
                    sendMessage2.setReplyMarkup(generateTerritoryButtons());
                    user.setStatus(Status.CLIENT_TERRITORY.name());
                    webhookService.execute(sendMessage2);
                    break;
                default:
                    sendTextMessage(chatId, "Odamga o'xshab yoz!");
                    break;
            }
        }

        private InlineKeyboardMarkup generateTerritoryButtons() {
            InlineKeyboardMarkup replyKeyboardMarkup = new InlineKeyboardMarkup();
            List<List<InlineKeyboardButton>> rows = new ArrayList<>();
            rows.add(new ArrayList<>());
            List<Territory> territories = territoryRepo.findAll();
            int i = 1;
            for (Territory territory : territories) {
                if (i<6 && territories.size()>=1) {
                    InlineKeyboardButton button = new InlineKeyboardButton();
                    button.setText(territory.getTitle());
                    button.setCallbackData("territory_" + territory.getId());
                    rows.get(rows.size()-1).add(button);
                    i++;
                } else {
                    List<InlineKeyboardButton> row = new ArrayList<>();
                    InlineKeyboardButton button = new InlineKeyboardButton();
                    button.setText(territory.getTitle());
                    button.setCallbackData("territory_" + territory.getId());
                    row.add(button);
                    rows.add(row);
                    i = 0;
                }
            }
            List<InlineKeyboardButton> controllerRow = new ArrayList<>();
            InlineKeyboardButton prevButton = new InlineKeyboardButton();
            InlineKeyboardButton stopButton = new InlineKeyboardButton();
            InlineKeyboardButton nextButton = new InlineKeyboardButton();
            prevButton.setText("⬅️");
            stopButton.setText("❌");
            nextButton.setText("➡️");
            prevButton.setCallbackData("territory/prev");
            stopButton.setCallbackData("territory/stop");
            nextButton.setCallbackData("territory/next");
            controllerRow.add(prevButton);
            controllerRow.add(stopButton);
            controllerRow.add(nextButton);
            rows.add(controllerRow);

            replyKeyboardMarkup.setKeyboard(rows);
            return replyKeyboardMarkup;
        }

        private InlineKeyboardMarkup generateCategoryButtons() {
            InlineKeyboardMarkup replyKeyboardMarkup = new InlineKeyboardMarkup();
            List<List<InlineKeyboardButton>> rows = new ArrayList<>();
            rows.add(new ArrayList<>());
            List<CustomerCategory> categories = categoryRepo.findAll();
            int i = 1;
            for (CustomerCategory category : categories) {
                if (i<6 && categories.size()>=1) {
                    InlineKeyboardButton button = new InlineKeyboardButton();
                    button.setText(category.getName());
                    button.setCallbackData("category_" + category.getId());
                    rows.get(rows.size()-1).add(button);
                    i++;
                } else {
                    List<InlineKeyboardButton> row = new ArrayList<>();
                    InlineKeyboardButton button = new InlineKeyboardButton();
                    button.setText(category.getName());
                    button.setCallbackData("category_" + category.getId());
                    row.add(button);
                    rows.add(row);
                    i = 0;
                }
            }
            List<InlineKeyboardButton> controllerRow = new ArrayList<>();
            InlineKeyboardButton prevButton = new InlineKeyboardButton();
            InlineKeyboardButton stopButton = new InlineKeyboardButton();
            InlineKeyboardButton nextButton = new InlineKeyboardButton();
            prevButton.setText("⬅️");
            stopButton.setText("❌");
            nextButton.setText("➡️");
            prevButton.setCallbackData("territory/prev");
            stopButton.setCallbackData("territory/stop");
            nextButton.setCallbackData("territory/next");
            controllerRow.add(prevButton);
            controllerRow.add(stopButton);
            controllerRow.add(nextButton);
            rows.add(controllerRow);

            replyKeyboardMarkup.setKeyboard(rows);
            return replyKeyboardMarkup;
        }

        private ReplyKeyboardMarkup contactButton(){
    ReplyKeyboardMarkup replyKeyboardMarkup=new ReplyKeyboardMarkup();
    List<KeyboardRow> rows=new ArrayList<>();
    KeyboardRow row=new KeyboardRow();
    KeyboardButton button=new KeyboardButton();
    button.setText("Kontaktni tashlash");
    button.setRequestContact(true);
    row.add(button);
    rows.add(row);
    replyKeyboardMarkup.setKeyboard(rows);
    return replyKeyboardMarkup;
}
private ReplyKeyboardMarkup locationButton(){
            ReplyKeyboardMarkup replyKeyboardMarkup=new ReplyKeyboardMarkup();
            List<KeyboardRow> rows=new ArrayList<>();
            KeyboardRow row=new KeyboardRow();
            KeyboardButton button=new KeyboardButton();
            button.setText("Lokatsiya tashlash");
            button.setRequestLocation(true);
            row.add(button);
            rows.add(row);
            replyKeyboardMarkup.setKeyboard(rows);
            return replyKeyboardMarkup;
        }
        private void sendWelcomeMessage(Long chatId) {
            SendMessage sendMessage = new SendMessage();
            sendMessage.setChatId(chatId);
            sendMessage.setText("Botimizga xush kelibsiz! Kerakli bo'limni tanlang");
            sendMessage.setReplyMarkup(createReplyKeyboard());
            webhookService.execute(sendMessage);
        }

        private void sendTextMessage(Long chatId, String text) {
            SendMessage sendMessage = new SendMessage();
            sendMessage.setChatId(chatId);
            sendMessage.setText(text);
            webhookService.execute(sendMessage);
        }

        private ReplyKeyboardMarkup createReplyKeyboard() {
            KeyboardButton button1 = new KeyboardButton("➕ Yangi mijoz qo'shish");
            KeyboardButton button2 = new KeyboardButton("\uD83D\uDCDD Mijozni malumotlari");
            KeyboardButton button3 = new KeyboardButton("✏\uFE0F Mijozni taxrirlash");
            KeyboardButton button4 = new KeyboardButton("\uD83D\uDD0E Mijozni qidirish");


            KeyboardRow row1 = new KeyboardRow();
            row1.add(button1);
            row1.add(button2);

            KeyboardRow row2 = new KeyboardRow();
            row2.add(button3);
            row2.add(button4);


            List<KeyboardRow> keyboard = List.of(row1, row2);

            ReplyKeyboardMarkup replyKeyboardMarkup = new ReplyKeyboardMarkup();
            replyKeyboardMarkup.setKeyboard(keyboard);

            replyKeyboardMarkup.setResizeKeyboard(true);
            return replyKeyboardMarkup;
        }

    }
