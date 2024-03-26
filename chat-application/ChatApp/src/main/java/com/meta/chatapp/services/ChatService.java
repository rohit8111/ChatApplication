package com.meta.chatapp.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.meta.chatapp.controller.ChatController;
import com.meta.chatapp.model.ChatUsers;
import com.meta.chatapp.repository.ChatUsersRepository;

@Service
public class ChatService {
    private static org.apache.logging.log4j.Logger log = LogManager.getLogger(ChatService.class);
    @Autowired
    ChatUsersRepository chatUsersRepository;

    // Add user to list of users whom currUser is going to chat.
    public Map<String, List<String>> addUser(ChatUsers chatUser) {
        log.info("Adding user to active user");
        // Check if the user is already exists.
        ChatUsers userCombination = chatUsersRepository.getUsersByCurrUserAndUserToAdd(chatUser.getCurrUser(),
                chatUser.getUserToAdd());
        if (userCombination == null)
            chatUsersRepository.save(chatUser);
        List<ChatUsers> chatUsers = chatUsersRepository.getUsersByCurrUser(chatUser.getCurrUser());
        System.out.println(chatUsers.get(0).getUserToAdd());
        List<String> connectedUsers = new ArrayList<String>();
        for (ChatUsers i : chatUsers) {
            connectedUsers.add(i.getUserToAdd());
        }
        Map<String, List<String>> map = new HashMap<String, List<String>>();
        map.put(chatUser.getCurrUser(), connectedUsers);
        return map;
    }

}
