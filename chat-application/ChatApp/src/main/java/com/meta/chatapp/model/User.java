package com.meta.chatapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Document
public class User {
    @Id
    public String id;
    @NotNull(message = "Email cannot be null")
    @Email(message = "Email should be valid")
    @Indexed(name = "email_index", unique = true)
    public String email;
    @NotNull(message = "Name cannot be null")
    public String name;
    @NotNull(message = "Password cannot be null")
    @Size(min = 10, max = 20, message = "Password length should be between 10 and 20")
    public String password;

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
