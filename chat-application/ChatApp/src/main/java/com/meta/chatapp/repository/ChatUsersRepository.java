package com.meta.chatapp.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.meta.chatapp.model.ChatUsers;

@Repository
public interface ChatUsersRepository extends MongoRepository<ChatUsers, String> {

    @Query("{currUser: ?0}") // SQL Equivalent : SELECT * FROM BOOK where email = ? and password=?
    List<ChatUsers> getUsersByCurrUser(String currUser);

    @Query("{currUser: ?0, userToAdd: ?1}") // SQL Equivalent : SELECT * FROM BOOK where email = ? and password=?
    ChatUsers getUsersByCurrUserAndUserToAdd(String currUser, String userToAdd);

}