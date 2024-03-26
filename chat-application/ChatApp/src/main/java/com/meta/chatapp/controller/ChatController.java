package com.meta.chatapp.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.meta.chatapp.model.ChatMessage;
import com.meta.chatapp.model.ChatUsers;
import com.meta.chatapp.repository.ChatUsersRepository;
import com.meta.chatapp.services.ChatService;

import ch.qos.logback.classic.Logger;

@Controller
@RestController
@CrossOrigin(origins = "*")
public class ChatController {
    private static org.apache.logging.log4j.Logger log = LogManager.getLogger(ChatController.class);
    private SimpMessagingTemplate template;
    @Autowired
    ChatUsersRepository chatUsersRepository;
    @Autowired
    ChatService chatService;
    public ChatController(SimpMessagingTemplate template) {
        this.template = template;
    }

    @MessageMapping("/chat.register")

    public ChatMessage register(@Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor) {
        template.convertAndSendToUser(chatMessage.getReciver(), "/queue/messages", "Connected");
        return chatMessage;
    }

    @MessageMapping("/chat.send")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage, Principal principal) {
        template.convertAndSendToUser(chatMessage.getReciver(), "/queue/messages", chatMessage);
        return chatMessage;
    }

    @MessageMapping("/message/{userName}")
    public void sendToOtherUser(@Payload String message, @DestinationVariable String userName) {
        System.out.println("Message received from" + userName);
        template.convertAndSendToUser(userName, "/reply",
                "You have a message from someone: " + message);

        // System.out.println();
    }

    @PostMapping("/chat/addUser")
    public Map<String, List<String>> addUser(@RequestBody ChatUsers chatUser) {
        log.info("Adding User to currUser");
        return chatService.addUser(chatUser);

    }

}
