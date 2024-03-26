package com.meta.chatapp.services;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;
import com.meta.chatapp.model.User;
import com.meta.chatapp.repository.UsersRepository;
import com.meta.chatapp.utils.GeneratePassword;

@Service
public class AuthServices {
    @Autowired
    UsersRepository usersRepository;
    @Autowired
    GeneratePassword generatePassword;
    private static Logger log = LogManager.getLogger(AuthServices.class);

    public User registerUsers(User user) {
        String hashPassword = generatePassword.generatePassword(user.getPassword());
        user.setPassword(hashPassword);
        usersRepository.save(user);
        log.debug("User registerd successfully");
        return user;
    }

    public String loginUsers(Map<String, Object> payload) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String email = payload.get("email").toString();
        String password = payload.get("password").toString();
        User user = usersRepository.getUsersByEmail(email);
        if (passwordEncoder.matches(password, user.getPassword()))
            return "Login Successful";
        return "Login Failed";
    }
}
