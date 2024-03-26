package com.meta.chatapp.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.meta.chatapp.model.User;

@Repository
public interface UsersRepository extends MongoRepository<User, String> {

    @Query("{email: ?0, password: ?1}") // SQL Equivalent : SELECT * FROM BOOK where email = ? and password=?
    User getUsersByEmailAndPassword(String email, String password);

    User getUsersByEmail(String email);
}
