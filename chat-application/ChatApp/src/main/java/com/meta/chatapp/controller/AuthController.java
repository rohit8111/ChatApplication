package com.meta.chatapp.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;

import com.meta.chatapp.auth.JwtUtils;
import com.meta.chatapp.model.User;
import com.meta.chatapp.model.request.LoginReq;
import com.meta.chatapp.model.response.LoginRes;
import com.meta.chatapp.repository.UsersRepository;
import com.meta.chatapp.services.AuthServices;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

@RestController
@Controller
@RequestMapping("/rest/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    private static Logger log = LogManager.getLogger(AuthController.class);
    @Autowired
    UsersRepository usersRepository;
    @Autowired
    AuthServices authService;
    private final AuthenticationManager authenticationManager;
    private JwtUtils jwtUtil;

    public AuthController(AuthenticationManager authenticationManager, JwtUtils jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;

    }

    @PostMapping("/register")
    public User registerUsers(@RequestBody User user) {
        log.info("registering user");
        return authService.registerUsers(user);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginRes> loginUsers(@RequestBody LoginReq loginReq) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginReq.getEmail(), loginReq.getPassword()));
        String email = authentication.getName();
        User user = new User(email, "");
        String token = jwtUtil.createToken(user);
        LoginRes loginRes = new LoginRes(email, token);
        return ResponseEntity.ok(loginRes);
    }

}
